import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// lib/planData.js is an ES module in a package without "type": "module".
// Copy it (and its two imports) to a temp dir as .mjs so Node loads the REAL code.
const dir = mkdtempSync(join(tmpdir(), 'plandata-'));
const src = readFileSync(new URL('../lib/planData.js', import.meta.url), 'utf8');
writeFileSync(join(dir, 'planData.mjs'), src);
for (const f of ['earlyAccess.mjs', 'siteConfig.mjs']) {
  copyFileSync(new URL(`../lib/${f}`, import.meta.url), join(dir, f));
}
const pd = await import(pathToFileURL(join(dir, 'planData.mjs')).href);

test('texting is an add-on on every plan, never a plain included check', () => {
  for (const key of ['onTheWaySms', 'jobCompletionSms']) {
    assert.equal(pd.FEATURE_GATE[key], 'addon');
    assert.deepEqual(pd.gateToValues(pd.FEATURE_GATE[key]), ['Add-on', 'Add-on', 'Add-on', 'Add-on', 'Add-on']);
  }
});

test('plan gates still return booleans in plan order', () => {
  assert.deepEqual(pd.gateToValues('all'), [true, true, true, true, true]);
  assert.deepEqual(pd.gateToValues('core'), [false, true, true, true, true]);
  assert.deepEqual(pd.gateToValues('ent'), [false, false, false, false, true]);
});

test('add-on badge does not say included', () => {
  assert.equal(pd.gateToBadge('addon'), 'Optional add-on on every plan');
  assert.ok(!/included/i.test(pd.BADGE.addon));
});

test('texting add-on prices', () => {
  assert.equal(pd.TEXTING_ADDON.setupFee, 49);
  assert.deepEqual(pd.TEXTING_ADDON.blocks, [
    { texts: 500, price: 10 },
    { texts: 1000, price: 18 },
    { texts: 2500, price: 40 },
  ]);
  assert.deepEqual(pd.textBlockLabels(), ['500 for $10', '1,000 for $18', '2,500 for $40']);
  assert.equal(pd.textBlockFromLabel(), 'From\u00a0$10 for 500\u00a0texts');
});

test('texting FAQ states every required fact', () => {
  const a = pd.TEXTING_FAQ_ANSWER;
  for (const part of [
    'optional add-on on every plan', 'No texts are included', '$49 one time', 'toll-free number',
    'a few days', 'couple of weeks', 'by email', '500 for $10', '1,000 for $18', '2,500 for $40',
    'never expire', '2 or more texts', 'texting pauses', 'cannot be recovered', 'carrier approval again',
    'stay on your account', 'invoices and review requests by email',
  ]) {
    assert.ok(a.includes(part), `FAQ mentions: ${part}`);
  }
});

test('compare label keeps "500 texts" and "From $10" together', () => {
  const label = pd.textBlockFromLabel();
  assert.ok(label.includes('500\u00a0texts'), 'no break between 500 and texts');
  assert.ok(label.includes('From\u00a0$10'), 'no break between From and $10');
  assert.ok(!/ texts$/.test(label), 'texts is never preceded by a plain space');
});

test('one shared add-on wording: summary, want-it-as-text line, plan-card line', () => {
  assert.equal(pd.TEXTING_WHY, 'No texts are included in any plan, because carriers charge for every text.');
  assert.ok(pd.TEXTING_ADDON_SUMMARY.includes(pd.TEXTING_WHY));
  assert.ok(pd.TEXTING_ADDON_SUMMARY.startsWith('Texting is an optional add-on on every plan: $49 one-time setup'));
  assert.equal(pd.TEXTING_WANT_IT_AS_TEXT, `Want it as a text? ${pd.TEXTING_ADDON_SUMMARY}`);
  assert.equal(pd.TEXTING_PLAN_CARD_LINE, 'Texting add-on available');
  assert.equal(pd.TEXTING_PRICING_HREF, '/pricing#texting-addon');
});

test('dedicated Texting card has the add-on badge, two plain lines and a pricing link', () => {
  const c = pd.TEXTING_CARD;
  assert.equal(c.title, 'Texting');
  assert.equal(c.badge, 'Optional add-on');
  assert.equal(c.desc.length, 2);
  assert.ok(c.desc[1].includes(pd.TEXTING_WHY));
  assert.ok(c.desc[1].includes('$49') && c.desc[1].includes('$10 for 500 texts'));
  assert.equal(c.linkHref, '/pricing#texting-addon');
  assert.ok(c.linkLabel.startsWith('See texting prices'));
});

test('home pricing line states setup and the cheapest block', () => {
  assert.equal(
    pd.textingPricingLine(),
    'Texting is an optional add-on: $49 setup, then prepaid blocks from $10 for 500 texts.',
  );
});

test('email-by-default badge never claims texting is included', () => {
  assert.equal(pd.BADGE.allEmail, 'Included (by email) · texting is an add-on');
  assert.ok(pd.BADGE.allEmail.includes('texting is an add-on'));
  assert.ok(pd.BADGE.all.startsWith('Included'));
});

// ── Home page cards: every card renders exactly once ─────────────────────────
const homeSrc = readFileSync(new URL('../lib/homeFeatures.js', import.meta.url), 'utf8')
  .replace("from './planData'", "from './planData.mjs'");
writeFileSync(join(dir, 'homeFeatures.mjs'), homeSrc);
const { ALL_FEATURES } = await import(pathToFileURL(join(dir, 'homeFeatures.mjs')).href);

test('every home card is in exactly one group (none dropped, none doubled)', () => {
  const groups = pd.groupByBadge(ALL_FEATURES);
  const grouped = groups.flatMap((g) => g.features);
  assert.equal(grouped.length, ALL_FEATURES.length);
  for (const card of ALL_FEATURES) {
    assert.equal(grouped.filter((c) => c === card).length, 1, `rendered once: ${card.title}`);
  }
  const titles = ALL_FEATURES.map((c) => c.title);
  assert.equal(new Set(titles).size, titles.length, 'card titles are unique');
});

test('the Core-badge "Unlimited users" card gets a group', () => {
  const groups = pd.groupByBadge(ALL_FEATURES);
  const core = groups.find((g) => g.key === 'core');
  assert.ok(core, 'Core group exists');
  assert.ok(core.features.some((c) => c.title.startsWith('Unlimited users')));
});

test('groups follow plan order and an unknown badge still gets its own group', () => {
  const keys = pd.groupByBadge(ALL_FEATURES).map((g) => g.key);
  const order = ['all', 'addon', 'core', 'field', 'cmd', 'ent'];
  assert.deepEqual(keys, order.filter((k) => keys.includes(k)));
  const odd = [{ title: 'X', badge: 'Brand new badge' }, ...ALL_FEATURES];
  const groups = pd.groupByBadge(odd);
  assert.equal(groups.flatMap((g) => g.features).length, odd.length);
  assert.equal(groups[groups.length - 1].label, 'Brand new badge');
});
