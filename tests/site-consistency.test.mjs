import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, writeFileSync, mkdtempSync, copyFileSync, existsSync } from 'node:fs';
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
const SITE_CONFIG = await import(pathToFileURL(join(dir, 'siteConfig.mjs')).href);
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

// The text of one plan's feature list inside PLAN_INCLUDED (PricingCards) or PLAN_CARDS (compare).
const PLAN_ORDER = ['Solo', 'Core', 'Field', 'Command', 'Enterprise'];
function planBlock(body, name) {
  let from = body.indexOf(`\n  ${name}: [`);
  if (from < 0) from = body.indexOf('features: [', body.indexOf(`name: '${name}',`));
  assert.ok(from >= 0, `plan block ${name}`);
  const open = body.indexOf('[', from);
  let depth = 0;
  for (let i = open; i < body.length; i++) {
    if (body[i] === '[') depth++;
    if (body[i] === ']' && --depth === 0) return body.slice(open + 1, i);
  }
  throw new Error(`unterminated block ${name}`);
}
const siteText = SITE.map((f) => [f, read(f)]);

// Text files outside app/components/lib that can reach readers: README.md and anything text in public/.
function publicTextFiles(root) {
  const out = [];
  for (const name of readdirSync(new URL(`../${root}`, import.meta.url))) {
    const rel = `${root}/${name}`;
    if (statSync(new URL(`../${rel}`, import.meta.url)).isDirectory()) out.push(...publicTextFiles(rel));
    else if (/\.(txt|xml|json|md|html|csv|webmanifest)$/i.test(name)) out.push(rel);
  }
  return out;
}
const OTHER_TEXT = ['README.md', ...publicTextFiles('public')].map((f) => [f, read(f)]);

const RULE = 'If your company completes more than 150% of your plan’s weekly visits in each of 4 weeks in a row, we move your plan up to the next plan. We email the owner first, and the new plan starts 30 days after that notice. Your work is never blocked and there is no per-visit overage fee.';

const DOWN = 'If your company stays below the previous plan’s weekly visits for 12 weeks in a row, we move your plan back down.';

test('plan facts: prices, weekly visits and annual = 10 months (plans.cjs launch pricing)', () => {
  // plans.cjs PLANS[*]: monthlyFee 39 / 129 / 209 / 349, annualFee 390 / 1290 / 2090 / 3490,
  // weeklyVisits 125 / 350 / 1000 / 2000; Enterprise from $599 a month, quoted.
  const byName = Object.fromEntries(pd.PLAN_METADATA.map((p) => [p.name, p]));
  assert.deepEqual(
    ['Solo', 'Core', 'Field', 'Command'].map((n) => [byName[n].monthlyPrice, byName[n].annualPrice, byName[n].weeklyVisits]),
    [[39, 390, 125], [129, 1290, 350], [209, 2090, 1000], [349, 3490, 2000]],
  );
  for (const n of ['Solo', 'Core', 'Field', 'Command']) assert.equal(byName[n].annualPrice, byName[n].monthlyPrice * 10, `${n} annual is 10 x monthly`);
  assert.equal(pd.ANNUAL_SAVINGS_LABEL, '2 months free');
  assert.equal(byName.Enterprise.monthlyPrice, null);
  assert.equal(byName.Enterprise.weeklyVisits, null);
  assert.equal(pd.ENTERPRISE_FROM_MONTHLY_PRICE, 599);
  assert.equal(pd.enterprisePriceLabel(), 'From $599/mo · quoted');
  assert.equal(byName.Solo.users, 1);
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command'].map((n) => pd.formatPlanPrice(byName[n].monthlyPrice)), ['39', '129', '209', '349']);
});

