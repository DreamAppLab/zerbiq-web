import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
  for (const f of ['app/legal/privacy/page.js', 'app/legal/tos/page.js']) {
    assert.ok(readFileSync(new URL(`../${f}`, import.meta.url), 'utf8').includes(SUPPORT_EMAIL), f);
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
