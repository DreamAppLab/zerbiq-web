# Attorney review: QuickBooks import wording (October 28, 2026)

Both pages now say "Last updated: October 28, 2026". This is a first draft for Allen to edit; the owner asked for it to go up now and be refined after review. It must be mirrored in the Privacy Policy and Terms inside the app (app.zerbiq.com), which Intuit reviews.

Why: Zerbiq now also brings records IN from QuickBooks (before, it only sent records out and read a few settings). The old Privacy 7 sentence "Zerbiq does not import your QuickBooks data into Zerbiq" was no longer true and was removed.

## Privacy Policy 7 (changed)
- Intro: customers and services come over from QuickBooks as well as invoices and payments going out.
- New "What Zerbiq brings in from QuickBooks": customers (name, company, email, up to two phones, billing and shipping addresses; sub-customers become service addresses; inactive skipped), items (name, price, taxable, category; become services), vendors (company, contact name, email, phone, billing address, account number, payment terms; become suppliers), employees (name, email, phone, hire date only; no pay rates, Social Security numbers or bank details; created inactive with no sign-in until the company chooses a role), purchase orders (number, dates, status, vendor, lines, amounts, tax, memo; read-only).
- Matching and safety: checked against existing records by email or name and address, asks before merging when unsure, never overwrites a value edited in Zerbiq, never recreates a record deleted in Zerbiq.
- "What else Zerbiq reads" keeps the settings and lookups list; "reads very little" was removed.
- Disconnecting: records already brought into Zerbiq stay in the Zerbiq account.

## Terms 6 (changed)
Adds that the user directs Zerbiq to bring QuickBooks customers, items, vendors, employees and purchase orders in and keep them up to date; that imported records are only as accurate as in QuickBooks and should be reviewed; and that people brought in cannot sign in until given a role.

## Points for you
- Employees are personal data about the company's workers. Please check whether the Privacy Policy needs a line that the company (the customer) is responsible for having the right to import its employees' contact details.
- Please confirm the "never sold, not used for marketing" sentence still covers the imported lists.

---

# Attorney review: QuickBooks wording update (October 26, 2026)

Both pages now say "Last updated: October 26, 2026". The QuickBooks sections below replace the shorter October 18 versions described further down, and match the Privacy Policy and Terms inside the app (app.zerbiq.com), which Intuit reviews for production approval.

## Privacy Policy 7. QuickBooks Online (Intuit) (replaced)

Now covers: the connection is optional and off until an owner or administrator connects it; the one permission asked (Accounting only, no QuickBooks Payments, no Intuit profile); exactly which fields Zerbiq sends (customers, invoices, payments, credit memos, refunds) and which it never sends (notes, costs, margins, technician pay); the few things it reads; token encryption (AES-256-GCM, key kept outside the database, tokens never sent to the browser); use only to run the connection, never sold or used for marketing; how to disconnect and what is kept afterward (the match list and sync log, deleted with the account).

The old last sentence, "Zerbiq never sells QuickBooks data and never shares it with third parties", was replaced by "We do not sell it, and we do not use it for marketing." This resolves the first point under "Points to check" below (the "never shares" wording conflicting with Privacy 6).

The section's privacy contact is support@zerbiq.com. Resolved October 26, 2026: the owner chose support@zerbiq.com as the single contact for privacy and support questions, on this site and in the app's Privacy Policy and Terms, so Intuit's review sees the same address at both URLs. The "Contact" sections (Privacy 12, Terms 11) and every other email link on both pages now use it too. No action needed from you.

## Terms of Service 6. Third-Party Integrations (QuickBooks Online) (replaced; was "QuickBooks Online Connection")

Same number as before, so no renumbering. Please review this sentence:

> Sending your records to QuickBooks at your direction is not sharing your data with a third party for the purposes of Section 5 of these Terms or Sections 2 and 6 of our Privacy Policy.