test('weekly completed-visits allowance replaces every customer limit', () => {
  assert.deepEqual(pd.WEEKLY_VISITS, { Solo: 125, Core: 350, Field: 1000, Command: 2000, Enterprise: null });
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.weeklyVisitsLabel), [
    '125 completed visits a week',
    '350 completed visits a week',
    '1,000 completed visits a week',
    '2,000 completed visits a week',
    'More than 2,000 completed visits a week (quoted)',
  ]);
  assert.deepEqual(pd.PLAN_METADATA.map((p) => p.subtitle), ['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.weeklyVisitsLabel));
  // plans.cjs WEEKLY_VISITS_EXPLAINER, word for word
  assert.equal(pd.WEEKLY_VISITS_EXPLAINER, 'Every completed visit counts; skipped and canceled visits don’t. ' + RULE);
  const o = pd.WEEKLY_VISITS_OVERAGE_ANSWER;
  assert.equal(pd.PLAN_ALLOWANCE_RULE, RULE);
  assert.equal(pd.PLAN_MOVE_DOWN_RULE, DOWN);
  assert.ok(!pd.PLAN_ALLOWANCE_RULE.includes('12 weeks'), 'move-down is a separate sentence');
  assert.equal(o, `${RULE} ${pd.PLAN_NEXT_PLAN_NOTE} ${DOWN}`, 'the overage FAQ answer is the move-up rule plus the move-down rule');
  assert.ok(pd.WEEKLY_VISITS_EXPLAINER.includes(RULE));
  assert.ok(!/average|sustained|8 more weeks/i.test(o + pd.WEEKLY_VISITS_EXPLAINER), 'old average wording is gone');
  assert.deepEqual(pd.WEEKLY_VISITS_FAQ.map((f) => f.q), [
    'Is there a limit on how many customers I can have?', 'What counts toward my weekly visits?', 'What happens if I go above my weekly visits?',
  ]);
  assert.ok(pd.NO_CUSTOMER_LIMIT_ANSWER.startsWith('No. There is no customer limit on any plan.'));
  assert.ok(read('app/pricing/page.js').includes('...WEEKLY_VISITS_FAQ'), '/pricing FAQ uses the shared weekly-visits FAQ');
  for (const f of ['app/compare/page.js', 'components/PricingCards.js']) {
    assert.ok(read(f).includes('WEEKLY_VISITS_EXPLAINER'), `${f} uses the shared explainer`);
  }
  // no leftover customer-limit exports
  for (const gone of ['ACTIVE_CUSTOMER_DEFINITION', 'CUSTOMER_IMPORT_ANSWER', 'CUSTOMER_LIMIT_REACHED_ANSWER', 'CUSTOMER_LIMIT_FAQ']) {
    assert.equal(pd[gone], undefined, `${gone} is gone`);
  }
  for (const p of pd.PLAN_METADATA) assert.equal(p.activeCustomers, undefined, `${p.name} has no customer count`);
});

test('no page or component still shows an old price, an old limit or customer-limit wording', () => {
  const OLD = [
    [/39\.99|399\.9\b/, 'old Solo price'],
    [/\$\s?119\b|\$\s?1,?190\b|\b1190\b/, 'old Core price'],
    [/\$\s?169\b|\$\s?1,?690\b|\b1690\b/, 'old Field price'],
    [/counted customers?/i, '"counted customers" limit'],
    [/activeCustomers|ACTIVE_CUSTOMER|(?<!NO_)CUSTOMER_LIMIT|totalCustomerLimit/, 'old customer-limit data'],
    [/\b(200|500|1,000|2,500)\+? (counted |active )?customers\b/i, 'old customer count'],
    [/Unlimited customers|2,500\+/i, 'old Enterprise customer wording'],
    [/\b(50|200) GB\b/, 'old included storage (50 GB / 200 GB)'],
    [/fair use|unlimited[^.\n]{0,40}(questions|AI assistant)|(questions|AI assistant)[^.\n]{0,40}unlimited/i, 'unlimited ZerbIQ wording'],
    [/ZerbIQ[^.\n]{0,40}unlimited/, 'unlimited ZerbIQ wording'],
    [/\bsixteen? months?\b|last 6 months|recurring route[^.\n]*counts toward/i, 'old counted-customer rule'],
  ];
  for (const [f, text] of [...siteText, ...OTHER_TEXT]) {
    if (f.startsWith('app/admin/')) continue;
    for (const [re, what] of OLD) {
      const hits = text.split('\n').filter((l) => re.test(l));
      assert.deepEqual(hits, [], `${f}: ${what}`);
    }
    // "customer limit" is only allowed as the plain "No customer limit" / "a limit on how many customers" answers
    const limitHits = text.split('\n').filter((l) => /customer limit/i.test(l) && !/no customer limit/i.test(l));
    assert.deepEqual(limitHits, [], `${f}: customer-limit wording`);
  }
});

