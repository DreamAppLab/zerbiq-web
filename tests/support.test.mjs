import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import {
  SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF, SUPPORT_ADDRESS_LINES, DELETE_ACCOUNT_HREF,
} from '../lib/siteConfig.mjs';
import nextConfig from '../next.config.mjs';

test('support details match the published business details', () => {
  assert.equal(SUPPORT_EMAIL, 'support@zerbiq.com');
  assert.equal(SUPPORT_PHONE, '(904) 385-0060');
  assert.equal(SUPPORT_PHONE_HREF, 'tel:+19043850060');
  assert.deepEqual(SUPPORT_ADDRESS_LINES, ['Dream App Lab LLC', '2800 N 6th Street #5030', 'St. Augustine, FL 32084']);
  assert.equal(DELETE_ACCOUNT_HREF, 'https://app.zerbiq.com/delete-account');
});

test('support email is the one the legal pages already use', () => {
  // The legal text lives in the generated content.js files (Eddie's final documents)
  for (const f of ['app/legal/privacy/content.js', 'app/legal/tos/content.js', 'app/legal/dpa/content.js']) {
    assert.ok(readFileSync(new URL(`../${f}`, import.meta.url), 'utf8').includes(SUPPORT_EMAIL), f);
  }
});

test('no page, link or lead address still uses hello@zerbiq.com', () => {
  for (const f of ['app/page.js', 'app/legal/privacy/content.js', 'app/legal/tos/content.js', 'app/legal/dpa/content.js', 'app/legal/subprocessors/page.js', 'lib/planData.js', 'lib/siteConfig.mjs', 'components/Footer.js']) {
    assert.ok(!readFileSync(new URL(`../${f}`, import.meta.url), 'utf8').includes('hello@zerbiq.com'), f);
  }
});

test('the old /early-access page and form are gone and redirect to /support', async () => {
  const redirects = await nextConfig.redirects();
  assert.deepEqual(redirects.find((r) => r.source === '/early-access'),
    { source: '/early-access', destination: '/support', permanent: true });
  for (const f of ['app/early-access/page.js', 'app/api/early-access/route.js', 'components/EarlyAccessForm.js', 'lib/earlyAccess.mjs']) {
    assert.ok(!existsSync(new URL(`../${f}`, import.meta.url)), `${f} should be deleted`);
  }
});

test('/contact permanently redirects to /support', async () => {
  const redirects = await nextConfig.redirects();
  assert.deepEqual(redirects.find((r) => r.source === '/contact'),
    { source: '/contact', destination: '/support', permanent: true });
});

test('footer links to Support and Contact', () => {
  const footer = readFileSync(new URL('../components/Footer.js', import.meta.url), 'utf8');
  assert.match(footer, /href="\/support"/);
  assert.match(footer, /href="\/contact"/);
});

test('footer copyright attributes to Zerbiq LLC', () => {
  const footer = readFileSync(new URL('../components/Footer.js', import.meta.url), 'utf8');
  assert.match(footer, /© 2026 <ZerbiqBrand \/> LLC\. All rights reserved\./);
});

test('the share image the site points to exists and is 1200x630', () => {
  const png = readFileSync(new URL('../public/og-image.png', import.meta.url));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});
