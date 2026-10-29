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

test('QuickBooks sync is on every plan (matches the app plans matrix)', () => {
  assert.equal(pd.FEATURE_GATE.quickbooksSync, 'all');
  assert.deepEqual(pd.gateToValues(pd.FEATURE_GATE.quickbooksSync), [true, true, true, true, true]);
});

test('QuickBooks is listed under Solo, and not as a Command-only extra, on the pricing cards and compare page', () => {
  const cards = readFileSync(new URL('../components/PricingCards.js', import.meta.url), 'utf8');
  const compare = readFileSync(new URL('../app/compare/page.js', import.meta.url), 'utf8');
  const block = (text, from, to) => text.slice(text.indexOf(from), text.indexOf(to));
  assert.match(block(cards, 'Solo: [', 'Core: ['), /QuickBooks Online sync/);
  assert.doesNotMatch(block(cards, 'Command: [', 'Enterprise: ['), /QuickBooks/);
  assert.match(block(compare, "name: 'Solo'", "name: 'Core'"), /QuickBooks Online sync/);
  assert.doesNotMatch(block(compare, "name: 'Command'", "name: 'Enterprise'"), /QuickBooks/);
});

test('add-on badge does not say included', () => {
  assert.equal(pd.gateToBadge('addon'), 'An optional add-on for every plan');
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
    'optional add-on for every plan', 'No texts are included', '$49 one time', 'toll-free number',
    'a few business days', 'couple of weeks', 'by email', '500 for $10', '1,000 for $18', '2,500 for $40',
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
  assert.ok(pd.TEXTING_ADDON_SUMMARY.startsWith('Texting is an optional add-on for every plan: $49 one-time setup'));
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

// ── Page headings: /features has its own H1 and title ────────────────────────
test('/features has its own H1 and page title, not the home page headline', () => {
  const features = readFileSync(new URL('../app/features/page.js', import.meta.url), 'utf8');
  const h1 = features.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].trim();
  assert.equal(h1, 'Every feature your field service business needs');
  assert.ok(!features.includes('Built for the field'));
  assert.ok(features.includes("title: 'Every feature your field service business needs — Zerbiq'"));
});

// ── Texting explainer (/texting) ─────────────────────────────────────────────
test('texting explainer keeps the approved line and the app prices', () => {
  const all = [
    ...pd.TEXTING_EXPLAINER.intro,
    ...pd.TEXTING_EXPLAINER.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets || []), ...(s.after || [])]),
  ].join(' ');
  assert.ok(all.includes('Carriers charge for every text and every number'));
  assert.ok(all.includes('$49 setup fee applies again'));
  assert.equal(pd.textingPriceSummary(), '$49 one-time setup, then prepaid text blocks: 500 for $10, 1,000 for $18, 2,500 for $40. Block texts never expire.');
  assert.equal(pd.TEXTING_EXPLAINER_HREF, '/texting');
});

test('short texting FAQ entries link to a real explainer section', () => {
  const ids = pd.TEXTING_EXPLAINER.sections.map((s) => s.id);
  assert.deepEqual(pd.TEXTING_FAQ_SHORT.map((f) => f.q), ['Why toll-free?', 'Can texting prices change?', 'What do I need to get verified?']);
  for (const f of pd.TEXTING_FAQ_SHORT) {
    const [path, id] = f.href.split('#');
    assert.equal(path, '/texting');
    assert.ok(ids.includes(id), `section exists: ${id}`);
  }
});

test('texting explainer uses US spelling', () => {
  const text = JSON.stringify([pd.TEXTING_EXPLAINER, pd.TEXTING_FAQ_SHORT]);
  for (const bad of ['honour', 'recognise', 'organis', 'authoris', 'favour', 'licence']) {
    assert.ok(!text.toLowerCase().includes(bad), bad);
  }
});

test('texting wording is identical in the pricing box source, FAQ and /texting', () => {
  const faq = pd.TEXTING_FAQ_ANSWER;
  const page = JSON.stringify(pd.TEXTING_EXPLAINER);
  const short = JSON.stringify(pd.TEXTING_FAQ_SHORT);
  const box = readFileSync(new URL('../components/TextingAddon.js', import.meta.url), 'utf8');
  assert.ok(faq.includes('toll-free number (it starts with 8xx)'));
  assert.ok(page.includes(pd.TEXTING_REVIEW_TIME) && faq.includes(pd.TEXTING_REVIEW_TIME) && short.includes(pd.TEXTING_REVIEW_TIME));
  assert.ok(box.includes('TEXTING_REVIEW_TIME') && box.includes('TEXTING_NUMBER_PHRASE') && box.includes('TEXTING_OFF_ON_TITLE'));
  assert.equal(pd.TEXTING_OFF_ON_TITLE, 'Turning texting off and back on');
  assert.ok(pd.TEXTING_EXPLAINER.sections.some((s) => s.heading === pd.TEXTING_OFF_ON_TITLE));
  assert.ok(page.includes(pd.TEXTING_EIN_NOTE) && short.includes(pd.TEXTING_EIN_NOTE));
  assert.ok(!/few days/.test(faq) && !/several business days/.test(page));
});