test('Enterprise is priced "From $599/mo · quoted" on the cards and the compare page', () => {
  assert.ok(read('components/PricingCards.js').includes('enterprisePriceLabel()'));
  assert.ok(read('app/compare/page.js').includes('enterprisePriceLabel()'));
  assert.ok(!/>Custom</.test(read('components/PricingCards.js')), 'no "Custom" price on the cards');
  assert.ok(read('app/pricing/page.js').includes('ENTERPRISE_FROM_MONTHLY_PRICE'), 'pricing FAQ states the Enterprise starting price from the data');
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

test('the word "archive" is never used for customers anywhere on the site', () => {
  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(new URL(`../${dir}`, import.meta.url), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(rel);
      else if (/\.(js|mjs|jsx)$/.test(e.name)) files.push(rel);
    }
  };
  ['app', 'components', 'lib'].forEach(walk);
  // The two generated files below hold Eddie's final Terms and Privacy Policy verbatim. The Terms use
  // "archival copies" for backups, not for customers, and the wording must not be edited here.
  const VERBATIM_LEGAL = ['app/legal/tos/content.js', 'app/legal/privacy/content.js'];
  for (const f of files) {
    if (VERBATIM_LEGAL.includes(f)) continue;
    const hits = read(f).split('\n').filter((l) => /archiv/i.test(l));
    assert.deepEqual(hits, [], `${f} must not use "archive" (say "Inactive")`);
  }
  assert.ok(!/active customer/i.test(read('app/compare/page.js') + read('components/PricingCards.js') + read('app/pricing/page.js')), 'no "active customer" wording on cards, compare or pricing');
});

test('/compare has no recurring-customer row and no included-texts row', () => {
  const compare = read('app/compare/page.js');
  assert.ok(!/label: 'Recurring customers/i.test(compare));
  assert.ok(!/SMS/.test(compare.replace(/FEATURE_GATE\.\w*Sms/g, '')), 'no SMS wording on /compare');
  assert.ok(!/Start Free Trial/i.test(compare));
  assert.ok(compare.includes('TEXTING_PRICING_HREF') && compare.includes('/pricing#texting-addon'));
});

test('no page makes a false app claim or promises PWA install', () => {
  for (const [f, text] of siteText) {
    if (f === 'lib/siteConfig.mjs') continue; // the published store links live here
    assert.ok(!/free download for iPhone/i.test(text), `${f}: app download claim`);
    assert.ok(!/available as a native app/i.test(text), `${f}: native app claim`);
    assert.ok(!/without going through an app store|no app store/i.test(text), `${f}: app-store wording`);
    assert.ok(!/add (it )?to (your phone's )?home screen/i.test(text), `${f}: PWA wording`);
  }
  assert.ok(pd.MOBILE_TEAM_VIEW_NOTE.includes('any smartphone browser'));
  assert.ok(pd.MOBILE_TEAM_VIEW_NOTE.includes('native iOS and Android apps'));
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
      'Zerbiq AI assistant': 'aiChatbot',
      'Mileage Tracking': 'mileageTracking',
      'Equipment & Asset Tracking': 'equipmentTracking',
      'Daily Truck Inspection and Checklists': 'truckInspection',
      'Advanced Reports & Job Costing': 'advancedReports',
      'Commissions & Per-Job Team Pay': 'commissions',
      'Performance Reviews & Incident Tracking': 'performanceReviews',
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
  for (const route of ['/', '/about', '/blog', '/compare', '/early-access', '/features', '/pricing', '/signup', '/support', '/texting', '/legal/privacy', '/legal/tos', '/legal/dpa', '/legal/subprocessors']) {
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
  // plans.cjs ASSISTANT_QUESTIONS: solo 150, core 300, field 750, command 1500; Enterprise questions are quoted
  assert.deepEqual(pd.ASSISTANT_QUESTIONS_PER_MONTH, { Solo: 150, Core: 300, Field: 750, Command: 1500, Enterprise: null });
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.assistantQuestionsLabel), ['150', '300', '750', '1,500', 'Quoted']);
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.assistantQuestionsFeatureLabel), [
    'Zerbiq AI assistant, up to 150 questions a month',
    'Zerbiq AI assistant, up to 300 questions a month',
    'Zerbiq AI assistant, up to 750 questions a month',
    'Zerbiq AI assistant, up to 1,500 questions a month',
    'Zerbiq AI assistant, questions quoted',
  ]);
});

test('the ZerbIQ line is the LAST feature item on every plan card, and nowhere else in the list', () => {
  for (const [file, listStart] of [['components/PricingCards.js', 'const PLAN_INCLUDED = {'], ['app/compare/page.js', 'const PLAN_CARDS = [']]) {
    const src = read(file);
    const body = src.slice(src.indexOf(listStart));
    const plans = ['Solo', 'Core', 'Field', 'Command', 'Enterprise'];
    for (const name of plans) {
      const block = planBlock(body, name);
      const items = block.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('//'));
      const aiLines = items.filter((l) => /assistantQuestionsFeatureLabel|AI_ASSISTANT_NAME/.test(l));
      assert.deepEqual(aiLines, [`assistantQuestionsFeatureLabel('${name}'),`], `${file} ${name}: exactly one ZerbIQ line`);
      assert.equal(items[items.length - 1], `assistantQuestionsFeatureLabel('${name}'),`, `${file} ${name}: ZerbIQ is the last feature item`);
    }
  }
});

