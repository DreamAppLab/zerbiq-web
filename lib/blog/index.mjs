// ─────────────────────────────────────────────────────────────────────────────
// lib/blog/index.mjs — the static blog: post data plus small helpers. Posts live
// in posts-a/b/c.mjs as plain data (no markup, no client code), so the blog pages
// are generated at build time.
// ─────────────────────────────────────────────────────────────────────────────
import { POSTS_A } from './posts-a.mjs';
import { POSTS_B } from './posts-b.mjs';
import { POSTS_C } from './posts-c.mjs';
import { POSTS_D } from './posts-d.mjs';

export const BLOG_AUTHOR = 'The Zerbiq Team';

/** Newest first. */
export const POSTS = [...POSTS_A, ...POSTS_B, ...POSTS_C, ...POSTS_D].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
);

/** Today's date in Eastern time as 'YYYY-MM-DD'. Posts go live at midnight Eastern on their date. */
export function todayEastern(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** A post is live once its publishedAt date has arrived. Later dates are scheduled and stay hidden. */
export function isLive(post, today = todayEastern()) {
  return post.publishedAt <= today;
}

/** Newest first, only the posts whose date has arrived. */
export function livePosts(today = todayEastern()) {
  return POSTS.filter((p) => isLive(p, today));
}

export function getStaticPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

/** Remove the small inline markup used in post text: [text](/path) and **bold**. */
export function plainText(str = '') {
  return String(str)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}

/** Split a string into { type: 'text' | 'bold' | 'link', text, href } tokens. */
export function inlineTokens(str = '') {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(str))) {
    if (m.index > last) out.push({ type: 'text', text: str.slice(last, m.index) });
    if (m[1] !== undefined) out.push({ type: 'link', text: m[1], href: m[2] });
    else out.push({ type: 'bold', text: m[3] });
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push({ type: 'text', text: str.slice(last) });
  return out;
}

/** Every text block of a post body, in reading order (strings, list items, h3s). */
export function bodyTexts(post) {
  const out = [];
  for (const s of post.sections) {
    out.push(s.h);
    for (const b of s.body) {
      if (typeof b === 'string') out.push(b);
      else if (b.h3) out.push(b.h3);
      else if (b.ul) out.push(...b.ul);
      else if (b.ol) out.push(...b.ol);
    }
  }
  return out;
}

/** All visible words on the post page: answer, takeaways, body and FAQ. */
export function postWordCount(post) {
  const text = [
    post.answer,
    ...post.takeaways,
    ...bodyTexts(post),
    ...post.faq.flatMap((f) => [f.q, f.a]),
  ]
    .map(plainText)
    .join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Whole minutes at 200 words a minute, never below 1. */
export function readingMinutes(post) {
  return Math.max(1, Math.ceil(postWordCount(post) / 200));
}

/** 'November 25, 2026' from '2026-11-25' (no time zone drift). */
export function formatPostDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
