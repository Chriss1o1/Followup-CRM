-- FollowUp privacy hardening: minimise personal data in activity history.
-- Review this migration before running it in production. It changes only audit snapshots;
-- it does not delete the live lead/contact data in crm_records.payload.
-- Run in Supabase SQL Editor after live-activity-migration.sql.

create or replace function public.followup_audit_payload_minimal(p jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select case when p is null then null else
    jsonb_strip_nulls(jsonb_build_object(
      'name', p->'name',
      'company', p->'company',
      'status', p->'status',
      'lead', p->'lead',
      'kind', p->'kind',
      'due', p->'due',
      'done', p->'done'
    )) end;
$$;

-- Redact old snapshots too: changing the trigger alone would leave historical
-- email addresses, telephone numbers, note text and mention lists in the log.
update public.crm_activity
set before_payload = public.followup_audit_payload_minimal(before_payload),
    after_payload = public.followup_audit_payload_minimal(after_payload)
where before_payload is not null or after_payload is not null;

create or replace function public.log_crm_record_activity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  old_payload jsonb;
  new_payload jsonb;
  event_action text;
  actor uuid;
begin
  if tg_op = 'DELETE' then
    actor := coalesce(auth.uid(), old.updated_by);
  else
    actor := coalesce(auth.uid(), new.updated_by);
  end if;

  if actor is null then
    return coalesce(new, old);
  end if;

  if tg_op = 'INSERT' then
    event_action := 'created';
    new_payload := public.followup_audit_payload_minimal(new.payload);
  elsif tg_op = 'UPDATE' then
    if new.payload is not distinct from old.payload
       and new.owner_user_id is not distinct from old.owner_user_id
       and new.deleted_at is not distinct from old.deleted_at then
      return new;
    end if;
    event_action := case when old.deleted_at is null and new.deleted_at is not null then 'deleted' else 'updated' end;
    old_payload := public.followup_audit_payload_minimal(old.payload);
    new_payload := public.followup_audit_payload_minimal(new.payload);
  else
    event_action := 'deleted';
    old_payload := public.followup_audit_payload_minimal(old.payload);
  end if;

  insert into public.crm_activity
    (team_id, record_id, record_key, record_type, action, actor_user_id,
     before_payload, after_payload, before_owner_id, after_owner_id)
  values
    (coalesce(new.team_id, old.team_id),
     coalesce(new.id, old.id),
     coalesce(new.record_key, old.record_key),
     coalesce(new.record_type, old.record_type),
     event_action, actor, old_payload, new_payload,
     old.owner_user_id, new.owner_user_id);

  return coalesce(new, old);
end;
$$;

-- Keep the helper private to the database; only the trigger needs to call it.
revoke all on function public.followup_audit_payload_minimal(jsonb) from public;