test('included storage matches plans.cjs storageIncludedGb', () => {
  // plans.cjs PLANS[*].storageIncludedGb: solo 10, core 25, field 75, command 250, enterprise Infinity
  assert.deepEqual(pd.STORAGE_INCLUDED_GB, { Solo: 10, Core: 25, Field: 75, Command: 250, Enterprise: null });
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.storageIncludedLabel), ['10 GB', '25 GB', '75 GB', '250 GB', 'Unlimited']);
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.planStorageLabel), [
    '10 GB photo & video storage', '25 GB photo & video storage', '75 GB photo & video storage', '250 GB photo & video storage', 'Unlimited photo & video storage',
  ]);
});

test('storage packs and capacity assumptions match plans.cjs', () => {
  // plans.cjs STORAGE_PACKS: +25 GB $5, +100 GB $15, +500 GB $50 per month
  assert.deepEqual(pd.STORAGE_PACKS.map((p) => [p.label, p.gb, p.monthlyPrice]), [['+25 GB', 25, 5], ['+100 GB', 100, 15], ['+500 GB', 500, 50]]);
  // plans.cjs STORAGE_AVERAGES: { photoMb: 0.3, videoMb: 4.6, videoSeconds: 30 }
  assert.deepEqual(pd.STORAGE_AVERAGES, { photoMb: 0.3, videoMb: 4.6, videoSeconds: 30 });
  // plans.cjs storageCapacity(): rounded down to two significant figures
  const expected = {
    10: [34000, 2200], 25: [85000, 5500], 75: [250000, 16000], 250: [850000, 55000],
    100: [340000, 22000], 500: [1700000, 110000],
  };
  for (const [gb, [photos, videos]] of Object.entries(expected)) {
    assert.deepEqual(pd.storageCapacity(Number(gb)), { photos, videos }, `${gb} GB capacity`);
  }
  assert.equal(pd.storageCapacityLabel(10), 'About 34,000 photos or 2,200 videos');
  assert.deepEqual(['Solo', 'Core', 'Field', 'Command', 'Enterprise'].map(pd.planCapacityShortLabel), [
    'About 34,000 photos or 2,200 videos (approximate)',
    'About 85,000 photos or 5,500 videos (approximate)',
    'About 250,000 photos or 16,000 videos (approximate)',
    'About 850,000 photos or 55,000 videos (approximate)',
    '',
  ]);
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
  for (const label of ['Completed visits a week', 'ZerbIQ questions per month', 'Photo & video storage included', 'About how many photos or videos', 'White-Glove Onboarding (one time)']) {
    assert.ok(compare.includes(label), `compare row: ${label}`);
  }
  const cards = read('components/PricingCards.js');
  for (const fn of ['weeklyVisitsLabel(plan.name)', 'planStorageLabel(plan.name)', 'planCapacityShortLabel(plan.name)', 'assistantQuestionsFeatureLabel(']) {
    assert.ok(cards.includes(fn), `plan cards use ${fn}`);
  }
  // order on a card: price, weekly visits, users, storage, approximate capacity
  const order = ['weeklyVisitsLabel(plan.name)', 'Unlimited users', 'planStorageLabel(plan.name)', 'planCapacityShortLabel(plan.name)'].map((t) => cards.indexOf(t));
  assert.ok(order.every((n, i) => n > 0 && (i === 0 || n > order[i - 1])), 'card order: visits, users, storage, capacity');
  assert.ok(cards.indexOf('formatPlanPrice(plan.monthlyPrice)') < order[0], 'price comes first');
});