Why it is there: Terms 5 and Privacy 2 and 6 describe how we treat and share customer data. A customer who connects QuickBooks is telling Zerbiq to send their own records to their own QuickBooks company, and we want that to be clearly outside any promise about third-party sharing. Questions: (1) is it safe to say this in the Terms, or should it be handled in the Privacy Policy only; (2) are Terms 5 and Privacy 2 and 6 the right sections to point to (the app's Terms point to its sections 5 and 6, which are different sections than this site's); (3) the same section also says Zerbiq is not affiliated with or endorsed by Intuit, that records can be delayed or refused by QuickBooks, and that the customer stays responsible for their books and tax filings. Please check those too.

---

# Attorney review: Privacy Policy and Terms of Service (October 18, 2026)

These changes went live on zerbiq.com before review. Both pages say
"Last updated: October 18, 2026" (previously September 5, 2026).

- Privacy Policy: https://zerbiq.com/legal/privacy
- Terms of Service: https://zerbiq.com/legal/tos

Old section numbers below refer to the September 5, 2026 version.

## Privacy Policy

### 7. QuickBooks Online (new)

Connecting QuickBooks Online is optional. Only a company's owner or an administrator can connect it, and they do so by signing in to Intuit and approving the connection.

Once connected, Zerbiq writes the company's customers, invoices, and payments into that company's QuickBooks account. Zerbiq reads from QuickBooks only what it needs to avoid creating duplicates, such as the list of products and services (items) and the QuickBooks record IDs that match Zerbiq records, along with the name of the connected QuickBooks company.

The access tokens Intuit issues for the connection are stored encrypted and are never shown to anyone, including the company's own users. Disconnecting QuickBooks, which the company can do at any time, revokes Zerbiq's access at Intuit and deletes the stored tokens.

Zerbiq never sells QuickBooks data and never shares it with third parties.

### 8. Text Messages (SMS) (new)

Zerbiq sends text messages on behalf of the businesses that use Zerbiq, for example appointment reminders, "on the way" notices, and invoice links. Texts are sent only to people who have given consent to receive them.

Mobile phone numbers and SMS consent are never shared with or sold to third parties or affiliates for marketing purposes.

Texting is an optional paid add-on on every plan (new). No texts are included in any plan, and the pricing page, compare page, features page and home page now say so. Please check this wording:
- The business pays a $49 one-time setup fee, which registers the business with the phone carriers, and then buys prepaid text blocks (500 for $10, 1,000 for $18, 2,500 for $40). Block texts never expire. A long text or one with emoji can count as 2 or more texts. When texts run out, texting pauses and messages go by email until more are bought.
- Each business sends from its own toll-free number (8xx), verified under the business's name. Carrier approval usually takes a few days and can take up to a couple of weeks; until then messages go by email. The site makes no promise about approval or timing.
- Turning texting off releases the toll-free number, and it cannot be recovered. Turning it back on means paying the $49 setup again, getting a new toll-free number, and going through carrier approval again. Unused purchased texts stay on the account.
- Without the add-on, every plan still sends reminders, on-the-way notices, invoices and review requests by email.
- Questions for you: (1) is "never expire" for prepaid texts acceptable, or should the terms state a refund or expiry policy on cancellation; (2) is the number-release disclosure clear enough before a business turns texting off; (3) does the privacy page section 8 and the Terms need to name the add-on and the business's own toll-free number.

Reply STOP to any message to opt out, or HELP for help. Message frequency varies. Message and data rates may apply.

### 9. Data Retention (changed: was section 7; removed "or your trial expires")

We retain your data for as long as your account is active. If you cancel your subscription, your data is retained for 30 days before deletion. Archived customers and their records are retained indefinitely while your account is active.

### Renumbered, wording unchanged

- 8. Children's Privacy → 10
- 9. Changes to This Policy → 11
- 10. Contact → 12

## Terms of Service

### 5. Free Trial (removed)

The former section 5 was removed because the app is not open for public signup yet; the site asks visitors to request early access instead. The removed text was:

> Zerbiq offers a 14-day free trial. No payment information is required to start a trial. At the end of the trial period, your account will pause until you subscribe. Your data is retained for 30 days after trial expiration.

