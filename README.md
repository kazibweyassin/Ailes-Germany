# Ailes Global Germany Leads

A premium landing page plus a lightweight lead-capture backend for Germany pathway consultations.

## What it does

- Serves the existing `index.html`
- Captures consultation leads through `POST /api/leads`
- Stores leads locally in `data/leads.json`
- Optionally sends email alerts when SMTP settings are provided
- Returns a WhatsApp follow-up link for quick contact

## Requirements

- Node.js 18+

## Setup

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

## Environment variables

Optional WhatsApp placeholder replacement:

- `WHATSAPP_NUMBER` — your business WhatsApp number in international format

Optional email notification settings:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `LEADS_TO_EMAIL`
- `LEADS_FROM_EMAIL`

## API

### Health check

`GET /api/health`

### Lead capture

`POST /api/leads`

Example body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+256700000000",
  "country": "Uganda",
  "pathway": "Ausbildung",
  "goal": "I want a clear Germany roadmap",
  "notes": "I am currently learning German",
  "consent": true,
  "source": "website-consultation"
}
```

### Stored data

Leads are saved to `data/leads.json` so you can inspect submissions locally.

## Notes

- Replace the `[REAL BUSINESS NUMBER]` placeholder in `index.html` and the default in `server.js` with your actual WhatsApp number.
- Email delivery only activates when the SMTP env vars are set.