test('both apps are published: store links are set and no page says the apps are coming soon', () => {
  const links = SITE_CONFIG.activeStoreLinks();
  assert.deepEqual(links, [
    { label: 'App Store', href: 'https://apps.apple.com/app/id6825717480' },
    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.zerbiq.app' },
  ]);
  assert.equal(pd.STORE_COMING_SOON_LABEL, undefined);
  for (const f of SITE) {
    const text = read(f);
    assert.ok(!/STORE_COMING_SOON/.test(text), `${f}: stale coming-soon label`);
    assert.ok(!/coming with the public release|apps? (is|are) (coming|not (yet )?available)/i.test(text), `${f}: stale app wording`);
    assert.ok(!/(iOS|Android|native|mobile) apps?[^\n]{0,40}coming soon|coming soon[^\n]{0,40}(iOS|Android)/i.test(text), `${f}: apps coming soon`);
  }
  const footer = read('components/Footer.js');
  assert.ok(footer.includes('activeStoreLinks()') && footer.includes('Get the app:'));
  assert.ok(read('app/support/page.js').includes('activeStoreLinks()'), 'support page shows the store links');
  assert.ok(!/Coming soon/.test(read('app/compare/page.js')), 'compare has no coming-soon cell');
});

test('white-glove is an optional add-on below the plan cards, not inside them', () => {
  const cards = read('components/PricingCards.js');
  assert.ok(!/white[- ]glove/i.test(cards), 'plan cards have no white-glove text');
  assert.ok(!cards.includes('WHITE_GLOVE'), 'plan cards do not use white-glove data');
  const pricing = read('app/pricing/page.js');
  assert.ok(pricing.includes('<WhiteGloveAddon'), 'pricing page renders the add-on section');
  const addon = read('components/WhiteGloveAddon.js');
  for (const t of ['WHITE_GLOVE_FEE', 'WHITE_GLOVE_DESCRIPTION', 'optional', 'one-time', 'DIY spreadsheet import is included free on every plan']) {
    assert.ok(addon.includes(t), `add-on mentions ${t}`);
  }
  assert.ok(!/guarantee|before the call ends|within \d+ (hours|days)/i.test(addon), 'add-on makes no guarantee or time promise');
  assert.ok(!/\$\d/.test(addon), 'add-on prices come from planData, not typed by hand');
});

// ── Plan moves (plans.cjs PLAN_FEATURE_LIST after the feature moves) ─────────────
const GATE_MIN = { all: 0, core: 1, field: 2, cmd: 3, ent: 4 };

test('feature gates match the app: quotes on all plans; fleet, routes and pay on Field; reviews and advanced reports on Command', () => {
  const g = pd.FEATURE_GATE;
  // On every plan
  assert.equal(g.estimatesQuotes, 'all');
  assert.equal(g.routeManagement, 'all');
  assert.equal(g.dashboard, 'all');
  // Field and up: route optimization / Rebalance, vehicles / equipment / mileage / truck inspections, commissions / team pay
  for (const k of ['routeIntelligence', 'vehicleTracking', 'equipmentTracking', 'mileageTracking', 'truckInspection', 'commissions']) assert.equal(g[k], 'field', k);
  // Command: performance reviews, incidents, tech performance reports, advanced reports / job costing, priority support
  for (const k of ['performanceReviews', 'incidentTracking', 'techPerformance', 'advancedReports', 'prioritySupport']) assert.equal(g[k], 'cmd', k);
  // Leads inbox stays Field and up, team messaging and "unlimited team members" Core and up
  assert.equal(g.leadManagement, 'field');
  assert.equal(g.teamMessaging, 'core');
  assert.equal(g.unlimitedUsers, 'core');
  // plans.cjs: team, timecards, attendance are 'solo'; purchaseOrders -> inventory, paymentPlans and lateFees -> invoicing are 'solo'
  for (const k of ['rolesPermissions', 'timecards', 'attendanceTracking', 'timeOff', 'employeeIdPin', 'gpsFieldTracking', 'employeeTermination', 'purchaseOrders', 'partialPayments', 'lateFees']) assert.equal(g[k], 'all', k);
  // still Field
  for (const k of ['assetCheckout', 'subcontractors', 'maintenanceScheduling', 'leadCaptureForm']) assert.equal(g[k], 'field', k);
});

