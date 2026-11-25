import { ImageResponse } from 'next/og';
import { POSTS, getStaticPost } from '@/lib/blog/index.mjs';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

// A simple 1200x630 cover in the site palette, generated at build time: no stock photos.
export async function GET(_request, { params }) {
  const post = getStaticPost(params.slug);
  if (!post) return new Response('Not found', { status: 404 });
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0F',
          padding: 72,
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: '#3D5CFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            Z
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, display: 'flex' }}>Zerbiq Blog</div>
          <div style={{ fontSize: 24, color: '#3D5CFF', marginLeft: 12, display: 'flex' }}>
            {post.category}
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, display: 'flex' }}>
          {post.title}
        </div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)', display: 'flex' }}>
          zerbiq.com/blog
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
