import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { PRIMARY_CTA_LABEL, SIGNUP_HREF, signupHref, SELF_SERVE_PLAN_IDS } from '../lib/siteConfig.mjs';

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');
function files(root) {
  return readdirSync(new URL(`../${root}`, import.meta.url)).flatMap((n) => {
    const rel = `${root}/${n}`;
    return statSync(new URL(`../${rel}`, import.meta.url)).isDirectory() ? files(rel) : /\.(js|mjs)$/.test(n) ? [rel] : [];
  });
}

test('the primary button label is "Sign Up"', () => {
  assert.equal(PRIMARY_CTA_LABEL, 'Sign Up');
});

test('"Request Early Access" appears nowhere in site source', () => {
  for (const f of ['app', 'components', 'lib'].flatMap(files)) {
    assert.ok(!/request early access/i.test(read(f)), `${f} still says "Request Early Access"`);
  }
});

test('home feature-grid cards render no button, only the caption', () => {
  const page = read('app/page.js');
  const start = page.indexOf('className="feature-card"');
  const end = page.indexOf('FOUNDER STORY STRIP');
  assert.ok(start > 0 && end > start);
  const card = page.slice(start, end);
  assert.ok(!card.includes('btn-primary'), 'feature card has a button');
  assert.ok(!card.includes('PRIMARY_CTA_LABEL'));
  assert.ok(!card.includes('EARLY_ACCESS_HREF'));
  assert.ok(card.includes('{f.badge}'), 'caption kept');
});

test('/features has no per-feature button and exactly one Sign Up button at the bottom', () => {
  const page = read('app/features/page.js');
  assert.equal((page.match(/className="btn-primary"/g) || []).length, 1, 'exactly one button');
  assert.equal((page.match(/\{PRIMARY_CTA_LABEL\}/g) || []).length, 1);
  assert.ok(page.indexOf('data-features-cta') > page.indexOf('FEATURE_GROUPS.map'), 'button sits after the feature sections');
  assert.ok(page.includes('feature.link &&'), 'texting prices text link kept');
});

test('Sign Up goes to the app sign-up; plan links use the app plan ids', () => {
  assert.equal(SIGNUP_HREF, 'https://app.zerbiq.com/signup');
  assert.deepEqual(SELF_SERVE_PLAN_IDS, ['solo', 'core', 'field', 'command']); // app: PLAN_IDS minus enterprise
  assert.equal(signupHref('Core'), 'https://app.zerbiq.com/signup?plan=core');
  assert.equal(signupHref('Enterprise'), SIGNUP_HREF);
});

test('no Sign Up button links to the lead form', () => {
  for (const f of ['app', 'components', 'lib'].flatMap(files)) {
    if (/early-?access/i.test(f)) continue;
    const src = read(f);
    assert.ok(!/EARLY_ACCESS_HREF|earlyAccessHref/.test(src), `${f} links to the lead form`);
  }
});

test('plan cards: self-serve plans sign up with their id, Enterprise contacts us', async () => {
  const { readFileSync: r } = await import('node:fs');
  const src = r(new URL('../lib/planData.js', import.meta.url), 'utf8');
  for (const [name, id] of [['Solo', 'solo'], ['Core', 'core'], ['Field', 'field'], ['Command', 'command']]) {
    assert.ok(src.includes(`ctaHref: signupHref('${name}')`), name);
    assert.equal(signupHref(name), `${SIGNUP_HREF}?plan=${id}`);
  }
  assert.match(src, /cta: 'Contact Us',\n\s+ctaHref: 'mailto:support@zerbiq.com'/);
});

test('the marketing /signup page redirects to the app sign-up', () => {
  assert.ok(!statSafe('app/signup/page.js'));
  assert.match(read('next.config.mjs'), /source: '\/signup', destination: 'https:\/\/app\.zerbiq\.com\/signup'/);
});
function statSafe(rel) { try { statSync(new URL(`../${rel}`, import.meta.url)); return true; } catch { return false; } }