test('every plan card lists each feature on the plan its gate says, and on no lower plan', () => {
  const checks = {
    'components/PricingCards.js': ['const PLAN_INCLUDED = {', {
      'Estimates & quotes': 'estimatesQuotes', 'Quote approval in customer portal': 'estimatesQuotes',
      'Route optimization & Rebalance all routes': 'routeIntelligence', 'Vehicles, trailers, equipment, tools & mileage': 'vehicleTracking',
      'Daily truck inspections': 'truckInspection', 'Commissions & per-job team pay': 'commissions', 'Leads inbox': 'leadManagement',
      'Subcontractor management': 'subcontractors', 'Maintenance scheduling': 'maintenanceScheduling', 'Performance reviews': 'performanceReviews',
      'Incident tracking': 'incidentTracking', 'Tech performance reports': 'techPerformance', 'Advanced reports & job costing': 'advancedReports',
      'Automations & rules engine': 'automationsEngine', 'Two-way customer texting inbox (needs the texting add-on)': 'inAppMessaging', 'Priority support': 'prioritySupport',
      'Team messaging': 'teamMessaging', 'Time tracking & timecards': 'timecards', 'Purchase orders': 'purchaseOrders',
      'Employee asset checkout': 'assetCheckout', 'Partial payments': 'partialPayments', 'Embeddable lead capture form': 'leadCaptureForm',
      'GPS field tracking': 'gpsFieldTracking', 'QuickBooks Online sync': 'quickbooksSync',
      'Roles & permissions': 'rolesPermissions', 'Attendance & time off': 'attendanceTracking', 'Employee ID and PIN login': 'employeeIdPin',
      'Employee termination workflow': 'employeeTermination', 'Automated late fees': 'lateFees', 'Unlimited team members': 'unlimitedUsers',
    }],
    'app/compare/page.js': ['const PLAN_CARDS = [', {
      'Quotes & estimates': 'estimatesQuotes', 'Quote approval in portal': 'estimatesQuotes',
      'Route optimization & Rebalance all routes': 'routeIntelligence', 'Vehicles, trailers, equipment, tools & mileage': 'vehicleTracking',
      'Daily truck inspections': 'truckInspection', 'Commissions & per-job team pay': 'commissions', 'Leads inbox & pipeline': 'leadManagement',
      'Performance reviews': 'performanceReviews', 'Incident tracking': 'incidentTracking', 'Tech performance reports': 'techPerformance',
      'Advanced reports & job costing': 'advancedReports', 'Team messaging': 'teamMessaging', 'Priority support': 'prioritySupport',
      'Subcontractor management': 'subcontractors', 'Maintenance calendar': 'maintenanceScheduling', 'Two-way customer texting inbox (needs the texting add-on)': 'inAppMessaging',
      'Payment plans': 'partialPayments', 'Automated late fees': 'lateFees', 'Purchase orders': 'purchaseOrders', 'Roles & permissions': 'rolesPermissions',
      'Time tracking & timecards': 'timecards', 'Attendance & time off': 'attendanceTracking', 'GPS field tracking': 'gpsFieldTracking',
      'Employee ID & PIN login': 'employeeIdPin', 'Employee termination workflow': 'employeeTermination', 'Unlimited users': 'unlimitedUsers',
    }],
  };
  for (const [file, [start, expectations]] of Object.entries(checks)) {
    const body = read(file).slice(read(file).indexOf(start));
    const blocks = PLAN_ORDER.map((n) => planBlock(body, n));
    for (const [label, gate] of Object.entries(expectations)) {
      const where = blocks.map((b, i) => (b.includes(label) ? i : -1)).filter((i) => i >= 0);
      assert.deepEqual(where, [GATE_MIN[pd.FEATURE_GATE[gate]]], `${file}: "${label}" is listed only on ${PLAN_ORDER[GATE_MIN[pd.FEATURE_GATE[gate]]]} (gate ${gate})`);
    }
  }
});

