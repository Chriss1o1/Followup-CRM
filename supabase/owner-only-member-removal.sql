-- FollowUp owner-only member removal
-- Run in the FollowUp Supabase SQL Editor after the existing workspace RPCs are installed.
-- This migration intentionally does not delete the user's account or their other memberships.

-- Remove any older permissive DELETE/ALL policies on team_members. PostgreSQL combines
-- permissive policies with OR, so adding a narrower policy alone would not revoke admin deletion.
do $$
declare p record;
begin
  for p in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'team_members'
      and cmd in ('DELETE', 'ALL')
  loop
    execute format('drop policy if exists %I on public.team_members', p.policyname);
  end loop;
end $$;

create policy team_members_delete_owner_only
on public.team_members
for delete
to authenticated
using (public.has_team_role(team_id, array['owner']));

create or replace function public.remove_team_member(
  target_team_id uuid,
  target_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller uuid;
  target_role text;
begin
  caller := auth.uid();
  if caller is null then
    raise exception 'Sign in is required';
  end if;

  if caller = target_user_id then
    raise exception 'The workspace owner cannot remove themselves';
  end if;

  if not public.has_team_role(target_team_id, array['owner']) then
    raise exception 'Only the workspace owner can remove members';
  end if;

  select tm.role
    into target_role
  from public.team_members tm
  where tm.team_id = target_team_id
    and tm.user_id = target_user_id;

  if target_role is null then
    raise exception 'That user is not a member of this workspace';
  end if;

  if target_role = 'owner' then
    raise exception 'A workspace owner cannot be removed';
  end if;

  delete from public.team_members
  where team_id = target_team_id
    and user_id = target_user_id;
end;
$$;

revoke all on function public.remove_team_member(uuid, uuid) from public;
grant execute on function public.remove_team_member(uuid, uuid) to authenticated;
