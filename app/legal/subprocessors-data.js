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
    purpose: 'Processes the Client’s own subscription payments to Zerbiq. It also processes card and bank payments from the Client’s customers, through the Client’s own Stripe account, and pays out to the Client. The Client’s own Stripe account is used only if the Client connects it.',
    data: 'Payment amounts, invoice details, customer email, and the payment details a payer enters on Stripe. For the Client’s own subscription: the Client’s billing and contact details and plan.',
  },
  {
    name: 'PayPal, Inc.',
    purpose: 'Processes card and bank payments through the Client’s own PayPal account, only if the Client connects it. The payer enters their payment details on PayPal’s page, not in Zerbiq.',
    data: 'The payment amount and the invoice number. Payment details are entered by the payer on PayPal.',
  },
  {
    name: 'Block, Inc. (Square)',
    purpose: 'Processes card and bank payments through the Client’s own Square account, only if the Client connects it. The payer enters their payment details on Square’s page, not in Zerbiq.',
    data: 'The payment amount, the invoice number, and the customer’s email address (if on file). Payment details are entered by the payer on Square.',
  },
  {
    name: 'Authorize.Net (Visa Inc.)',
    purpose: 'Processes card payments through the Client’s own Authorize.net account, only if the Client connects it. The payer enters their card details on Authorize.net’s hosted form, not in Zerbiq.',
    data: 'The payment amount, an order reference, and the customer’s email address (if on file). Card details are entered by the payer on Authorize.net.',
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
    purpose: 'Two uses. (1) Reads uploaded bank statements to list their transactions, only when the Client uses bank statement import. (2) Powers the Zerbiq AI assistant, which answers questions about the Client’s own account. Neither is used unless a person on the Client’s team uses that feature: the assistant sends data only when someone asks it a question.',
    data: 'Bank statement import: the bank statement the Client uploads. AI assistant: the questions the person types, with the earlier turns of that conversation, and the account records the assistant looks up to answer them (for example customers, jobs, routes, invoices, quotes, team names, and services). It sees only what that person’s role is allowed to see in Zerbiq, and it can only read, never change anything.',
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
