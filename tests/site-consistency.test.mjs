import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, writeFileSync, mkdtempSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');

// Load the real lib/planData.js (an ES module in a non-module package) as .mjs.
const dir = mkdtempSync(join(tmpdir(), 'consistency-'));
writeFileSync(join(dir, 'planData.mjs'), read('lib/planData.js'));
for (const f of ['earlyAccess.mjs', 'siteConfig.mjs', 'seo.mjs']) {
  copyFileSync(new URL(`../lib/${f}`, import.meta.url), join(dir, f));
}
const pd = await import(pathToFileURL(join(dir, 'planData.mjs')).href);
const seo = await import(pathToFileURL(join(dir, 'seo.mjs')).href);

// Every source file that can put words on a public page.
function sourceFiles(root) {
  const out = [];
  for (const name of readdirSync(new URL(`../${root}`, import.meta.url))) {
    const rel = `${root}/${name}`;
    const full = new URL(`../${rel}`, import.meta.url);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(rel));
    else if (/\.(js|mjs)$/.test(name)) out.push(rel);
  }
  return out;
}
const SITE = ['app', 'components', 'lib'].flatMap(sourceFiles);
const siteText = SITE.map((f) => [f, read(f)]);

test('plan facts: prices, limits and annual = 10 months', () => {
  const byName = Object.fromEntries(pd.PLAN_METADATA.map((p) => [p.name, p]));
  assert.deepEqual(
    ['Solo', 'Core', 'Field', 'Command'].map((n) => [byName[n].monthlyPrice, byName[n].annualPrice, byName[n].activeCustomers]),
    [[39.99, 399.9, '200'], [119, 1190, '500'], [169, 1690, '1,000'], [209, 2090, '2,500']],
  );
  assert.equal(byName.Enterprise.monthlyPrice, null);
  assert.equal(byName.Solo.users, 1);
  assert.deepEqual(pd.MULTI_LOCATION_FEE, { Field: 69, Command: 89 });
});

test('ZerbIQ and QuickBooks sync are on every plan', () => {
  assert.equal(pd.FEATURE_GATE.aiChatbot, 'all');
  assert.deepEqual(pd.gateToValues(pd.FEATURE_GATE.aiChatbot), [true, true, true, true, true]);
  assert.equal(pd.FEATURE_GATE.quickbooksSync, 'all');
  assert.deepEqual(pd.gateToValues(pd.FEATURE_GATE.quickbooksSync), [true, true, true, true, true]);
  for (const f of ['lib/homeFeatures.js', 'app/features/page.js', 'app/compare/page.js', 'app/pricing/page.js']) {
    assert.ok(!/coming soon/i.test(read(f).split('\n').filter((l) => /quickbooks/i.test(l)).join('\n')), `${f} does not call QuickBooks coming soon`);
  }
});

test('active customer definition includes recurring customers and has no separate limit', () => {
  assert.ok(pd.ACTIVE_CUSTOMER_DEFINITION.includes('including recurring customers'));
  assert.ok(pd.ACTIVE_CUSTOMER_DEFINITION.includes('no separate recurring-customer limit'));
  for (const f of ['app/compare/page.js', 'app/pricing/page.js', 'components/PricingCards.js']) {
    assert.ok(read(f).includes('ACTIVE_CUSTOMER_DEFINITION'), `${f} uses the shared definition`);
  }
});

