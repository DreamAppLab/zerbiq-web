# Attorney review: plan allowance rule and Terms section 4A (November 20, 2026)

Owner decision. The old "8-week average" and "sustained period" wording is retired everywhere. New rule: if a company completes more than 150% of its plan's weekly visits in each of 4 weeks in a row, its plan moves up to the next plan. Zerbiq emails the owner first and the new plan starts 30 days after that notice. Work is never blocked and there is no per-visit overage fee. The same sentence is on the pricing page, compare page, plan cards and FAQ.

The Terms now have a short section "4A. Plan allowances and automatic plan changes" (numbered 4A so no other section number or cross-reference moves), and the Terms "Last updated" date is November 20, 2026 (the Privacy Policy date is unchanged). Please check: (1) that 30 days' notice after the email is enough and how the email is delivered; (2) how 4A interacts with section 4 ("change pricing with 30 days' notice"); (3) whether the customer can move back down, which the old text allowed after 12 weeks and the new text no longer mentions (the customer-side downgrade rule is still "when your users, locations and stored files fit the smaller plan"). This entry replaces point 2 of the November 19 entry below.

---

# Attorney review: weekly visits allowance and plan moves (November 19, 2026)

The pricing page, compare page, plan cards and FAQ now describe plan size by a weekly completed-visits allowance (Solo 125, Core 350, Field 1,000, Command 2,000, see the November 20 update below) instead of a customer limit. There is no customer limit on any plan. The Terms page was not edited. Please tell us whether the Terms need wording for these points, and edit the site text below if needed:

1. The weekly-visits allowance. Every completed visit counts; skipped and canceled visits do not. It never blocks work and there is no per-visit overage fee.
2. Moving a customer up a plan. Site text: "If your average stays above your plan's allowance for a sustained period, we will contact you and, with 30 days' notice, move you to the next plan. You can move back down after 12 weeks below your allowance." Please check that 30 days' notice is enough, and whether the Terms' existing line ("Zerbiq reserves the right to change pricing with 30 days' notice", section 4) covers a plan change, or needs its own term. The move is made by Zerbiq contacting the customer; it is not an automatic system action yet.
3. Plan changes by the customer. Site text: "Upgrade anytime. You can move down when your users, locations and stored files fit the smaller plan; the change is prorated."
4. Enterprise is quoted, from $599 a month.

---

# Attorney review: customer limit wording (November 12, 2026)

One word changed in the Privacy Policy, Section 9 (Data Retention): "Archived customers and their records are retained indefinitely while your account is active" now says "Inactive customers and ...". The site no longer uses "archive" for customers. The "Last updated" date was not changed. The Terms do not define "active customer", so they are unchanged. (Update, November 19, 2026: the counted-customer plan limit this paragraph described no longer exists. There is no customer limit on any plan; see the next entry.)

---

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

We retain your data for as long as your account is active. If you cancel your subscription, your data is retained for 30 days before deletion. Inactive customers and their records are retained indefinitely while your account is active.

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