### 6. QuickBooks Online Connection (new)

Connecting a QuickBooks Online account to Zerbiq is optional. By connecting it, you authorize Zerbiq to exchange data with that QuickBooks account as described in our Privacy Policy. You can disconnect QuickBooks at any time. Intuit's own terms also apply to your QuickBooks account.

### 7. Labor and Pay Information (new)

Zerbiq lets you record pay rates and the amounts your team earns so you can understand labor costs and job profitability. Zerbiq is not a payroll provider, employer of record, or tax or legal adviser. You are solely responsible for paying your workers correctly and for complying with all wage, hour, tax and withholding laws that apply to you.

### Renumbered, wording unchanged

- 6. Data and Privacy → 5
- 7. Prohibited Uses → 8
- 8. Limitation of Liability → 9
- 9. Termination → 10
- 10. Contact → 11

## Points to check

- Privacy 7 says Zerbiq "never shares" QuickBooks data with third parties. Privacy 6 (Third-Party Services) says service providers such as cloud hosts have access to data as needed to run the platform. Please confirm the two read consistently.
- Privacy 7 says Zerbiq reads "the name of the connected QuickBooks company". According to the original draft notes, the app's QuickBooks code stores the company name and country when it connects.
- "Message frequency varies" (Privacy 8) is included because carriers usually expect it next to STOP/HELP.
- Terms 10 says data "may be retained for up to 30 days after termination"; Privacy 9 says data "is retained for 30 days" after cancellation. This wording predates these changes.

---

# Cookies, tracking and Data Processing Addendum (October 18, 2026)

This second set of changes is a separate pull request (branch `legal/cookies-and-dpa`, built on top of the QuickBooks/SMS changes above). It is not live yet. It goes live only when Eddie merges it. All three pages say "Last updated: October 18, 2026".

- Privacy Policy: https://zerbiq.com/legal/privacy
- Terms of Service: https://zerbiq.com/legal/tos
- Data Processing Addendum (new page): https://zerbiq.com/legal/dpa

## Why

In 2025 California fined Tractor Supply $1.35M. Its website cookies and pixels sent visitor data to ad companies, which counts as "selling/sharing" under California law. It also ignored opt-outs, including the Global Privacy Control (GPC) browser signal, had an incomplete privacy policy, and lacked required privacy terms in its vendor contracts. Before writing these sections we audited zerbiq.com (the code and the production build, page by page) and the app at app.zerbiq.com (code only).

## Audit results that the text relies on

- **zerbiq.com:** no cookies, no local or session storage, no analytics, no ad or social pixels, no chat widget, no video embeds. The one third-party request was Google Fonts, loaded from Google on every page view. That sent each visitor's IP address and browser details to Google. This PR removes it, and the same font is now served from zerbiq.com. A staff-only blog admin page uses Google sign-in (Firebase Auth) plus a stylesheet from cdn.quilljs.com. Visitors never load that page.
- **app.zerbiq.com:** the app uses one cookie in production, `zq_portal` (customer portal sign-in, 30 days). A second cookie, `zq_qbo_oauth` (10 minutes), ships with the QuickBooks Online connection, which is not released yet. Everything else is local or session storage that the app needs to work. There are no analytics, ad pixels or chat widgets, and no Stripe.js, Square SDK or Google Maps script in the browser. Stripe is reached only through Stripe-hosted pages. Address lookups go to Google from Zerbiq's servers, not from the browser.
- **Selling/sharing:** nothing found on either site that counts as selling or sharing under California law.

## Privacy Policy

### 5. Cookies and Similar Technologies (rewritten; was "5. Cookies")

The old text was:

> Zerbiq uses essential cookies required for authentication and platform functionality. We do not use tracking or advertising cookies. You may disable cookies in your browser settings, but some features of the Service may not function correctly without them.

New text:

**We do not sell or share your personal information. We do not use advertising cookies or tracking pixels.**

