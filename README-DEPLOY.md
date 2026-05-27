Ailes Global — Lead capture prototype

This project is a single-file marketing landing page with a lightweight serverless lead-capture endpoint suitable for Vercel/Netlify.

What I implemented
- Client-side modal lead capture that appears when users click WhatsApp CTAs.
- Serverless endpoint at `api/lead.js` that:
  - saves lead records to Airtable (if configured)
  - sends an email notification via SendGrid (if configured)
  - returns a simple JSON response
- Centralized WhatsApp intent links in `index.html` (using `data-whatsapp-message` attributes).

Recommended deployment (Vercel)
1. Create a Vercel project and connect this repo.
2. Add the environment variables listed below in Vercel project settings.
3. Deploy — Vercel will expose the serverless function at `/api/lead`.

Environment variables
- `AIRTABLE_API_KEY` (optional)
- `AIRTABLE_BASE_ID` (optional)
- `AIRTABLE_TABLE_NAME` (optional, default `Leads`)
- `SENDGRID_API_KEY` (optional)
- `NOTIFY_EMAIL` (optional) — recipient for lead notifications
- `WHATSAPP_NUMBER` (required for WhatsApp links) — international format without leading `+`, e.g. `256701234567`

Example `.env` values (use `.env.example` provided):

```
WHATSAPP_NUMBER=256704833021
NOTIFY_EMAIL=info@ailesglobal.com
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
SENDGRID_API_KEY=your_sendgrid_api_key
```

Local testing
- Use `vercel dev` to run serverless functions locally, or deploy to Vercel and test the live endpoint.

 Lead flow (what happens when a user clicks WhatsApp)
 1. User clicks a WhatsApp CTA button.
 2. Modal appears asking for name/contact (optional).
 3. User submits → POST to `/api/lead` with name, contact, message, source.
 4. Backend saves to Airtable (if configured) and sends email via SendGrid (if configured).
 5. Modal closes and opens WhatsApp chat with prefilled message.
 
 Airtable setup
 See [AIRTABLE-SETUP.md](AIRTABLE-SETUP.md) for table schema and testing instructions.
 
Next steps I can do for you
- Wire Airtable with a suggested table schema and test lead entries.
- Add SendGrid or SMTP email notifications and a configurable recipient.
- Add spam protection (honeypot or CAPTCHA) and rate-limiting.
- Export/CSV or a minimal admin interface for leads.

If you want me to continue, confirm and I will scaffold the Airtable mapping and demo steps.
