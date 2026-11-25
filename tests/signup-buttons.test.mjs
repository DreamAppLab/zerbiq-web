import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { PRIMARY_CTA_LABEL } from '../lib/siteConfig.mjs';

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