"Cookies and similar technologies" means small files and records a website keeps in your browser (cookies, local storage, and session storage), and requests a page makes to other companies' servers. We use them only to run the Service. We do not use analytics, advertising, or social media tracking tools, and no other company can track you across websites through Zerbiq.

**Our website (zerbiq.com)**

Our website sets no cookies and stores nothing in your browser. Our fonts are served from our own website, so your browser does not contact Google or any other company to show our pages. Our hosting provider, Vercel, keeps standard server logs (such as IP address, browser type, and the page requested) to deliver the site and keep it secure. If you send the early-access form, what you type is emailed to our team; it is not stored in your browser. A staff-only page used to publish our blog uses Google sign-in, which stores a sign-in record in that staff member's browser; visitors never load it.

**The Zerbiq app (app.zerbiq.com)**

All of these are essential: the app needs them to sign you in, keep you signed in, and remember the choices you make in it.

- **Sign-in session (local storage, sb-…-auth-token).** Keeps you signed in to the app. Set by Supabase, our sign-in provider. Kept until you sign out.
- **Customer portal sign-in (cookie, zq_portal).** Keeps a business's customer signed in to its customer portal. It holds a random code, not your details. Lasts 30 days from your last visit, or until you sign out.
- **QuickBooks connection check (cookie, zq_qbo_oauth).** Set only while an owner or administrator connects QuickBooks Online, to confirm the approval came back to the same browser. Lasts 10 minutes and is deleted when the connection finishes.
- **App settings and work in progress (local and session storage, zq:… keys).** Remembers things like team colors, dismissed notices, recent searches, and unsent form answers. Cleared when you sign out.
- **Display preferences (local storage).** Remembers light or dark mode, which sidebar sections are open, and whether you have seen the "install app" prompt. Kept on your device until you clear it.
- **Customer portal and quote pages (session storage).** Shows the business's name and logo, holds a one-time sign-in link until you use it, and notes that you viewed a quote. Cleared when you close the tab.
- **Error recovery (session storage).** Notes the time the app reloaded itself after an update, so it does not reload twice. Cleared when you close the tab.

**Other companies your browser may contact in the app**

- **Supabase.** Handles sign-in and stores and delivers the photos and files you upload.
- **Stripe.** When you pay an invoice or set up payouts, you go to a Stripe page. Stripe's own cookies and privacy policy apply there.
- **Google and Intuit.** Only if a business chooses to connect Google Calendar or QuickBooks Online: you are sent to Google or Intuit to approve the connection.
- **ipify.** When a customer approves a quote, the page asks this service for the device's public IP address.

Links to Google Maps, Apple Maps, or a business's review page are ordinary links; nothing is sent to those sites unless you click one.

**Your choices**

You can see, block, or delete cookies and stored data in your browser's settings. Signing out of the app clears your sign-in and most stored data on that device. Session storage is cleared when you close the tab. If you block cookies or storage for app.zerbiq.com, you will not be able to sign in. Because we use no optional cookies, there is no cookie banner and nothing to opt out of.

**Global Privacy Control**

If your browser sends a Global Privacy Control (GPC) signal, we treat it as a valid request to opt out of the sale or sharing of your personal information, for that browser and for any account we can link to it. Because we never sell or share personal information and use no optional cookies, nothing else needs to change, and the site works the same either way. If we ever add an optional technology, it will not run in a browser that sends GPC.

### 6. Third-Party Services (one sentence added at the end)

> The services that handle the data our business customers keep in Zerbiq are listed in our Data Processing Addendum.

## Terms of Service

### 5. Data and Privacy (changed)

- "to process your data to provide **and improve** the Service" now reads "to process your data to provide the Service". This keeps it in line with the DPA, which says Zerbiq uses Client Customer Data only to provide the Service.
- New second paragraph:

> Our Data Processing Addendum is part of these Terms. It covers the personal information about your customers, leads, and team members that you keep in Zerbiq: Zerbiq acts only on your instructions, uses that information only to provide the Service, never sells it or uses it for its own purposes, keeps it confidential and secure, uses only the subprocessors listed there, helps you with your customers' privacy requests, tells you without undue delay about a security incident, and deletes or returns the information when your account ends.

