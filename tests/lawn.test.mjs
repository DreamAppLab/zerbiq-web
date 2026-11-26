// /lawn landing page (lawn care flyer QR code): sign-up links, setup code field, rendered page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  SIGNUP_HREF, SELF_SERVE_PLAN_IDS, SUPPORT_EMAIL, FOUNDER_PHONE, FOUNDER_PHONE_HREF, lawnSignupHref,
} from '../lib/siteConfig.mjs';
import { LAWN_CODE_PREFIX, lawnCodeDigits, lawnCodeStatus, lawnSetupCode } from '../lib/lawnSetupCode.mjs';
import { STATIC_ROUTES, sitemapEntries } from '../lib/blog/seo.mjs';

register('./support/jsx-hooks.mjs', import.meta.url);

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');

// ── lawnSignupHref ─────────────────────────────────────────────────────────
test('lawnSignupHref: no code gives the plan link only', () => {
  assert.equal(lawnSignupHref('', 'solo'), `${SIGNUP_HREF}?plan=solo`);
  assert.equal(lawnSignupHref(undefined, 'core'), `${SIGNUP_HREF}?plan=core`);
  assert.equal(lawnSignupHref(null), `${SIGNUP_HREF}?plan=solo`, 'plan defaults to solo');
  assert.equal(lawnSignupHref('   ', 'solo'), `${SIGNUP_HREF}?plan=solo`, 'blank code is left out');
});

test('lawnSignupHref: a code is added as setup=', () => {
  assert.equal(lawnSignupHref('LAWN-123456', 'solo'), 'https://app.zerbiq.com/signup?plan=solo&setup=LAWN-123456');
  assert.equal(lawnSignupHref('LAWN-123456', 'core'), 'https://app.zerbiq.com/signup?plan=core&setup=LAWN-123456');
});

test('lawnSignupHref: the code is URL-encoded', () => {
  const href = lawnSignupHref('LAWN 1&2=3#x', 'solo');
  assert.equal(href, `${SIGNUP_HREF}?plan=solo&setup=LAWN+1%262%3D3%23x`);
  assert.equal(new URL(href).searchParams.get('setup'), 'LAWN 1&2=3#x');
});

test('lawnSignupHref: only the app plan ids are sent', () => {
  for (const id of SELF_SERVE_PLAN_IDS) assert.equal(new URL(lawnSignupHref('', id)).searchParams.get('plan'), id);
  assert.equal(lawnSignupHref('', 'Core'), `${SIGNUP_HREF}?plan=core`, 'plan names are lowercased');
  assert.equal(lawnSignupHref('', 'enterprise'), SIGNUP_HREF, 'Enterprise is not self-serve');
  assert.equal(lawnSignupHref('LAWN-123456', 'gold'), `${SIGNUP_HREF}?setup=LAWN-123456`);
});

// ── setup code field ──────────────────────────────────────────────────────
test('setup code: typed digits, a pasted full code and stray characters all reduce to the 6 digits', () => {
  assert.equal(LAWN_CODE_PREFIX, 'LAWN-');
  assert.equal(lawnCodeDigits('123456'), '123456');
  assert.equal(lawnCodeDigits('LAWN-123456'), '123456');
  assert.equal(lawnCodeDigits('  lawn-123456 '), '123456');
  assert.equal(lawnCodeDigits('Lawn 123 456'), '123456');
  assert.equal(lawnCodeDigits('LAWN123456'), '123456');
  assert.equal(lawnCodeDigits('12-34 56'), '123456');
  assert.equal(lawnCodeDigits('1234567'), '123456', 'at most 6 digits');
  assert.equal(lawnCodeDigits('abc'), '');
  assert.equal(lawnCodeDigits(undefined), '');
});

test('setup code: status is empty, partial or complete (format only, never "valid")', () => {
  assert.equal(lawnCodeStatus(''), 'empty');
  assert.equal(lawnCodeStatus('123'), 'partial');
  assert.equal(lawnCodeStatus('123456'), 'complete');
  assert.equal(lawnCodeStatus('LAWN-123456'), 'complete');
});

test('setup code: the link gets the full code only when all 6 digits are there', () => {
  assert.equal(lawnSetupCode('123456'), 'LAWN-123456');
  assert.equal(lawnSetupCode('LAWN-654321'), 'LAWN-654321');
  assert.equal(lawnSetupCode('12345'), '');
  assert.equal(lawnSetupCode(''), '');
});

test('the setup code is never stored, sent or logged by this site', () => {
  for (const f of ['app/lawn/page.js', 'app/lawn/LawnSetupCodeForm.js', 'app/lawn/LawnSignupLink.js', 'app/lawn/setupCodeStore.js', 'lib/lawnSetupCode.mjs']) {
    const src = read(f);
    assert.ok(!/localStorage|sessionStorage|document\.cookie|fetch\(|sendBeacon|console\./.test(src), f);
  }
});

test('no analytics, ad tag or conversion tracking on /lawn', () => {
  for (const f of ['app/lawn/page.js', 'app/lawn/layout.js', 'app/lawn/LawnSetupCodeForm.js', 'app/lawn/LawnSignupLink.js']) {
    assert.ok(!/gtag|googletagmanager|dataLayer|analytics|fbq|next\/script/i.test(read(f)), f);
  }
});

// ── rendered page ─────────────────────────────────────────────────────────
const { default: LawnPage, metadata } = await import('../app/lawn/page.js');
const html = renderToStaticMarkup(createElement(LawnPage));
const text = html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ');
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));

