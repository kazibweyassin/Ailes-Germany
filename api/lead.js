export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const name = body.name || '';
    const contact = body.contact || '';
    const message = body.message || '';
    const source = body.source || '';
    const page = body.page || '';

    if (!message) return res.status(400).json({ error: 'Missing message' });

    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    // Save to Airtable (if configured)
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
      const record = {
        fields: {
          Name: name,
          Contact: contact,
          Message: message,
          Source: source,
          Page: page,
          SubmittedAt: new Date().toISOString(),
        },
      };

      await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
    }

    // Send email notification via SendGrid (if configured)
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
    if (SENDGRID_API_KEY && NOTIFY_EMAIL) {
      const email = {
        personalizations: [{ to: [{ email: NOTIFY_EMAIL }] }],
        from: { email: NOTIFY_EMAIL },
        subject: 'New lead: Ailes Global',
        content: [
          {
            type: 'text/plain',
            value: `Name: ${name || '-'}\nContact: ${contact || '-'}\nMessage: ${message}\nSource: ${source}\nPage: ${page}`,
          },
        ],
      };

      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('lead handler error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
