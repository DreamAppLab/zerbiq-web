// Authentication for the blog write routes: the hourly cron (/api/publish-scheduled)
// and the MassBlogger webhook (/api/receive-post). Both must fail closed when their
// secret is unset, and the cron must never accept the spoofable x-vercel-cron header.
// These run the REAL helpers the routes import.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { isAuthorizedCron, safeEqual } from '../lib/blog/cronAuth.mjs';
import {
  isWebhookSecretConfigured,
  verifyWebhookSignature,
  expectedSignature,
} from '../lib/blog/webhookAuth.mjs';

const SECRET = 'cron-test-secret-0123456789';
const h = (obj) => new Headers(obj);

test('cron: CRON_SECRET unset or empty refuses every request', () => {
  for (const secret of [undefined, null, '']) {
    assert.equal(isAuthorizedCron(h({ authorization: 'Bearer ' }), secret), false);
    assert.equal(isAuthorizedCron(h({ authorization: 'Bearer undefined' }), secret), false);
    assert.equal(isAuthorizedCron(h({ 'x-vercel-cron': '1' }), secret), false);
    assert.equal(isAuthorizedCron(h({}), secret), false);
  }
});

test('cron: the x-vercel-cron header alone is never accepted', () => {
  assert.equal(isAuthorizedCron(h({ 'x-vercel-cron': '1' }), SECRET), false);
  assert.equal(
    isAuthorizedCron(h({ 'x-vercel-cron': '1', authorization: 'Bearer wrong' }), SECRET),
    false,
  );
});

test('cron: wrong, short, long or malformed tokens are refused without throwing', () => {
  const bad = [
    'Bearer wrong',
    `Bearer ${SECRET.slice(0, -1)}`,
    `Bearer ${SECRET}x`,
    `Bearer  ${SECRET}`,
    SECRET,
    `bearer ${SECRET}`,
    `Basic ${SECRET}`,
    `Bearer ${'é'.repeat(SECRET.length)}`,
    '',
  ];
  for (const authorization of bad) {
    assert.doesNotThrow(() => isAuthorizedCron(h({ authorization }), SECRET));
    assert.equal(isAuthorizedCron(h({ authorization }), SECRET), false, authorization);
  }
  assert.equal(isAuthorizedCron(undefined, SECRET), false);
  assert.equal(isAuthorizedCron({}, SECRET), false);
});

test('cron: the correct bearer secret is accepted (with or without x-vercel-cron)', () => {
  assert.equal(isAuthorizedCron(h({ authorization: `Bearer ${SECRET}` }), SECRET), true);
  assert.equal(
    isAuthorizedCron(h({ authorization: `Bearer ${SECRET}`, 'x-vercel-cron': '1' }), SECRET),
    true,
  );
});

test('safeEqual: equal, unequal, different lengths and non-strings', () => {
  assert.equal(safeEqual('abc', 'abc'), true);
  assert.equal(safeEqual('abc', 'abd'), false);
  assert.equal(safeEqual('abc', 'abcd'), false);
  assert.equal(safeEqual('', ''), true);
  assert.equal(safeEqual(undefined, 'a'), false);
  assert.equal(safeEqual('a', null), false);
});

const WH_SECRET = 'webhook-test-secret';
const BODY = JSON.stringify({ event: 'post.created', post: { title: 'Hello' } });
const sign = (body, secret) =>
  `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;

test('webhook: secret unset or empty is "not configured" and verifies nothing', () => {
  for (const secret of [undefined, null, '']) {
    assert.equal(isWebhookSecretConfigured(secret), false);
    assert.equal(verifyWebhookSignature(BODY, '', secret), false);
    assert.equal(verifyWebhookSignature(BODY, sign(BODY, 'anything'), secret), false);
  }
  assert.equal(isWebhookSecretConfigured(WH_SECRET), true);
});

test('webhook: the signing scheme is unchanged (sha256= + hex HMAC of the raw body)', () => {
  assert.equal(expectedSignature(BODY, WH_SECRET), sign(BODY, WH_SECRET));
});

test('webhook: a correct signature is accepted', () => {
  assert.equal(verifyWebhookSignature(BODY, sign(BODY, WH_SECRET), WH_SECRET), true);
});

test('webhook: wrong, short, long, missing or tampered signatures are refused without throwing', () => {
  const good = sign(BODY, WH_SECRET);
  const bad = [
    sign(BODY, 'other-secret'),
    sign(`${BODY} `, WH_SECRET),
    good.slice(0, -1),
    `${good}0`,
    good.replace('sha256=', ''),
    good.toUpperCase(),
    '',
    undefined,
    null,
  ];
  for (const sig of bad) {
    assert.doesNotThrow(() => verifyWebhookSignature(BODY, sig, WH_SECRET));
    assert.equal(verifyWebhookSignature(BODY, sig, WH_SECRET), false, String(sig));
  }
});

// The routes import through the '@/' alias, which node --test cannot load, so check
// they wire in the helpers above and keep no older bypass.
const cronRoute = readFileSync(new URL('../app/api/publish-scheduled/route.js', import.meta.url), 'utf8');
const hookRoute = readFileSync(new URL('../app/api/receive-post/route.js', import.meta.url), 'utf8');

test('publish-scheduled route: auth by isAuthorizedCron first, then the Firestore check', () => {
  assert.match(cronRoute, /isAuthorizedCron\(request\.headers, process\.env\.CRON_SECRET\)/);
  assert.doesNotMatch(cronRoute, /x-vercel-cron['"]\)\s*===/);
  assert.ok(cronRoute.indexOf('isAuthorizedCron(') < cronRoute.indexOf('if (!db)'));
});

test('receive-post route: fails closed without the secret and uses the shared verifier', () => {
  assert.match(hookRoute, /isWebhookSecretConfigured\(secret\)/);
  assert.match(hookRoute, /verifyWebhookSignature\(rawBody, signature, secret\)/);
  assert.doesNotMatch(hookRoute, /skipping signature check/);
  assert.doesNotMatch(hookRoute, /return true;/);
});