No sections were renumbered.

## Data Processing Addendum (new page: /legal/dpa)

### 1. About This Addendum

This Data Processing Addendum ("DPA") is part of the Zerbiq Terms of Service. It applies to every business that has a Zerbiq account (the "Client").

"Client Customer Data" means personal information about the Client's customers, leads, and team members that the Client puts into Zerbiq, or that Zerbiq collects for the Client. This includes information collected through the Client's customer portal, quote and invoice pages, lead forms, and text messages.

For Client Customer Data, the Client decides how and why it is used. Zerbiq acts only as the Client's service provider (sometimes called a processor). Where this DPA and the Terms of Service disagree about Client Customer Data, this DPA controls.

### 2. Zerbiq Acts Only on the Client's Instructions

Zerbiq handles Client Customer Data only on the Client's instructions. Those instructions are the Terms of Service, this DPA, and the settings and actions the Client and its users choose in Zerbiq. If Zerbiq believes an instruction breaks the law, it will tell the Client.

### 3. What Zerbiq Will Never Do

Zerbiq uses Client Customer Data only to provide the Service to the Client. Zerbiq will not:

- sell Client Customer Data, or share it for targeted (cross-context behavioral) advertising;
- use it for Zerbiq's own purposes, such as marketing or building profiles;
- keep, use, or disclose it for any purpose other than providing the Service, or outside its direct business relationship with the Client;
- combine it with personal information Zerbiq gets from other sources, except as needed to provide the Service and as the law allows.

Zerbiq understands these restrictions and will comply with them. It will follow the California Consumer Privacy Act and other U.S. state privacy laws that apply to service providers, and give Client Customer Data the same level of protection those laws require. If Zerbiq can no longer meet these obligations, it will tell the Client, and the Client may take reasonable steps to stop and fix any unauthorized use.

### 4. Confidentiality

Zerbiq keeps Client Customer Data confidential. Only people who need access to provide or support the Service get it, and they are bound to keep it confidential. When Zerbiq staff open a Client's account to give support, that access is logged.

### 5. Security

Zerbiq protects Client Customer Data with reasonable technical and organizational measures suited to the data. These include encryption in transit (TLS), encryption at rest, access controls that keep each Client's data separate, and encrypted storage of the access tokens for connected services such as QuickBooks Online and Google Calendar.

### 6. Subprocessors

The Client authorizes Zerbiq to use the subprocessors listed below, and only them, to provide the Service. Zerbiq has a written agreement with each one that protects Client Customer Data at least as well as this DPA, and Zerbiq remains responsible for their work.

| Subprocessor | Purpose | Data |
|---|---|---|
| Vercel, Inc. | Hosts the Zerbiq app and runs its servers. | All Client Customer Data passes through it while the app is in use; standard server logs. |
| Supabase, Inc. | Main database, user sign-in, and file storage. | All Client Customer Data, including photos, receipts, and documents you upload. |
| Upstash, Inc. | Short-term cache and abuse protection (rate limits). | Temporary copies of records shown in the app, kept for up to 24 hours. |
| Telnyx LLC | Sends and receives text messages (SMS). | Phone numbers and message text. |
| Mailgun Technologies, Inc. | Sends email, such as invoices, quotes, reminders, and sign-in codes. | Email addresses, names, and message content. |
| Stripe, Inc. | Processes card and bank payments and pays out to the Client. | Payment amounts, invoice details, customer email, and the payment details a payer enters on Stripe. |
| Google LLC (Google Maps Platform) | Address lookup, address suggestions, and map coordinates for routing. | Service and mailing addresses, and address search text. |
| Google LLC (Google Calendar) | Adds jobs to a connected Google Calendar. Only if the Client connects Google Calendar. | Job time, customer name, services, job notes, and assigned team member. |
| Anthropic, PBC | Reads uploaded bank statements to list their transactions. Only when the Client uses bank statement import. | The bank statement the Client uploads. |
| Intuit Inc. (QuickBooks Online) | Keeps the Client's QuickBooks Online company in step with Zerbiq. Only if the Client connects QuickBooks Online. | Customer names and contact details, billing addresses, invoices, and payments. |
| OpenWeather Ltd (OpenWeatherMap) | Weather forecast shown in the app. | The Client's business ZIP code only. No customer information. |

