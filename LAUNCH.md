# Launch kit (read before posting)

## Ground rules (these decide whether you get banned or upvoted)
- Read each subreddit's rules and sidebar first. Many ban self-promotion or only allow it on set days. If unsure, message the mods before posting.
- Say you made it. Never use alt accounts, ask friends to upvote, or reply to your own thread as someone else. Reddit detects and bans this.
- Be useful in those communities for a week or two first (answer questions, share tips). A launch from a brand-new account gets removed.
- Nobody can guarantee a post goes viral. What you can control: a clear problem, a 20-second demo, and fast, honest replies.

## Before you post
1. Host the live demo on GitHub Pages and put the link at the top of the README.
2. Record a 20–30 second screen GIF: paste "send quote next Tuesday" in a note, tap the suggested task, show the Today view.
3. Add a GitHub description, topics (crm, local-first, freelancers, open-source) and 3 "good first issue" tickets.
4. Replace the [link] placeholders and the copyright line in LICENSE. Only describe behaviour you have verified with two browser profiles.
5. Check the name "FollowUp" isn't already taken on GitHub; if it is, use `followup-crm`.

## Where to post (check rules first)
r/SideProject, r/opensource, r/freelance, r/smallbusiness, r/Entrepreneur, r/sales (often strict), r/webdev (use Showoff Saturday).
Post separately, days apart, each with a different angle. Do not copy-paste.

## Draft post (r/freelance / r/smallbusiness)
**Title:** I got tired of leads dying in spreadsheets, so I made a free follow-up tracker for small teams (no signup, no server)

I run follow-ups for a small team and kept losing leads because the info was spread across sheets, inboxes and memory. Every CRM I tried was either too heavy or locked the useful bits behind a paywall.

So I built FollowUp. It's one HTML file:
- Every lead has a next step; overdue ones show up first
- Type "send quote next Tuesday" in a note and it suggests the task
- Teams share a Google Drive/Dropbox folder, no server needed
- One-click hand-off summary when you pass a lead to a teammate
- Import your spreadsheet, export everything anytime

It's free and open source (MIT). Data stays on your computer. Limits: it is an early MVP, folder sync needs Chrome/Edge and has had light real-world testing, and the message drafts are rule-based, not AI.

Demo: [link] · Code: [link]
I'm the maker, happy to take feedback. What would stop you from switching from your spreadsheet?

## Draft post (r/SideProject / r/opensource)
**Title:** FollowUp: a local-first, zero-backend team CRM in a single HTML file

Short technical angle: each person writes their own JSON file to a shared folder (File System Access API); records are merged using per-record version history, and concurrent edits to the same record are detected and surfaced for review rather than silently overwritten. Notes and tasks are separate records, so most activity cannot conflict. It is not a transactional database (see docs/sync-limitations.md). Looking for feedback on the sync design and for contributors. [links]

## After posting
- Reply to every comment in the first 2 hours. Turn repeated requests into GitHub issues and say so.
- Post an update ("you asked for X, shipped it") a week later. That is often what earns the second wave.
