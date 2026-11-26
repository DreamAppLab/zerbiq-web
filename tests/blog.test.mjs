import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import {
  POSTS,
  livePosts,
  isLive,
  todayEastern,
  bodyTexts,
  plainText,
  inlineTokens,
  postWordCount,
  readingMinutes,
} from '../lib/blog/index.mjs';
import {
  postJsonLd,
  faqJsonLd,
  blogIndexJsonLd,
  jsonLdString,
  postUrl,
  postMetadata,
  sitemapEntries,
  atomFeed,
  STATIC_ROUTES,
} from '../lib/blog/seo.mjs';
import { SITE_URL, pageMetadata } from '../lib/seo.mjs';

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');
const LAST_ALLOWED_DATE = '2027-02-18'; // the last post of the scheduled lawn care series; later dates must be added on purpose
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/** Every string a reader or a search engine sees for one post. */
function allText(post) {
  return [
    post.title, post.metaTitle, post.description, post.answer, post.category,
    ...post.takeaways, ...bodyTexts(post), ...post.faq.flatMap((f) => [f.q, f.a]),
  ].join('\n');
}

// Real routes: every app/**/page.js, with the one dynamic blog route expanded to the post slugs.
function routes() {
  const out = new Set();
  const walk = (dir) => {
    for (const name of readdirSync(new URL(`../${dir}`, import.meta.url))) {
      const rel = `${dir}/${name}`;
      if (statSync(new URL(`../${rel}`, import.meta.url)).isDirectory()) walk(rel);
      else if (name === 'page.js') {
        const route = '/' + rel.replace(/^app\//, '').replace(/\/?page\.js$/, '');
        if (!route.includes('[')) out.add(route === '/' ? '/' : route.replace(/\/$/, ''));
      }
    }
  };
  walk('app');
  for (const p of POSTS) out.add(`/blog/${p.slug}`);
  return out;
}

test('at least 10 posts are published', () => {
  assert.ok(livePosts().length >= 10, `${livePosts().length} live posts`);
});

test('slugs are clean and unique; titles, meta titles and descriptions are unique and within limits', () => {
  for (const key of ['slug', 'title', 'metaTitle', 'description']) {
    const values = POSTS.map((p) => p[key].toLowerCase());
    assert.equal(new Set(values).size, values.length, `${key} is unique`);
  }
  for (const p of POSTS) {
    assert.match(p.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${p.slug}: clean slug`);
    assert.ok(p.metaTitle.length <= 60, `${p.slug}: meta title is ${p.metaTitle.length} chars`);
    assert.ok(p.metaTitle.length >= 20, `${p.slug}: meta title too short`);
    assert.ok(p.description.length <= 155, `${p.slug}: description is ${p.description.length} chars`);
    assert.ok(p.description.length >= 70, `${p.slug}: description too short`);
  }
});

test('every post has the required parts: answer-first paragraph, takeaways, sections, FAQ, related posts', () => {
  const slugs = new Set(POSTS.map((p) => p.slug));
  for (const p of POSTS) {
    const n = words(plainText(p.answer));
    assert.ok(n >= 40 && n <= 60, `${p.slug}: answer is ${n} words (want 40-60)`);
    assert.ok(p.takeaways.length >= 3 && p.takeaways.length <= 6, `${p.slug}: key takeaways`);
    assert.ok(p.sections.length >= 5, `${p.slug}: sections`);
    assert.ok(p.faq.length >= 3 && p.faq.length <= 5, `${p.slug}: ${p.faq.length} FAQ items (want 3-5)`);
    for (const f of p.faq) assert.ok(f.q.endsWith('?') && f.a.length > 40, `${p.slug}: FAQ "${f.q}"`);
    assert.ok(p.related.length >= 2 && p.related.length <= 3, `${p.slug}: 2-3 related posts`);
    for (const r of p.related) assert.ok(slugs.has(r) && r !== p.slug, `${p.slug}: related ${r} exists`);
    assert.ok(p.sections.some((s) => s.body.some((b) => typeof b === 'object' && (b.ol || b.ul))), `${p.slug}: has a checklist or steps`);
    assert.ok(p.sections.some((s) => s.body.some((b) => typeof b === 'string' && /\/features|\/pricing/.test(b))), `${p.slug}: links to features or pricing`);
    assert.ok(p.sections.some((s) => s.body.some((b) => typeof b === 'string' && /calendly\.com\/zerbiq-demos/.test(b))), `${p.slug}: demo call to action`);
    const h2s = p.sections.map((s) => s.h);
    assert.equal(new Set(h2s).size, h2s.length, `${p.slug}: unique H2s`);
    const n2 = postWordCount(p);
    assert.ok(n2 >= 900 && n2 <= 1500, `${p.slug}: ${n2} words (want 900-1500)`);
    assert.ok(readingMinutes(p) >= 4 && readingMinutes(p) <= 8, `${p.slug}: reading time`);
  }
});

test('dates are real ISO dates, never after the cut-off, and updated is not before published', () => {
  for (const p of POSTS) {
    for (const key of ['publishedAt', 'updatedAt']) {
      assert.match(p[key], ISO, `${p.slug}: ${key} format`);
      assert.ok(!Number.isNaN(Date.parse(p[key])), `${p.slug}: ${key} is a date`);
      assert.ok(p[key] <= LAST_ALLOWED_DATE, `${p.slug}: ${key} ${p[key]} is after ${LAST_ALLOWED_DATE}`);
    }
    assert.ok(p.updatedAt >= p.publishedAt, `${p.slug}: updated before published`);
  }
  const dates = new Set(POSTS.map((p) => p.publishedAt));
  assert.ok(dates.size >= 8, 'posts are spread over several dates, not all on one day');
});

test('posts are written to the content rules: no placeholders, no invented numbers, no pushy early-access copy', () => {
  for (const p of POSTS) {
    const text = allText(p);
    assert.ok(!/request early access/i.test(text), `${p.slug}: "Request Early Access"`);
    assert.ok(!/lorem ipsum|\bTODO\b|\bTBD\b|\bFIXME\b|placeholder|\[\s*insert/i.test(text), `${p.slug}: placeholder text`);
    // Statistics need a fetched source. None of these posts cites one, so none may carry a number claim.
    assert.ok(!/\d\s?%|\bpercent\b|\bper ?cent\b/i.test(text), `${p.slug}: percentage claim without a source`);
    assert.ok(!/\b(studies|surveys?|research) (show|shows|found|says?|suggests?)\b|according to|on average|\b\d+ (out of|in) \d+\b|\b\d+x\b/i.test(text), `${p.slug}: statistic marker`);
    assert.ok(!/\$\s?\d/.test(text), `${p.slug}: dollar figure (Zerbiq prices live on /pricing; examples are written in words)`);
    assert.ok(!/testimonial|award-winning|#1\b|best-in-class|guarantee/i.test(text), `${p.slug}: unsupported claim`);
    assert.ok(!/\b(housecall ?pro|jobber|servicetitan|service titan|fieldedge|workiz|service fusion|fieldpulse|joblogic)\b/i.test(text), `${p.slug}: competitor named`);
    assert.ok(!/archiv|customer limit|coming soon/i.test(text), `${p.slug}: wording the site avoids`);
    assert.ok(!new RegExp(['col', 'our'].join(''), 'i').test(text), `${p.slug}: US spelling`);
  }
});

test('tax content carries a not-tax-advice note', () => {
  const tax = POSTS.find((p) => p.slug === 'sales-tax-basics-for-service-invoices');
  assert.ok(tax, 'sales tax post exists');
  assert.ok(/not tax or legal advice/i.test(allText(tax)));
});

test('inline markup parses into text, bold and link tokens', () => {
  assert.deepEqual(inlineTokens('a **b** [c](/d) e'), [
    { type: 'text', text: 'a ' },
    { type: 'bold', text: 'b' },
    { type: 'text', text: ' ' },
    { type: 'link', text: 'c', href: '/d' },
    { type: 'text', text: ' e' },
  ]);
  assert.equal(plainText('a **b** [c](/d) e'), 'a b c e');
});

test('internal links resolve to real routes; external links are only the demo booking page', () => {
  const real = routes();
  for (const p of POSTS) {
    const strings = [p.answer, ...p.takeaways, ...bodyTexts(p), ...p.faq.flatMap((f) => [f.q, f.a])];
    for (const s of strings) {
      for (const t of inlineTokens(s)) {
        if (t.type !== 'link') continue;
        if (t.href.startsWith('/')) {
          const path = t.href.split('#')[0].split('?')[0];
          assert.ok(real.has(path), `${p.slug}: link ${t.href} does not match a route`);
        } else {
          assert.equal(t.href, 'https://calendly.com/zerbiq-demos/30min', `${p.slug}: external link ${t.href}`);
        }
      }
    }
  }
  for (const r of STATIC_ROUTES) assert.ok(real.has(r), `sitemap route ${r} exists`);
});

test('JSON-LD: BlogPosting, FAQPage and BreadcrumbList parse, are complete and match the visible post', () => {
  for (const p of POSTS) {
    const items = postJsonLd(p);
    assert.deepEqual(items.map((i) => i['@type']), ['BlogPosting', 'FAQPage', 'BreadcrumbList']);
    for (const item of items) {
      const parsed = JSON.parse(jsonLdString(item));
      assert.equal(parsed['@context'], 'https://schema.org');
      assert.ok(!jsonLdString(item).includes('<'), `${p.slug}: "<" escaped in the script tag`);
    }
    const [article, faq, crumbs] = items.map((i) => JSON.parse(jsonLdString(i)));
    assert.equal(article.headline, p.title);
    assert.equal(article.datePublished, p.publishedAt);
    assert.equal(article.dateModified, p.updatedAt);
    assert.equal(article.author['@type'], 'Organization');
    assert.equal(article.author.name, 'Zerbiq');
    assert.equal(article.publisher.name, 'Zerbiq');
    assert.equal(article.mainEntityOfPage['@id'], postUrl(p.slug));
    assert.ok(article.image[0].startsWith(`${SITE_URL}/blog/og/`));
    assert.equal(faq.mainEntity.length, p.faq.length);
    faq.mainEntity.forEach((q, i) => {
      assert.equal(q.name, plainText(p.faq[i].q));
      assert.equal(q.acceptedAnswer.text, plainText(p.faq[i].a));
    });
    assert.deepEqual(crumbs.itemListElement.map((c) => c.position), [1, 2, 3]);
    assert.equal(crumbs.itemListElement[2].item, postUrl(p.slug));
  }
  assert.deepEqual(faqJsonLd(POSTS[0]).mainEntity.map((q) => q.name), POSTS[0].faq.map((f) => plainText(f.q)));
});

test('blog index JSON-LD: Blog, CollectionPage with an ItemList of every post, BreadcrumbList', () => {
  const [blog, collection, crumbs] = blogIndexJsonLd(livePosts()).map((o) => JSON.parse(jsonLdString(o)));
  assert.equal(blog['@type'], 'Blog');
  assert.equal(collection['@type'], 'CollectionPage');
  assert.equal(collection.mainEntity['@type'], 'ItemList');
  assert.deepEqual(collection.mainEntity.itemListElement.map((i) => i.url), livePosts().map((p) => postUrl(p.slug)));
  assert.equal(crumbs['@type'], 'BreadcrumbList');
});

test('post metadata: canonical, Open Graph article, Twitter card, share image', () => {
  for (const p of POSTS) {
    const m = postMetadata(p);
    assert.equal(m.title, p.metaTitle);
    assert.equal(m.description, p.description);
    assert.equal(m.alternates.canonical, `/blog/${p.slug}`);
    assert.equal(m.openGraph.type, 'article');
    assert.equal(m.openGraph.url, `/blog/${p.slug}`);
    assert.equal(m.openGraph.publishedTime, p.publishedAt);
    assert.equal(m.openGraph.modifiedTime, p.updatedAt);
    assert.ok(m.openGraph.images[0].alt && m.openGraph.images[0].url.endsWith(`/blog/og/${p.slug}`));
    assert.equal(m.twitter.card, 'summary_large_image');
    assert.equal(m.twitter.title, p.metaTitle);
    assert.equal(m.robots, undefined, 'posts are indexable');
  }
  // other pages keep their old shape and gain a Twitter card
  const m = pageMetadata({ title: 'T', description: 'D', path: '/x' });
  assert.equal(m.openGraph.type, 'website');
  assert.equal(m.twitter.card, 'summary_large_image');
});

test('sitemap lists the blog index and every post with a lastmod; robots allows the blog and points to it', () => {
  const entries = sitemapEntries();
  const urls = entries.map((e) => e.url);
  assert.equal(new Set(urls).size, urls.length, 'no duplicate sitemap URLs');
  assert.ok(urls.includes(`${SITE_URL}/blog`));
  for (const p of livePosts()) {
    const e = entries.find((x) => x.url === postUrl(p.slug));
    assert.ok(e, `${p.slug} in sitemap`);
    assert.equal(e.lastModified, p.updatedAt);
  }
  assert.ok(read('app/sitemap.js').includes('sitemapEntries()'), 'app/sitemap.js serves the shared entries');
  const robots = read('app/robots.js');
  assert.ok(robots.includes("allow: '/'") && robots.includes('/sitemap.xml'));
  assert.ok(!/disallow:[^\]]*\/blog/.test(robots), 'robots does not block the blog');
});

test('Atom feed lists every post; llms.txt points at the blog and key pages', () => {
  const feed = atomFeed();
  for (const p of livePosts()) assert.ok(feed.includes(`<id>${postUrl(p.slug)}</id>`), `${p.slug} in feed`);
  assert.ok(feed.startsWith('<?xml'));
  assert.ok(read('app/blog/feed.xml/route.js').includes('atomFeed()'));
  const llms = read('public/llms.txt');
  for (const path of ['/blog', '/blog/feed.xml', '/features', '/pricing']) {
    assert.ok(llms.includes(`${SITE_URL}${path})`), `llms.txt lists ${path}`);
  }
});

// The built pages are checked when present (always in CI, which builds first): the
// JSON-LD and the content must be in the server-rendered HTML, not added by client code.
const built = (name) => new URL(`../.next/server/app/${name}`, import.meta.url);
const haveBuild = existsSync(built('blog.html'));
const skipBuilt = !process.env.CI && !haveBuild;

test('built post pages: one H1, canonical, server-rendered JSON-LD that parses, visible FAQ', { skip: skipBuilt }, () => {
  for (const p of livePosts()) {
    const html = readFileSync(built(`blog/${p.slug}.html`), 'utf8');
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${p.slug}: exactly one H1`);
    assert.ok(html.includes(`<link rel="canonical" href="${postUrl(p.slug)}"`), `${p.slug}: canonical`);
    assert.ok(html.includes('property="og:title"') && html.includes('name="twitter:card"'), `${p.slug}: og and twitter tags`);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.deepEqual(blocks.map((b) => b['@type']), ['BlogPosting', 'FAQPage', 'BreadcrumbList'], `${p.slug}: JSON-LD in the HTML`);
    for (const f of p.faq) assert.ok(html.includes(`>${f.q}</h3>`), `${p.slug}: FAQ question visible: ${f.q}`);
    assert.ok(html.includes('Key takeaways'), `${p.slug}: key takeaways`);
    const article = html.slice(html.indexOf('<article'), html.indexOf('</article>'));
    assert.ok(article.length > 5000 && !/Request Early Access/.test(article), `${p.slug}: no early-access wording in the post`);
  }
});