Before adding or replacing a subprocessor, Zerbiq will update this list and email the account owner at least 30 days in advance. A Client that objects may end its subscription before the change takes effect.

### 7. Helping with Customer Privacy Requests

Zerbiq lets the Client view, correct, export, and delete Client Customer Data in the app, and will help the Client answer requests from its customers and team members to access, correct, or delete their information. If one of the Client's customers contacts Zerbiq directly about such a request, Zerbiq will pass it to the Client and will not answer it except to point the person to the Client.

### 8. Security Incidents

If Zerbiq becomes aware of unauthorized access to, or loss or disclosure of, Client Customer Data, it will notify the Client without undue delay. The notice will say what happened and what data was involved, as far as Zerbiq knows, and what Zerbiq is doing about it. Zerbiq will keep the Client updated and help the Client meet any notice duties it has to its customers or regulators.

### 9. When the Account Ends

While the account is open, the Client can export its data from the app at any time. When the account ends, the Client may also ask Zerbiq for a copy.

Zerbiq deletes Client Customer Data, including uploaded files, within 30 days after the account ends, unless the law requires Zerbiq to keep it. Copies in backups are deleted as those backups expire, and are kept secure until then.

### 10. Information for the Client

On reasonable request, Zerbiq will give the Client the information it reasonably needs to confirm that Zerbiq is meeting this DPA.

### 11. Contact

For questions about this DPA, contact us at hello@zerbiq.com.

## Points to check (cookies and DPA)

- **Deletion promise vs. the app today (DPA 9, Terms 5).** The app's account-closure job does not yet do everything DPA 9 promises. It deletes rows from a fixed list of 43 tables, but the database has about 178 tables, and it does not delete uploaded files. It also keeps the company's own account row (name and email). The app needs fixing before this text goes live, or DPA 9 needs softer wording.
- **Breach notice timing (DPA 8).** The text says "without undue delay", as requested. Some client contracts and state laws expect a fixed deadline (for example 72 hours). The app has no written incident-response plan yet.
- **Subprocessor notice (DPA 6).** The 30-day advance notice and the right to cancel are proposals. Please confirm, and confirm that Zerbiq has a signed DPA with each listed vendor (most of them offer standard ones).
- **Removed "and improve" (Terms 5).** California law does let service providers use data to improve their own service in limited ways. It was removed so the Terms match Eddie's instruction that client data is used only to provide the service.
- **"No tracking pixels" and email.** The app's code does not switch on Mailgun open or click tracking, which works through a pixel in emails. It can also be switched on for the whole domain in the Mailgun dashboard, so please confirm it is off before relying on this sentence.
- **ipify (Privacy 5).** When a customer approves a quote, the app sends their IP address to ipify, a third party, and then discards it. The policy discloses this accurately for now. The recommended fix is in the app: remove the call (or read the IP on Zerbiq's server), then delete that bullet.
- **QuickBooks cookie and subprocessor.** `zq_qbo_oauth` and Intuit are listed because Privacy 7 already describes the QuickBooks connection. The production app currently offers only a QuickBooks file export, and the live connection is on unreleased branches.
- **Anthropic (DPA 6).** Bank statements uploaded for import are sent to Anthropic's API. Please confirm the commercial terms (no training on customer data) meet the DPA standard.
- **Resend and Square are not listed.** Resend is used only by zerbiq.com's early-access form, for prospects' own details, not for Client Customer Data. Square is shown as "coming soon" in the app and is not in use.
- **In-app privacy page.** The app has its own /privacy page that still says data is stored on Google Firebase and lists only Firebase, Vercel and Stripe. It should be replaced with a link to zerbiq.com/legal/privacy.
