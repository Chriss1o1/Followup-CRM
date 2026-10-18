# FollowUp CRM

**A lightweight, open-source CRM for teams that want a simpler way to manage leads, follow-ups and handovers.**

[**Launch the prototype**](https://chriss1o1.github.io/Followup-CRM/) · [Report a bug](https://github.com/Chriss1o1/Followup-CRM/issues) · [Read the privacy notice](PRIVACY.md)

> **Status: public prototype / early MVP.** FollowUp is actively being developed. Test with dummy data first. It has not been independently security-audited, and the in-app privacy notice is not a certification of GDPR compliance.

## Screenshots

Screenshots of the current interface will be added here after the latest navigation update is live and the screens have been captured with sample data. Please do not use real customer names, email addresses, phone numbers, or confidential information in screenshots.

<!-- Add current, sanitised screenshots under docs/screenshots/ and embed them here:
![FollowUp CRM dashboard](docs/screenshots/dashboard.png)
![Searchable lead selection and export](docs/screenshots/import-export.png)
![Privacy and governance page](docs/screenshots/privacy-governance.png)
-->

## Why FollowUp?

FollowUp is designed to keep lead management focused: know who to contact, what happened last, what needs doing next, and who owns the follow-up.

## Current features

- **Lead management:** keep lead details and pipeline status organised.
- **Team workspaces:** workspace membership and role-based access.
- **Assignment and collaboration:** assign leads, add notes and tasks, and record activity.
- **Follow-up visibility:** review tasks and pipeline activity.
- **Search and filtering:** find records without scrolling through the entire list.
- **Import and export centre:** select leads manually, search by name or company, filter by pipeline stage, and export selected or visible leads.
- **Export formats:** JSON, CSV, and print-ready reports that can be saved as PDF through the browser print dialog.
- **Import:** import supported JSON and CSV files as new leads; imports are validated and do not intentionally overwrite existing leads.
- **Privacy and governance page:** in-app guidance on data minimisation, access, retention, privacy requests and security responsibilities.
- **Open source:** inspect the code, report problems, and contribute improvements.

## Try the prototype

1. Open the [FollowUp web app](https://chriss1o1.github.io/Followup-CRM/).
2. Sign in or create a test account, then choose or create a workspace.
3. Add a few **fictional test leads**.
4. Try searching and filtering leads, assigning follow-ups, and using the Import & export and Privacy & governance pages.
5. Share feedback or report bugs through [GitHub Issues](https://github.com/Chriss1o1/Followup-CRM/issues).

The prototype is hosted with GitHub Pages. A custom domain can be connected later without necessarily changing the hosting provider; see the [GitHub Pages custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Import, export and sharing notes

- Export only the leads you intend to share, and omit contact details when they are not needed.
- CSV and JSON exports are downloaded to your device. PDF output uses the browser print dialog.
- The current Drive and email buttons help prepare the export, but do **not** directly upload files to Google Drive or automatically attach files to outgoing emails.
- Keep exported files secure: exports are outside the CRM’s access controls once downloaded.
- Use fake data while testing imports and exports.

## Privacy and security

FollowUp includes workspace access controls and a privacy/governance information page, but these features alone do not establish legal compliance or guarantee security.

Before using real customer data, the workspace owner should:
- verify role and workspace isolation with separate test accounts;
- remove access promptly when a teammate leaves;
- define retention and deletion practices for leads, notes, activity history and exported files;
- configure and test backups and restoration;
- review authentication, account recovery, and any database policies or functions;
- review the in-app privacy notice and replace its generic wording with the organisation's real details and practices.

See [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md). Do not store passwords, payment-card details, identity documents, or unnecessary sensitive personal data in lead records.

## Known limitations

- Google Drive upload and automatic email attachment delivery are not integrated; files must currently be uploaded or attached manually.
- PDF export is generated through the browser’s print interface, so appearance can vary slightly by browser.
- The project is an early prototype. Please report bugs and avoid relying on it as the sole system of record for critical customer information.

## Contributing

Bug reports, usability feedback and contributions are welcome. Please open an issue before starting a large change so the work can be discussed.

## License

MIT. See [LICENSE](LICENSE).