test('/compare rows and /features badges follow the gates for every moved feature', () => {
  const compare = read('app/compare/page.js');
  for (const k of ['commissions', 'advancedReports', 'teamMessaging', 'estimatesQuotes', 'vehicleTracking', 'equipmentTracking', 'mileageTracking', 'truckInspection', 'performanceReviews', 'incidentTracking', 'techPerformance', 'routeIntelligence', 'prioritySupport']) {
    assert.ok(compare.includes(`gateToValues(FEATURE_GATE.${k})`), `/compare has a row for ${k}`);
  }
  const features = read('app/features/page.js');
  const titleGate = {
    'Estimates and Quotes': 'estimatesQuotes', 'Mileage Tracking': 'mileageTracking', 'Performance Reviews': 'performanceReviews',
    'Incident Tracking': 'incidentTracking', 'Daily Truck Inspection and Checklists': 'truckInspection', 'Equipment and Asset Tracking': 'equipmentTracking',
    'Route Intelligence': 'routeIntelligence', 'Commissions and Per-Job Team Pay': 'commissions', 'Advanced Reports and Job Costing': 'advancedReports',
  };
  for (const [title, gate] of Object.entries(titleGate)) {
    const at = features.indexOf(`title: '${title}'`);
    assert.ok(at > 0, `/features has a card: ${title}`);
    const badge = features.slice(at, features.indexOf('badge:', at) + 80).match(/badge: ([^,\n]+),/)[1];
    assert.equal(badge, `gateToBadge(FEATURE_GATE.${gate})`, `${title} badge follows ${gate}`);
  }
  assert.ok(!/On Field plans and above, the portal also shows quote approval/.test(features), 'portal copy: quote approval is on every plan');
  assert.ok(!/On Field plans and above, the portal also shows quote approval/.test(read('app/pricing/page.js')));
});

// When the site has been built (npm run build), scan the real rendered pages too.
test('built pages (when present) show the new prices and no old price or customer limit', { skip: !process.env.CI && !existsSync(new URL('../.next/server/app/pricing.html', import.meta.url)) }, () => {
  const strip = (h) => h.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\$ /g, '$').replace(/\s+/g, ' ');
  const page = (n) => strip(readFileSync(new URL(`../.next/server/app/${n}.html`, import.meta.url), 'utf8'));
  const pricing = page('pricing');
  for (const t of ['$39', '$129', '$209', '$349', 'From $599/mo', '125 completed visits a week', '350 completed visits a week', '1,000 completed visits a week', '2,000 completed visits a week',
    '2 months free', 'AI assistant, up to 150 questions a month', 'AI assistant, up to 1,500 questions a month', '75 GB photo & video storage', '250 GB photo & video storage', 'About 250,000 photos or 16,000 videos']) {
    assert.ok(pricing.includes(t), `/pricing shows: ${t}`);
  }
  for (const n of ['pricing', 'compare', 'features', 'index']) {
    const text = page(n);
    for (const bad of ['39.99', '$119', '$169', 'counted customers', 'customer limit?', '2,500+']) assert.ok(!text.includes(bad), `/${n} does not show: ${bad}`);
  }
});

test('no gated card hardcodes a plan badge: badges come from gateToBadge(FEATURE_GATE.x)', () => {
  for (const f of ['app/features/page.js', 'lib/homeFeatures.js']) {
    const hits = read(f).split('\n').filter((l) => /badge:\s*BADGE\.(core|field|cmd|ent)\b/.test(l));
    assert.deepEqual(hits, [], `${f}: use gateToBadge(FEATURE_GATE.<key>) for plan-gated cards`);
  }
});

test('compare table is accessible: captions, row and group headers, hidden Included / Not included text', () => {
  const c = read('app/compare/page.js');
  for (const t of ['<caption', 'scope="row"', 'scope="rowgroup"', 'scope="col"', 'Not included', "Fragment key={`group-${gi}`}", 'aria-hidden="true"']) assert.ok(c.includes(t), `compare has ${t}`);
  const cards = read('components/PricingCards.js');
  assert.ok(cards.includes('aria-pressed={annual}') && cards.includes('aria-pressed={!annual}'), 'toggle buttons use aria-pressed');
  assert.ok((cards.match(/aria-hidden="true"/g) || []).length >= 4, 'decorative icons are hidden from screen readers');
});

test('the "change plans" answer matches what the app allows', () => {
  assert.ok(read('app/pricing/page.js').includes('Upgrade anytime. You can move down when your users, locations and stored files fit the smaller plan; the change is prorated.'));
});

test('Solo card does not list routes twice', () => {
  const body = read('components/PricingCards.js');
  const solo = planBlock(body.slice(body.indexOf('const PLAN_INCLUDED = {')), 'Solo');
  assert.equal(solo.split('\n').filter((l) => /route/i.test(l)).length, 1, 'one routes line on Solo');
});

