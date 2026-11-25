// Subprocessors Zerbiq uses, as of November 25, 2026.
// Shared by /legal/dpa (Section 6) and /legal/subprocessors.
// Keep in step with the Privacy Policy.
export const SUBPROCESSORS = [
  {
    name: 'Vercel, Inc.',
    purpose: 'Hosts the Zerbiq app and runs its servers.',
    data: 'All Client Customer Data passes through it while the app is in use; standard server logs.',
  },
  {
    name: 'Supabase, Inc.',
    purpose: 'Main database, user sign-in, and file storage.',
    data: 'All Client Customer Data, including photos, receipts, and documents you upload.',
  },
  {
    name: 'Upstash, Inc.',
    purpose: 'Short-term cache and abuse protection (rate limits).',
    data: 'Temporary copies of records shown in the app, kept for up to 24 hours.',
  },
  {
    name: 'Telnyx LLC',
    purpose: 'Sends and receives text messages (SMS). Zerbiq uses a Telnyx account held by Dream App Lab LLC, a company under common ownership with Zerbiq, which makes it available to Zerbiq under written agreement.',
    data: 'Phone numbers and message text.',
  },
  {
    name: 'Mailgun Technologies, Inc.',
    purpose: 'Sends email, such as invoices, quotes, reminders, and sign-in codes.',
    data: 'Email addresses, names, and message content.',
  },
  {
    name: 'Stripe, Inc.',
    purpose: 'Processes card and bank payments and pays out to the Client.',
    data: 'Payment amounts, invoice details, customer email, and the payment details a payer enters on Stripe.',
  },
  {
    name: 'Google LLC (Google Maps Platform)',
    purpose: 'Address lookup, address suggestions, and map coordinates for routing.',
    data: 'Service and mailing addresses, and address search text.',
  },
  {
    name: 'Google LLC (Google Calendar)',
    purpose: 'Adds jobs to a connected Google Calendar. Only if the Client connects Google Calendar.',
    data: 'Job time, customer name, services, job notes, and assigned team member.',
  },
  {
    name: 'Anthropic, PBC',
    purpose: 'Reads uploaded bank statements to list their transactions. Only when the Client uses bank statement import.',
    data: 'The bank statement the Client uploads.',
  },
  {
    name: 'Intuit Inc. (QuickBooks Online)',
    purpose: 'Keeps the Client’s QuickBooks Online company in step with Zerbiq. Only if the Client connects QuickBooks Online.',
    data: 'Customer names and contact details, billing addresses, invoices, and payments.',
  },
  {
    name: 'OpenWeather Ltd (OpenWeatherMap)',
    purpose: 'Weather forecast shown in the app.',
    data: 'The Client’s business ZIP code only. No customer information.',
  },
  {
    name: 'Functional Software, Inc. (Sentry)',
    purpose: 'Error monitoring, so Zerbiq can find and fix problems.',
    data: 'Error details, with personal values redacted before they are sent.',
  },
  {
    name: 'Geocodio',
    purpose: 'Address pins and driving times (United States), from rounded coordinate pairs.',
    data: 'Rounded coordinates only.',
  },
  {
    name: 'Simple Routing',
    purpose: 'Hosted OpenStreetMap routing for drive times between service locations. Its servers are in Germany and France, and it is operated from New Jersey, USA.',
    data: 'Map coordinates only, rounded to about 110 m. No names, addresses, contact details, or account data. The provider keeps request logs for 24 hours, and error reports may hold coordinates for up to 30 days. Not sold.',
  },
];
