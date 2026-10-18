# Sync: how it works and what it can’t do

**Design.** Each person’s FollowUp writes `followup-<id>.json` into a shared folder (Chrome/Edge File System Access API). On sync, every file is read, validated, and merged. Each record carries a version history (`h`); a record that descends from the local one replaces it, an older one is ignored.

**Conflicts.** If two people change the same record from the same starting version, neither version descends from the other. FollowUp keeps the newer one, remembers the other, and shows a *Needs review* item on the Today tab with the differing fields (Keep current / Use other). Identical edits raise no conflict.

**Not guaranteed**
- Not a transactional database. Cloud drives (Drive, OneDrive, Dropbox) sync on their own schedule; teammates may see changes late.
- A file read mid-write is skipped and picked up on the next sync.
- Clock skew: timestamps are only used to pick the displayed winner; conflict detection uses version history.
- Anyone with access to the folder can read and edit every lead.
- Records are never physically deleted (deletes are marked, so they sync); old files can grow over time.

**Test before relying on it:** two browser profiles, same folder, edit one lead in both while offline, reconnect, confirm the review item appears and resolving it syncs to both.
