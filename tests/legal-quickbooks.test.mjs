import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

// The Terms of Service and Privacy Policy are Eddie's final Word documents, generated verbatim into
// app/legal/{tos,privacy}/content.js (HTML strings). These tests read that text, so they check what the
// published documents really say. Never edit the documents to fit a test: change the test.
const root = new URL('..', import.meta.url).pathname;
const textOf = async (file) => {
  const { HTML } = await import(pathToFileURL(`${root}${file}`).href);
  return HTML.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
};
const privacy = await textOf('app/legal/privacy/content.js');
const terms = await textOf('app/legal/tos/content.js');

test('privacy policy has the full QuickBooks Online (Intuit) section', () => {
  assert.match(privacy, /9\. QuickBooks Online \(Intuit\) Integration/);
  assert.match(privacy, /The connection is optional/);
  assert.match(privacy, /company owner or administrator/);
  assert.match(privacy, /one permission only: Accounting/);
  assert.match(privacy, /customers, invoices, payments, credit memos, and refunds/);
  assert.match(privacy, /does not send job or invoice notes, costs, margins, or technician pay/);
  assert.match(privacy, /company name, items/);
  // What comes IN from QuickBooks, kind by kind (matches importMapping.cjs in the app)
  assert.match(privacy, /What Zerbiq brings in from QuickBooks/);
  assert.match(privacy, /Customers: the name, company, email, up to two phone numbers/);
  assert.match(privacy, /Items \(products and services\): the name, price, taxability, and category/);
  assert.match(privacy, /Vendors: the company, contact name, email, phone number, billing address, account number, and payment terms/);
  assert.match(privacy, /Employees: the name, email, phone number, and hire date only/);
  assert.match(privacy, /does not bring in pay rates, Social Security numbers, or bank details/);
  assert.match(privacy, /Purchase orders: the number, dates, status, vendor, line items, amounts, tax, and memo/);
  assert.match(privacy, /does not restore a record you deleted in Zerbiq/);
  assert.doesNotMatch(privacy, /does not import your QuickBooks data/);
  assert.doesNotMatch(privacy, /reads very little/);
  assert.match(privacy, /AES-256-GCM/);
  assert.match(privacy, /never sent to your web browser/);
  assert.match(privacy, /We do not sell it, and we do not use it for marketing/);
  assert.match(privacy, /Settings → Integrations → QuickBooks and clicking Disconnect/);
  assert.match(privacy, /revoke its access, deletes the stored tokens/);
  assert.match(privacy, /QuickBooks Apps page/);
  assert.match(privacy, /Intuit’s own privacy statement/);
  assert.doesNotMatch(privacy, /never shares it with third parties/);
});

test('terms has the numbered Third-Party Services and Integrations (QuickBooks Online) section', () => {
  assert.match(terms, /Article VIII Third-Party Services and Integrations/);
  assert.match(terms, /Section 8\.1 Optional Integrations\..*use of a Third-Party Service is optional/);
  assert.match(terms, /Section 8\.4 QuickBooks Online Integration\. If Customer connects its Account to QuickBooks Online/);
  assert.match(terms, /Customer directs Zerbiq to send Customer’s customers, invoices, payments, credit memoranda, and refunds to Customer’s QuickBooks company/);
  assert.match(terms, /import Customer’s QuickBooks customers, items or services, vendors, employees, and purchase orders into Zerbiq/);
  assert.match(terms, /Customer must review imported records within Zerbiq/);
  assert.match(terms, /cannot sign in to the Service unless Customer assigns that individual an appropriate role/);
  assert.match(terms, /remains solely responsible for its books, records, accounting determinations, and tax filings/);
  assert.match(terms, /Customer may disconnect the integration at any time/);
  assert.match(terms, /Section 8\.5 Third-Party Provider Relationship\..*Zerbiq is not affiliated with, sponsored by, or endorsed by a Third-Party Service provider/);
});

test('every Section cross-reference in the Terms and the Privacy Policy points at a section that exists', async () => {
  // Terms: "Section 8.4" style labels. Labels are in <span class="num">; mentions are in the text.
  const { HTML: tosHtml } = await import(pathToFileURL(`${root}app/legal/tos/content.js`).href);
  const labels = new Set([...tosHtml.matchAll(/<span class="num">Section (\d+\.\d+)<\/span>/g)].map((m) => m[1]));
  assert.ok(labels.size > 100);
  assert.ok(labels.has('3.5') && labels.has('8.4'));
  const mentioned = [...terms.matchAll(/Sections? (\d+\.\d+)(?: (?:and|or) (\d+\.\d+))?/gi)].flatMap((m) => [m[1], m[2]]).filter(Boolean);
  for (const n of mentioned) assert.ok(labels.has(n), `Terms refer to Section ${n}, which must exist`);
  // Privacy: numbered headings "1. " to "18. "; "Section N" mentions must be one of them.
  const { HTML: privHtml } = await import(pathToFileURL(`${root}app/legal/privacy/content.js`).href);
  const headings = new Set([...privHtml.matchAll(/<h2>(\d+)\./g)].map((m) => m[1]));
  assert.equal(headings.size, 18);
  const refs = [...privacy.matchAll(/Section (\d+)\b/g)].map((m) => m[1]);
  assert.ok(refs.length > 0);
  for (const n of refs) assert.ok(headings.has(n), `Privacy Policy refers to Section ${n}, which must exist`);
  // The Terms point to the Privacy Policy page, which exists
  assert.match(terms, /Section 7\.4 Privacy Policy\..*https:\/\/zerbiq\.com\/legal\/privacy/);
});

test('both legal documents carry their November 24, 2026 date and only the support contact', () => {
  assert.match(terms, /Effective Date: November 24, 2026/);
  assert.match(privacy, /Last Updated: November 24, 2026/);
  assert.match(privacy, /Effective Date: November 24, 2026/);
  for (const text of [terms, privacy]) {
    const emails = new Set((text.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) || []).map((e) => e.replace(/\.$/, '')));
    assert.deepEqual([...emails], ['support@zerbiq.com']);
    assert.doesNotMatch(text, /hello@zerbiq\.com/);
  }
});
