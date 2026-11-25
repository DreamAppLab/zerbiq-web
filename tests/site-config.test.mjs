import { test } from 'node:test';
import assert from 'node:assert/strict';
import { activeStoreLinks, SIGN_IN_HREF, PRIMARY_CTA_LABEL, STORE_LINKS } from '../lib/siteConfig.mjs';

test('sign-in links to the app login', () => {
  assert.equal(SIGN_IN_HREF, 'https://app.zerbiq.com/login');
});

test('primary CTA label is a non-empty string', () => {
  assert.ok(PRIMARY_CTA_LABEL.trim().length > 0);
});

test('shipped config has both published store links', () => {
  assert.equal(STORE_LINKS.appStore, 'https://apps.apple.com/app/id6825717480');
  assert.equal(STORE_LINKS.googlePlay, 'https://play.google.com/store/apps/details?id=com.zerbiq.app');
  assert.deepEqual(activeStoreLinks(STORE_LINKS).map((s) => s.label), ['App Store', 'Google Play']);
  assert.deepEqual(activeStoreLinks(), activeStoreLinks(STORE_LINKS));
});

test('a store with an empty link is hidden', () => {
  assert.deepEqual(activeStoreLinks({ appStore: '', googlePlay: '' }), []);
});

test('only stores with a link are shown', () => {
  assert.deepEqual(
    activeStoreLinks({ appStore: 'https://apps.example/x', googlePlay: ' ' }),
    [{ label: 'App Store', href: 'https://apps.example/x' }],
  );
});
