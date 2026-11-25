import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// The Data Processing Agreement is the attorney's edited Word document, generated into
// app/legal/dpa/content.js. These tests read that text. Change the test, never the document, to fit.
const root = new URL('..', import.meta.url).pathname;
const load = async (file) => (await import(pathToFileURL(`${root}${file}`).href));
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const { TITLE, HTML } = await load('app/legal/dpa/content.js');
const dpa = strip(HTML);
const terms = strip((await load('app/legal/tos/content.js')).HTML);

test('DPA names the provider, contact and current subprocessors', () => {
  assert.equal(TITLE, 'Data Processing Agreement');
  for (const s of ['Zerbiq LLC', '2895 State Road 16', 'support@zerbiq.com', 'Mailgun', 'Anthropic', 'Crisp']) {
    assert.ok(dpa.includes(s), s);
  }
});

test('DPA has no stale wording, placeholders or drafting notes', () => {
  assert.doesNotMatch(dpa, /Resend/);
  assert.doesNotMatch(dpa, /privacy@zerbiq\.com/);
  assert.doesNotMatch(dpa, /uploaded client draft/);
  assert.doesNotMatch(dpa, /\[|\]/);
});

test('DPA uses the articles, sections and schedules markup and keeps the acceptance paragraph', () => {
  assert.equal((HTML.match(/<section class="art"><h2><span class="num">Article /g) || []).length, 14);
  assert.match(HTML, /<span class="num">Section 9\.2<\/span>/);
  assert.match(HTML, /Schedule 1 — Processing Details/);
  assert.match(HTML, /Schedule 2 — Technical and Organizational Security Measures/);
  assert.match(dpa, /Acceptance\. Customer accepts this DPA/);
});

test('DPA Section 9.2 links to the subprocessor page and nothing links to the old #subprocessors id', () => {
  assert.match(HTML, /<a href="\/legal\/subprocessors">/);
  for (const f of ['app/legal/subprocessors/page.js', 'app/legal/privacy/content.js', 'components/Footer.js']) {
    assert.doesNotMatch(readFileSync(`${root}${f}`, 'utf8'), /legal\/dpa#subprocessors/, f);
  }
});

test('DPA page points to its PDF, which is published', () => {
  assert.match(readFileSync(`${root}app/legal/dpa/page.js`, 'utf8'), /\/legal\/Zerbiq-Data-Processing-Addendum\.pdf/);
  assert.ok(readFileSync(`${root}public/legal/Zerbiq-Data-Processing-Addendum.pdf`).subarray(0, 4).toString() === '%PDF');
});

test('Terms Section 7.11 incorporates the DPA', () => {
  assert.match(terms, /Section 7\.11 Data Processing Addendum\./);
  assert.match(terms, /zerbiq\.com\/legal\/dpa \(the “DPA”\)/);
  assert.match(terms, /the DPA controls/);
});
