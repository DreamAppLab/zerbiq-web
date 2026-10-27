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

test('ZerbIQ is on every plan; QuickBooks sync is labelled coming soon', () => {
  assert.equal(pd.FEATURE_GATE.aiChatbot, 'all');
  assert.deepEqual(pd.gateToValues(pd.FEATURE_GATE.aiChatbot), [true, true, true, true, true]);
  assert.equal(pd.QUICKBOOKS_SYNC_LABEL, 'QuickBooks sync (coming soon)');
  for (const f of ['lib/homeFeatures.js', 'app/features/page.js']) {
    assert.ok(read(f).includes('QUICKBOOKS_COMING_SOON'), `${f} labels QuickBooks`);
  }
  for (const f of ['app/compare/page.js', 'components/PricingCards.js']) {
    assert.ok(read(f).includes('QUICKBOOKS_SYNC_LABEL'), `${f} labels QuickBooks`);
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
