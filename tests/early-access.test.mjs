import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  handleEarlyAccess,
  createRateLimiter,
  validateEarlyAccess,
  buildLeadEmail,
  earlyAccessMailto,
  earlyAccessHref,
  planFromQuery,
  EARLY_ACCESS_EMAIL,
  HONEYPOT_FIELD,
} from '../lib/earlyAccess.mjs';

const LEAD = {
  name: 'Pat Example',
  company: 'Green Cuts',
  email: 'pat@example.com',
  phone: '555-0101',
  industry: 'Lawn care',
  teamSize: '6–10',
  plan: 'Field',
  message: '',
};
const ENV = { RESEND_API_KEY: 'test-key', EARLY_ACCESS_FROM: 'Zerbiq <no-reply@example.com>' };
const quietLog = { error() {} };

function post(body, ip = '203.0.113.7') {
  return new Request('http://localhost/api/early-access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `${ip}, 10.0.0.1` },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function fakeResend(status = 200) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return new Response('{}', { status });
  };
  return { calls, fetchImpl };
}

const never = () => false;

test('sends a valid lead to the early-access address with the visitor as reply-to', async () => {
  const resend = fakeResend();
  const res = await handleEarlyAccess(post(LEAD), { env: ENV, fetchImpl: resend.fetchImpl, isLimited: never });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(resend.calls.length, 1);
  const { url, init, body } = resend.calls[0];
  assert.equal(url, 'https://api.resend.com/emails');
  assert.equal(init.headers.Authorization, 'Bearer test-key');
  assert.deepEqual(body.to, [EARLY_ACCESS_EMAIL]);
  assert.equal(body.reply_to, 'pat@example.com');
  assert.equal(body.from, ENV.EARLY_ACCESS_FROM);
  assert.match(body.subject, /Green Cuts \(Field\)/);
  for (const v of ['Pat Example', 'Green Cuts', '555-0101', 'Lawn care', '6–10', 'Field']) {
    assert.ok(body.text.includes(v), `email text includes ${v}`);
  }
});

test('honeypot submission answers like success and sends nothing', async () => {
  const resend = fakeResend();
  const res = await handleEarlyAccess(post({ ...LEAD, [HONEYPOT_FIELD]: 'http://spam.example' }), {
    env: ENV, fetchImpl: resend.fetchImpl, isLimited: never,
  });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(resend.calls.length, 0);
});

test('rate-limited IP gets 429 and nothing is sent', async () => {
  const resend = fakeResend();
  const isLimited = createRateLimiter({ max: 2, windowMs: 60_000 });
  const opts = { env: ENV, fetchImpl: resend.fetchImpl, isLimited };
  assert.equal((await handleEarlyAccess(post(LEAD), opts)).status, 200);
  assert.equal((await handleEarlyAccess(post(LEAD), opts)).status, 200);
  const third = await handleEarlyAccess(post(LEAD), opts);
  assert.equal(third.status, 429);
  assert.deepEqual(await third.json(), { error: 'rate_limited' });
  assert.equal(resend.calls.length, 2);
  // A different IP is not affected.
  assert.equal((await handleEarlyAccess(post(LEAD, '198.51.100.9'), opts)).status, 200);
});

test('rate limiter forgets requests older than the window', () => {
  const isLimited = createRateLimiter({ max: 1, windowMs: 1000 });
  assert.equal(isLimited('a', 0), false);
  assert.equal(isLimited('a', 500), true);
  assert.equal(isLimited('a', 1500), false);
});

test('without the Resend variables the handler says not_configured and sends nothing', async () => {
  const resend = fakeResend();
  const res = await handleEarlyAccess(post(LEAD), { env: {}, fetchImpl: resend.fetchImpl, isLimited: never });
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { error: 'not_configured' });
  assert.equal(resend.calls.length, 0);
});

test('Resend refusing or unreachable is send_failed, without echoing the lead', async () => {
  const refused = await handleEarlyAccess(post(LEAD), {
    env: ENV, fetchImpl: fakeResend(422).fetchImpl, isLimited: never, log: quietLog,
  });
  assert.equal(refused.status, 502);
  assert.deepEqual(await refused.json(), { error: 'send_failed' });

  const down = await handleEarlyAccess(post(LEAD), {
    env: ENV, fetchImpl: async () => { throw new TypeError('fetch failed'); }, isLimited: never, log: quietLog,
  });
  assert.equal(down.status, 502);
});

test('missing or malformed fields are refused with the field name', async () => {
  const opts = { env: ENV, fetchImpl: fakeResend().fetchImpl, isLimited: never };
  for (const [patch, field] of [
    [{ name: '' }, 'name'],
    [{ company: '  ' }, 'company'],
    [{ email: 'not-an-email' }, 'email'],
    [{ phone: '12' }, 'phone'],
    [{ industry: '' }, 'industry'],
    [{ teamSize: '1000' }, 'teamSize'],
    [{ plan: 'Platinum' }, 'plan'],
    [{ message: 'x'.repeat(2001) }, 'message'],
  ]) {
    const res = await handleEarlyAccess(post({ ...LEAD, ...patch }), opts);
    assert.equal(res.status, 400, field);
    assert.equal((await res.json()).field, field);
  }
  const bad = await handleEarlyAccess(post('{not json'), opts);
  assert.equal(bad.status, 400);
});

test('message is optional and values are trimmed', () => {
  const checked = validateEarlyAccess({ ...LEAD, name: '  Pat Example  ', message: undefined });
  assert.equal(checked.ok, true);
  assert.equal(checked.lead.name, 'Pat Example');
  assert.equal(checked.lead.message, '');
});

test('subject cannot carry line breaks', () => {
  const { subject } = buildLeadEmail({ ...LEAD, company: 'Evil\r\nBcc: x@example.com' });
  assert.ok(!/[\r\n]/.test(subject));
});

test('fallback email keeps everything the visitor typed', () => {
  const href = earlyAccessMailto({ ...LEAD, message: 'Call after 3' });
  assert.ok(href.startsWith(`mailto:${EARLY_ACCESS_EMAIL}?subject=`));
  const body = decodeURIComponent(href.split('&body=')[1]);
  for (const line of ['Name: Pat Example', 'Company: Green Cuts', 'Phone: 555-0101', 'Team size: 6–10', 'Plan: Field', 'Message: Call after 3']) {
    assert.ok(body.includes(line), line);
  }
});

test('button links carry the plan and the form reads it back', () => {
  assert.equal(earlyAccessHref('Command'), '/early-access?plan=Command');
  assert.equal(earlyAccessHref(), '/early-access');
  assert.equal(planFromQuery('command'), 'Command');
  assert.equal(planFromQuery('nonsense'), 'Not sure yet');
  assert.equal(planFromQuery(undefined), 'Not sure yet');
});