test('/compare has no recurring-customer row and no included-texts row', () => {
  const compare = read('app/compare/page.js');
  assert.ok(!/label: 'Recurring customers/i.test(compare));
  assert.ok(!/SMS/.test(compare.replace(/FEATURE_GATE\.\w*Sms/g, '')), 'no SMS wording on /compare');
  assert.ok(!/Start Free Trial/i.test(compare));
  assert.ok(compare.includes('TEXTING_PRICING_HREF') && compare.includes('/pricing#texting-addon'));
});

test('no page says native apps are available, links an app store, or promises PWA install', () => {
  for (const [f, text] of siteText) {
    if (f === 'lib/siteConfig.mjs') continue; // hidden "Get the app" links, empty until the apps ship
    assert.ok(!/free download for iPhone/i.test(text), `${f}: app download claim`);
    assert.ok(!/available as a native app/i.test(text), `${f}: native app claim`);
    assert.ok(!/without going through an app store|no app store/i.test(text), `${f}: app-store wording`);
    assert.ok(!/add (it )?to (your phone's )?home screen/i.test(text), `${f}: PWA wording`);
  }
  assert.ok(pd.MOBILE_TEAM_VIEW_NOTE.includes('any smartphone browser today'));
  assert.ok(pd.MOBILE_TEAM_VIEW_NOTE.includes('native iOS and Android apps are coming with the public release'));
});

test('unsupported claims are gone from every page and component', () => {
  for (const [f, text] of siteText) {
    assert.ok(!/30[–-]45 minutes/.test(text), `${f}: Route Intelligence savings claim`);
    assert.ok(!/guaranteed live/i.test(text), `${f}: White-Glove guarantee`);
    assert.ok(!/before the call ends/i.test(text), `${f}: White-Glove time promise`);
  }
  assert.ok(!/minutes per day|guarantee/i.test(pd.ROUTE_INTELLIGENCE_DESCRIPTION + pd.WHITE_GLOVE_DESCRIPTION));
  assert.ok(pd.ROUTE_INTELLIGENCE_DESCRIPTION.includes('minimize drive time and fuel'));
  assert.ok(pd.ROUTE_INTELLIGENCE_DESCRIPTION.includes('nearest available tech'));
  assert.ok(pd.WHITE_GLOVE_DESCRIPTION.includes('import your customer list, build your routes, add your team, and configure everything'));
});

test('home cards show the same plan badge as the shared gates', () => {
  const home = read('lib/homeFeatures.js').replace(/from '\.\/planData'/, "from './planData.mjs'");
  writeFileSync(join(dir, 'homeFeatures.mjs'), home);
  return import(pathToFileURL(join(dir, 'homeFeatures.mjs')).href).then(({ ALL_FEATURES }) => {
    const badgeOf = (title) => ALL_FEATURES.find((c) => c.title.startsWith(title))?.badge;
    const expected = {
      'Purchase Orders': 'purchaseOrders',
      'Partial Payments': 'partialPayments',
      'Estimates & Quotes': 'estimatesQuotes',
      'QuickBooks Sync': 'quickbooksSync',
      'Customer Portal': 'customerPortal',
      'Route Intelligence': 'routeIntelligence',
      'Automated Follow-Up': 'followUpSequences',
      'Mobile Team View': 'mobileApp',
      'GPS Field Tracking': 'gpsFieldTracking',
      'Subcontractor Management': 'subcontractors',
      'Lead Management': 'leadManagement',
      'Multiple Service Locations': 'multipleLocations',
      'Zerbiq AI assistant': 'aiChatbot',
    };
    for (const [title, gate] of Object.entries(expected)) {
      assert.equal(badgeOf(title), pd.gateToBadge(pd.FEATURE_GATE[gate]), `${title} badge matches ${gate}`);
    }
  });
});

test('every page exports its own metadata with a canonical path matching its route', () => {
  const pages = SITE.filter((f) => /^app\/(.*\/)?page\.js$/.test(f) && !f.startsWith('app/admin'));
  const seen = new Set();
  for (const f of pages) {
    const route = '/' + f.replace(/^app\//, '').replace(/\/?page\.js$/, '');
    if (route.includes('[')) continue; // blog posts: checked below
    const text = read(f);
    assert.ok(text.includes('pageMetadata('), `${f} uses pageMetadata`);
    assert.ok(text.includes(`path: '${route}'`), `${f} canonical path is ${route}`);
    seen.add(route);
  }
  for (const route of ['/', '/about', '/blog', '/compare', '/early-access', '/features', '/pricing', '/signup', '/support', '/texting', '/legal/privacy', '/legal/tos']) {
    assert.ok(seen.has(route), `${route} covered`);
  }
  assert.ok(read('app/blog/[slug]/page.js').includes('path: `/blog/'));
});

test('pageMetadata gives og title, og description and canonical, and can noindex', () => {
  const m = seo.pageMetadata({ title: 'T — Zerbiq', description: 'D', path: '/x' });
  assert.equal(m.alternates.canonical, '/x');
  assert.equal(m.openGraph.title, 'T — Zerbiq');
  assert.equal(m.openGraph.description, 'D');
  assert.equal(m.openGraph.url, '/x');
  assert.equal(m.robots, undefined);
  assert.deepEqual(seo.pageMetadata({ title: 'T', description: 'D', path: '/x', noindex: true }).robots, { index: false, follow: true });
});

test('/blog is noindex while it has no published posts', () => {
  const blog = read('app/blog/page.js');
  assert.ok(blog.includes('noindex: posts.length === 0'));
});

// ── Item 17: AI questions, storage, packs, white-glove, payments, FAQ ─────────
// The expected values below are copied from src/lib/plans.cjs in the zerbiq app
// repo (the source of truth). If plans.cjs changes, change lib/planData.js and these.

test('ZerbIQ questions per month match plans.cjs ASSISTANT_QUESTIONS', () => {
  // plans.cjs ASSISTANT_QUESTIONS: solo 300, core 500, field 1000, command/enterprise Infinity (fair use)
  assert.deepEqual(pd.ASSISTANT_QUESTIONS_PER_MONTH, { Solo: 300, Core: 500, Field: 1000, Command: null, Enterprise: null });
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.assistantQuestionsLabel), ['300', '500', '1,000', 'Unlimited', 'Unlimited']);
});

test('included storage matches plans.cjs storageIncludedGb', () => {
  // plans.cjs PLANS[*].storageIncludedGb: solo 10, core 25, field 50, command 200, enterprise Infinity
  assert.deepEqual(pd.STORAGE_INCLUDED_GB, { Solo: 10, Core: 25, Field: 50, Command: 200, Enterprise: null });
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.storageIncludedLabel), ['10 GB', '25 GB', '50 GB', '200 GB', 'Unlimited']);
});

