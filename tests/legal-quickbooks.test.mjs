import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The legal pages are JSX; like the other page tests, read the source and normalize whitespace and entities.
function pageText(file) {
  return readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    .replace(/\{' '\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, ' ');
}

const privacy = pageText('app/legal/privacy/page.js');
const terms = pageText('app/legal/tos/page.js');

test('privacy policy has the full QuickBooks Online (Intuit) section', () => {
  assert.match(privacy, /7\. QuickBooks Online \(Intuit\)/);
  assert.match(privacy, /optional/i);
  assert.match(privacy, /owner or administrator/);
  assert.match(privacy, /one permission only: Accounting/);
  assert.match(privacy, /customers, invoices, payments, credit memos and refunds/);
  assert.match(privacy, /does not send job or invoice notes, costs, margins or technician pay/);
  assert.match(privacy, /company name, your items/);
  // What comes IN from QuickBooks, kind by kind (matches importMapping.cjs in the app)
  assert.match(privacy, /What Zerbiq brings in from QuickBooks/);
  assert.match(privacy, /Customers: the name, company, email, up to two phone numbers/);
  assert.match(privacy, /Items \(products and services\): the name, price, whether it is taxable, and its category/);
  assert.match(privacy, /Vendors: the company, contact name, email, phone number, billing address, account number and payment terms/);
  assert.match(privacy, /Employees: the name, email, phone number and hire date only/);
  assert.match(privacy, /does not bring in pay rates, Social Security numbers or bank details/);
  assert.match(privacy, /Purchase orders: the number, dates, status, vendor, line items, amounts, tax and memo/);
  assert.match(privacy, /does not bring back a record you deleted in Zerbiq/);
  assert.doesNotMatch(privacy, /does not import your QuickBooks data/);
  assert.doesNotMatch(privacy, /reads very little/);
  assert.match(privacy, /AES-256-GCM/);
  assert.match(privacy, /never sent to your web browser/);
  assert.match(privacy, /We do not sell it, and we do not use it for marketing/);
  assert.match(privacy, /Settings → Integrations → QuickBooks and click Disconnect/);
  assert.match(privacy, /revoke its access, deletes the stored tokens/);
  assert.match(privacy, /Apps page/);
  assert.match(privacy, /Intuit's own privacy statement/);
  assert.doesNotMatch(privacy, /never shares it with third parties/);
});

test('terms has the numbered Third-Party Integrations (QuickBooks Online) section', () => {
  assert.match(terms, /6\. Third-Party Integrations \(QuickBooks Online\)/);
  assert.match(terms, /connection is optional/i);
  assert.match(terms, /at your direction is not sharing your data with a third party/);
  assert.match(terms, /not affiliated with, sponsored by, or endorsed by Intuit/);
  assert.match(terms, /remain responsible for your books and your tax filings/);
  assert.match(terms, /review the synced records in QuickBooks/);
  assert.match(terms, /bring your QuickBooks customers, items \(services\), vendors, employees and purchase orders into Zerbiq/);
  assert.match(terms, /cannot sign in until you give them a role/);
});

test('the sharing cross-reference points at sections that exist on these pages', () => {
  assert.match(terms, /\n?\s*5\. Data and Privacy/);
  assert.match(terms, /Section 5 of these Terms or Sections 2 and 6 of our Privacy Policy/);
  assert.match(privacy, /2\. How We Use Your Information/);
  assert.match(privacy, /6\. Third-Party Services/);
});

test('both legal pages show the October 28, 2026 date and only the support contact', () => {
  for (const text of [privacy, terms]) {
    assert.match(text, /Last updated: October 28, 2026/);
  }
  const src = readFileSync(new URL('../app/legal/privacy/page.js', import.meta.url), 'utf8');
  const mailto = new Set([...src.matchAll(/mailto:([^"]+)"/g)].map((m) => m[1]));
  assert.deepEqual([...mailto], ['support@zerbiq.com']);
  assert.doesNotMatch(src, /hello@zerbiq\.com/);
});
