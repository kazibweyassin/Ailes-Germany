# Airtable setup for Ailes Global lead capture

This guide helps you create the Airtable table to store leads from the site.

## Create the table in Airtable

1. Go to [airtable.com](https://airtable.com) and open the base with ID `patuwukNyoI97eX33`.
2. Create a new table named `ailesglobal` (or use the name you set in `AIRTABLE_TABLE_NAME`).
3. Add the following fields:

| Field Name | Type | Required |
|---|---|---|
| Name | Single line text | No |
| Contact | Single line text | No |
| Message | Single line text | Yes |
| Source | Single line text | No |
| Page | Single line text | No |
| SubmittedAt | Date | No |

## Optional: Automations

- Add an automation to email you when a new lead arrives.
- Or add a Slack notification webhook.

## Testing

Once the table is set up:
1. Go to your live Vercel deployment.
2. Click any WhatsApp CTA button.
3. Fill in the lead modal (name and contact optional).
4. Submit.
5. Check your Airtable table — a new row should appear within seconds.

## Troubleshooting

- If leads aren't appearing, check Vercel logs: `vercel logs --prod`.
- Verify the API key and base ID are correct and set in Vercel environment variables.
- Ensure the table and fields match the schema above exactly.

