import { test } from 'node:test';
import assert from 'node:assert/strict';
import { activeStoreLinks, SIGN_IN_HREF, PRIMARY_CTA_LABEL, STORE_LINKS } from '../lib/siteConfig.mjs';

test('sign-in links to the app login', () => {
  assert.equal(SIGN_IN_HREF, 'https://app.zerbiq.com/login');
});

test('primary CTA label is a non-empty string', () => {
  assert.ok(PRIMARY_CTA_LABEL.trim().length > 0);
});

test('store links are hidden while empty (shipped config)', () => {
  assert.deepEqual(activeStoreLinks(STORE_LINKS), []);
});

test('only stores with a link are shown', () => {
  assert.deepEqual(
    activeStoreLinks({ appStore: 'https://apps.example/x', googlePlay: ' ' }),
    [{ label: 'App Store', href: 'https://apps.example/x' }],
  );
});