test('renders the exact headline as the one h1, with the hero copy', () => {
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(h1s.length, 1, 'exactly one h1');
  assert.equal(h1s[0][1].replace(/<[^>]+>/g, '').trim(), 'Trim the paperwork. Grow the business.');
  assert.ok(text.includes('Built for lawn care companies'));
  assert.ok(text.includes('Stop chasing paperwork. Schedule jobs, send invoices and track payments in one place.'));
  assert.ok(text.includes('FREE setup, from $39/mo'));
  assert.ok(text.includes('14-day free trial. No credit card needed.'));
});

test('renders both plan prices from planData and the six checklist items', () => {
  assert.ok(text.includes('One user. Ideal for owner-operators.'));
  assert.ok(text.includes('$39/mo'));
  assert.ok(text.includes('Unlimited users. Built for growing crews.'));
  assert.ok(text.includes('$129/mo'));
  const items = [...html.matchAll(/<ul class="lawn-checklist">([\s\S]*?)<\/ul>/g)][0][1];
  const labels = [...items.matchAll(/<span>([^<]+)<\/span>/g)].map((m) => m[1]);
  assert.deepEqual(labels, ['Schedule jobs', 'Build routes', 'Send invoices', 'Track payments', 'Manage your crew', 'Customer history']);
  assert.ok(hrefs.includes('/pricing'), 'Larger plans available links to /pricing');
});

test('sign-up links: Solo and Core cards and every Start free trial go to the app sign-up', () => {
  assert.ok(hrefs.includes('https://app.zerbiq.com/signup?plan=solo'));
  assert.ok(hrefs.includes('https://app.zerbiq.com/signup?plan=core'));
  const signups = hrefs.filter((h) => h.startsWith(SIGNUP_HREF));
  assert.ok(signups.length >= 4, 'header, code block, two cards');
  assert.ok(signups.every((h) => !h.includes('setup=')), 'no code before the visitor types one');
  assert.ok(text.includes('Sign Up for Solo') && text.includes('Sign Up for Core'), 'card buttons say which plan');
});

test('setup code field: labelled, numeric keypad, LAWN- shown, no claim that a code is valid', () => {
  assert.match(html, /<label for="lawn-setup-code"[^>]*>Have a setup code\?<\/label>/);
  assert.match(html, /<input[^>]*id="lawn-setup-code"[^>]*inputMode="numeric"/);
  assert.ok(text.includes('LAWN-'));
  // Visible wording, including the format message shown for a short code (read from the component).
  const form = read('app/lawn/LawnSetupCodeForm.js');
  const messages = [...form.matchAll(/`([^`]*digits[^`]*)`/g)].map((m) => m[1]);
  assert.equal(messages.length, 2, 'hint and format message');
  for (const words of [text, ...messages]) assert.ok(!/\bvalid|verified|approved|accepted/i.test(words), words.slice(0, 80));
});

test('free setup band, how to start, contact and footer', () => {
  assert.ok(text.includes('FREE setup for lawn care companies'));
  assert.ok(text.includes('14-day free trial. No credit card required.'));
  assert.ok(text.includes('How to start'));
  assert.ok(text.includes('Sign up and enter your setup code.'));
  assert.ok(text.includes('Subscribe. We set up your account free.'));
  assert.ok(text.includes('Questions? Call Eddie Skehan, Founder'));
  assert.ok(text.includes(FOUNDER_PHONE) && hrefs.includes(FOUNDER_PHONE_HREF));
  assert.ok(hrefs.includes(`mailto:${SUPPORT_EMAIL}`));
  for (const h of ['/pricing', '/features', '/legal/tos', '/legal/privacy', '/support']) assert.ok(hrefs.includes(h), `footer links ${h}`);
});

test('slim header: logo, phone, Start free trial, and no tab nav; landmarks present', () => {
  const header = html.match(/<header class="lawn-header[^"]*">([\s\S]*?)<\/header>/)[1];
  assert.ok(header.includes('href="/"'), 'logo links home');
  assert.ok(header.includes(FOUNDER_PHONE_HREF));
  assert.ok(header.includes('Start free trial'));
  assert.ok(!header.includes('<nav'), 'no tab nav');
  assert.ok(!/href="\/(features|compare|blog|about)"/.test(header));
  assert.equal((html.match(/<main>/g) || []).length, 1);
  assert.ok(html.includes('<footer'));
});

test('metadata: title, description, canonical /lawn and share image; indexable and in the sitemap', () => {
  assert.equal(metadata.title, 'Zerbiq for Lawn Care Companies | Schedule, Invoice, Get Paid');
  assert.ok(metadata.description.length > 50);
  assert.equal(metadata.alternates.canonical, '/lawn');
  assert.equal(metadata.openGraph.url, '/lawn');
  assert.deepEqual(metadata.openGraph.images, [{ url: '/og-image.png' }]);
  assert.equal(metadata.robots, undefined, 'not noindex');
  assert.ok(STATIC_ROUTES.includes('/lawn'));
  assert.ok(sitemapEntries([]).some((e) => e.url === 'https://zerbiq.com/lawn'));
});

test('/lawn styles stay on /lawn: every selector is scoped to lawn- classes', () => {
  const css = read('app/lawn/lawn.css').replace(/\/\*[\s\S]*?\*\//g, '');
  const selectors = css
    .replace(/@media[^{]+\{/g, '')
    .split('{')
    .slice(0, -1)
    .map((chunk) => chunk.split('}').pop().trim())
    .filter(Boolean);
  for (const sel of selectors) {
    for (const part of sel.split(',')) assert.match(part.trim(), /^\.lawn-/, `unscoped selector: ${part.trim()}`);
  }
  assert.ok(!/fonts\.googleapis|fonts\.gstatic/.test(read('app/lawn/layout.js') + css), 'fonts are self-hosted');
});