test('storage packs and capacity assumptions match plans.cjs', () => {
  // plans.cjs STORAGE_PACKS: +25 GB $5, +100 GB $15, +500 GB $50 per month
  assert.deepEqual(pd.STORAGE_PACKS.map((p) => [p.label, p.gb, p.monthlyPrice]), [['+25 GB', 25, 5], ['+100 GB', 100, 15], ['+500 GB', 500, 50]]);
  // plans.cjs STORAGE_AVERAGES: { photoMb: 0.3, videoMb: 4.6, videoSeconds: 30 }
  assert.deepEqual(pd.STORAGE_AVERAGES, { photoMb: 0.3, videoMb: 4.6, videoSeconds: 30 });
  // plans.cjs storageCapacity(): rounded down to two significant figures
  const expected = {
    10: [34000, 2200], 25: [85000, 5500], 50: [170000, 11000], 200: [680000, 44000],
    100: [340000, 22000], 500: [1700000, 110000],
  };
  for (const [gb, [photos, videos]] of Object.entries(expected)) {
    assert.deepEqual(pd.storageCapacity(Number(gb)), { photos, videos }, `${gb} GB capacity`);
  }
  assert.equal(pd.storageCapacityLabel(25), 'About 85,000 photos or about 5,500 videos');
  assert.ok(/Approximate/.test(pd.STORAGE_ASSUMPTION_NOTE) && pd.STORAGE_ASSUMPTION_NOTE.includes('0.3 MB per photo') && pd.STORAGE_ASSUMPTION_NOTE.includes('4.6 MB'));
});