test('every FEATURE_GATE key a page reads exists, and every gate key is used by a page', () => {
  const used = new Set();
  for (const f of ['app/compare/page.js', 'app/features/page.js', 'lib/homeFeatures.js']) {
    for (const [, k] of read(f).matchAll(/FEATURE_GATE\.(\w+)/g)) {
      assert.ok(k in pd.FEATURE_GATE, `${f} reads FEATURE_GATE.${k}, which does not exist`);
      used.add(k);
    }
  }
  const unused = Object.keys(pd.FEATURE_GATE).filter((k) => !used.has(k));
  assert.deepEqual(unused, [], 'gate keys no page uses (delete them, or the app has no such feature)');
  assert.equal(pd.FEATURE_GATE.routeProfitability, undefined, 'the app has no route profitability report');
});

test('card copy does not promise features from a higher plan', () => {
  const all = read('lib/homeFeatures.js') + read('app/features/page.js');
  for (const bad of ['Build optimized routes', 'A vehicle service is due? Flagged', 'a route, a truck', 'a tech, a truck', 'feed directly into your job costs', 'vehicle costs per job']) {
    assert.ok(!all.includes(bad), `no: ${bad}`);
  }
  const core = read('app/compare/page.js');
  assert.ok(!/name: 'Core'[\s\S]*?features: \[[^\]]*Team management/.test(core), 'Team management is not a Core add');
});

test('the old 8-week average wording appears nowhere on the site, and the new rule is on every page that states it', async () => {
  const { readFileSync, readdirSync, statSync } = await import('node:fs');
  const walk = (d) => readdirSync(d).flatMap((f) => {
    const p = `${d}/${f}`;
    return statSync(p).isDirectory() ? walk(p) : /\.(js|mjs)$/.test(f) ? [p] : [];
  });
  const root = new URL('..', import.meta.url).pathname;
  for (const dir of ['app', 'components', 'lib']) {
    for (const f of walk(`${root}${dir}`)) {
      const text = readFileSync(f, 'utf8');
      assert.ok(!/8[- ]week/i.test(text), `${f} still says 8-week`);
      assert.ok(!/WEEKLY_VISITS_AVERAGE_WEEKS/.test(text), `${f} still uses the retired constant`);
    }
  }
  // The Terms are Eddie's final document (app/legal/tos/content.js, generated verbatim from Word). They state
  // the plan-change rule in Article V in their own words; the site's PLAN_ALLOWANCE_RULE copy must say the same thing.
  const { HTML } = await import(pathToFileURL(`${root}app/legal/tos/content.js`).href);
  const tos = HTML.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  assert.match(tos, /Article V Subscription Plans, Usage Allowances, and Plan Changes/);
  assert.match(tos, /Section 5\.3 Upward Plan Adjustment\. If Customer completes more than 150% of its Subscription Plan’s weekly visit allowance during each of four consecutive weekly measurement periods/);
  assert.match(tos, /Zerbiq will provide notice to the Account owner before the adjustment, and the new Subscription Plan and its Fees will take effect thirty days after that notice/);
  assert.match(tos, /Section 5\.4 Command and Enterprise Plans\..*the next Subscription Plan will be Enterprise\. Zerbiq will quote the applicable Enterprise pricing before the adjustment takes effect/);
  assert.match(tos, /Section 5\.5 Downward Plan Adjustment\..*for twelve consecutive weekly measurement periods/);
  assert.match(tos, /overage charge/);
  assert.match(tos, /Effective Date: November 24, 2026/);
  assert.match(tos, /support@zerbiq\.com/);
  assert.doesNotMatch(tos, /8[- ]week|eight[- ]week|average/i);
  assert.doesNotMatch(tos, /automatic(ally)? (move|change)s? (your|Customer)/i);
  // The site copy agrees with it
  assert.match(pd.PLAN_ALLOWANCE_RULE, /150%/);
  assert.match(pd.PLAN_ALLOWANCE_RULE, /4 weeks in a row/);
  assert.match(pd.PLAN_MOVE_DOWN_RULE, /12 weeks in a row/);
  assert.equal(pd.PLAN_NEXT_PLAN_NOTE, 'For Command, the next plan is Enterprise, at a price we quote you before the change.');
});
