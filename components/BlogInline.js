import Link from 'next/link';
import { inlineTokens } from '@/lib/blog/index.mjs';

/** Renders post text with [text](/path) links and **bold**. Internal links use next/link. */
export default function BlogInline({ text }) {
  return inlineTokens(text).map((t, i) => {
    if (t.type === 'bold') return <strong key={i}>{t.text}</strong>;
    if (t.type === 'link') {
      return t.href.startsWith('/') ? (
        <Link key={i} href={t.href}>
          {t.text}
        </Link>
      ) : (
        <a key={i} href={t.href} rel="noopener">
          {t.text}
        </a>
      );
    }
    return t.text;
  });
}