test('white-glove prices include Solo $149 and match plans.cjs whiteGloveFee', () => {
  // plans.cjs PLANS[*].whiteGloveFee: solo 149, core 299, field 499, command 699 (enterprise: arranged)
  assert.deepEqual(pd.WHITE_GLOVE_FEE, { Solo: 149, Core: 299, Field: 499, Command: 699 });
  assert.equal(pd.WHITE_GLOVE_PRICES_SENTENCE, '$149 for Solo, $299 for Core, $499 for Field, $699 for Command');
  for (const [f, text] of siteText.filter(([f]) => f !== 'lib/planData.js')) {
    assert.ok(!/\$299 for Core, \$499/.test(text), `${f}: white-glove prices typed by hand without Solo`);
    assert.ok(!/\$299 Core \/ \$499/.test(text), `${f}: white-glove prices typed by hand without Solo`);
  }
});

test('QuickBooks sync is on every plan, as plans.cjs says', () => {
  assert.equal(pd.FEATURE_GATE.quickbooksSync, 'all');
  assert.ok(!/coming soon for Command/i.test(read('app/pricing/page.js')));
  // /features card must not gate QuickBooks to Command and up
  const feat = read('app/features/page.js');
  const card = feat.slice(feat.indexOf('QuickBooks Sync'));
  assert.ok(card.slice(0, card.indexOf('badge:') + 20).includes('BADGE.all'), '/features QuickBooks badge is BADGE.all');
});

test('payments-stay-yours callout is on /pricing and /compare and states the real behavior', () => {
  for (const f of ['app/pricing/page.js', 'app/compare/page.js']) {
    assert.ok(read(f).includes('<PaymentsStayYours'), `${f} shows the callout`);
  }
  assert.equal(pd.PAYMENTS_STAY_YOURS_TITLE, 'Your payments stay yours');
  assert.ok(pd.PAYMENTS_STAY_YOURS_TEXT.includes('no transaction fee'));
  assert.ok(pd.PAYMENTS_STAY_YOURS_TEXT.includes('never holds your money'));
  // Supported processors match the app (api/payments/connections.js: Stripe, Square and Authorize.net are live;
  // PayPal still answers "coming soon"), so the site never claims PayPal or Venmo.
  for (const name of ['Stripe', 'Square', 'Authorize.net']) assert.ok(pd.PAYMENT_PROCESSORS_NOTE.includes(name), name);
  for (const f of ['lib/planData.js', 'app/pricing/page.js', 'app/compare/page.js', 'app/features/page.js', 'components/PricingCards.js']) {
    assert.ok(!/paypal|venmo/i.test(read(f)), `${f} does not claim PayPal / Venmo`);
  }
  assert.ok(!/coming/i.test(pd.PAYMENT_PROCESSORS_NOTE + pd.PAYMENTS_STAY_YOURS_TEXT));
});

test('pricing page has the storage box and no name FAQ; compare has the new rows', () => {
  const pricing = read('app/pricing/page.js');
  assert.ok(pricing.includes('<StorageAddon'));
  assert.ok(!pricing.includes('Why is the app called Zerbiq') && pd.NAME_FAQ_ANSWER === undefined, 'no name FAQ (owner: not needed)');
  const compare = read('app/compare/page.js');
  for (const label of ['ZerbIQ questions per month', 'Photo & video storage included', 'White-Glove Onboarding (one time)']) {
    assert.ok(compare.includes(label), `compare row: ${label}`);
  }
  const cards = read('components/PricingCards.js');
  for (const fn of ['assistantQuestionsLabel(plan.name)', 'storageIncludedLabel(plan.name)', 'WHITE_GLOVE_FEE[plan.name]']) {
    assert.ok(cards.includes(fn), `plan cards use ${fn}`);
  }
});

test('with no store links, the footer says coming soon instead of showing store badges', () => {
  const footer = read('components/Footer.js');
  assert.ok(footer.includes('STORE_COMING_SOON_LABEL'));
  assert.equal(pd.STORE_COMING_SOON_LABEL, 'iOS and Android apps: coming soon');
  assert.ok(!/apps\.apple\.com|play\.google\.com/.test(SITE.map((f) => read(f)).join('\n').replace(/e\.g\. 'https:[^']*'/g, '')));
});
