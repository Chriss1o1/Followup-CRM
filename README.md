# FollowUp

A free follow-up and lead manager for small teams. One HTML file. No account, no server, no subscription.

> **Status: early MVP.** The logic is unit-tested (`npm test`), but team sync has not yet been tested at scale with real shared drives. Please use fake data first and keep backups.

**Try it:** open `index.html`, or host it free on GitHub Pages.

## What it does
- **Next steps on every lead.** Overdue, today and next-7-days views, for you or the whole team. Leads with no next step are flagged.
- **Notes become tasks.** Type “send quote next Tuesday and call on 3 Nov” and tap to add the suggested tasks (runs in your browser, no AI service).
- **Team of any size, free.** Everyone connects to the same shared folder (Google Drive, OneDrive, Dropbox, network drive). Each person writes their own file, so writes never collide. If two people edit the same lead at the same moment, FollowUp flags it for review instead of silently picking a winner.
- **Lead criteria.** Edit your own checklist (budget, decision-maker, need, timeline). Each lead shows a score.
- **Deals.** Stage, value and expected close, with open-deal totals.
- **Forward a lead.** One click builds a hand-off summary (details, criteria, open steps, starred conversations) to copy or email.
- **Drafts in your style.** Paste a few of your own messages; drafts copy your greeting, sign-off, length and tone. Or copy a ready-made prompt for any free AI chat.
- **Import your spreadsheet.** CSV from HubSpot, Zoho, Pipedrive, Google Contacts or a plain sheet. Full CSV and JSON export any time.

## Run it with your team (free)
1. Put `index.html` on GitHub Pages (Settings → Pages → deploy from `main`) or share the file.
2. Make a folder in your shared drive. Everyone opens FollowUp in Chrome or Edge → Team → Connect shared folder.
3. Done. Changes sync about every 30 seconds.

## Honest limits
- Folder sync needs Chrome or Edge on desktop. Other browsers can still swap team files (Team → Export / Import).
- Anyone with access to the folder can see the leads. Access control is your drive’s sharing settings.
- Sync is not a transactional database. Concurrent edits to one record are detected and shown for you to resolve, but a drive that syncs slowly can delay when teammates see changes. See `docs/sync-limitations.md`.
- Deleted leads can be restored from the Team tab; imports and restores can be undone once.
- Message drafts are rule-based, not AI. They are a good first line, not a finished email.

MIT license.