test('built blog index and sitemap: JSON-LD in the HTML and every post listed', { skip: skipBuilt }, () => {
  const html = readFileSync(built('blog.html'), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.deepEqual(blocks.map((b) => b['@type']), ['Blog', 'CollectionPage', 'BreadcrumbList']);
  for (const p of livePosts()) assert.ok(html.includes(`href="/blog/${p.slug}"`), `${p.slug} linked from the index`);
  const sitemap = readFileSync(built('sitemap.xml.body'), 'utf8');
  for (const p of livePosts()) assert.ok(sitemap.includes(`<loc>${postUrl(p.slug)}</loc>`), `${p.slug} in built sitemap`);
  assert.ok(sitemap.includes(`<loc>${SITE_URL}/blog</loc>`));
});

test('scheduled posts: hidden until their date, then live, everywhere the blog lists posts', () => {
  const lawn = POSTS.filter((p) => p.publishedAt >= '2026-12-03');
  assert.equal(lawn.length, 12, 'twelve scheduled lawn care posts');
  assert.deepEqual(
    lawn.map((p) => p.publishedAt).sort(),
    ['2026-12-03', '2026-12-10', '2026-12-17', '2026-12-24', '2026-12-31', '2027-01-07', '2027-01-14', '2027-01-21', '2027-01-28', '2027-02-04', '2027-02-11', '2027-02-18'],
    'one post every Thursday',
  );
  const first = lawn.find((p) => p.publishedAt === '2026-12-03');
  const second = lawn.find((p) => p.publishedAt === '2026-12-10');
  // The day before a post's date it is hidden; on its date it is live.
  assert.ok(!isLive(first, '2026-12-02') && isLive(first, '2026-12-03'));
  assert.ok(!livePosts('2026-12-02').some((p) => p.slug === first.slug));
  assert.ok(livePosts('2026-12-03').some((p) => p.slug === first.slug));
  assert.ok(!livePosts('2026-12-03').some((p) => p.slug === second.slug), 'next week stays hidden');
  // Hidden posts stay out of the sitemap and feed, live ones go in.
  const before = sitemapEntries(livePosts('2026-12-02')).map((e) => e.url);
  const after = sitemapEntries(livePosts('2026-12-03')).map((e) => e.url);
  assert.ok(!before.includes(postUrl(first.slug)) && after.includes(postUrl(first.slug)));
  assert.ok(!atomFeed(livePosts('2026-12-02')).includes(postUrl(first.slug)));
  assert.ok(atomFeed(livePosts('2026-12-03')).includes(postUrl(first.slug)));
  // The post page and the index read the date gate.
  assert.ok(read('app/blog/[slug]/page.js').includes('!isLive(post)'), 'post page 404s a scheduled post');
  assert.ok(read('app/blog/page.js').includes('livePosts()'), 'index lists live posts only');
  assert.ok(/revalidate = 3600/.test(read('app/sitemap.js')) && /revalidate = 3600/.test(read('app/blog/feed.xml/route.js')), 'sitemap and feed refresh hourly');
  assert.match(todayEastern(new Date('2026-12-03T12:00:00Z')), /^2026-12-03$/);
  assert.equal(todayEastern(new Date('2026-12-03T03:00:00Z')), '2026-12-02', 'midnight Eastern, not UTC');
});

test('scheduled posts: the cover image route hides a scheduled post and refreshes hourly', () => {
  const og = read('app/blog/og/[slug]/route.js');
  assert.ok(og.includes('isLive(post)'), 'cover 404s a scheduled post');
  assert.ok(og.includes('livePosts().map'), 'only live posts are built up front');
  assert.ok(!/POSTS\.map/.test(og), 'the build list is not every post');
  assert.ok(/revalidate = 3600/.test(og) && /dynamicParams = true/.test(og), 'a post that goes live gets its cover without a redeploy');
});

test('posts name only the payment processors Zerbiq supports today (Stripe, Square, Authorize.net)', () => {
  for (const p of POSTS) {
    assert.ok(!/paypal|venmo/i.test(JSON.stringify(p)), `${p.slug}: names a processor that is not live yet`);
  }
});
