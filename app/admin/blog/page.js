/**
 * Admin Blog page — loaded client-only (ssr: false) to prevent Firebase Auth
 * from trying to access browser APIs (localStorage, indexedDB) during the
 * Next.js build export phase, which causes the
 * "Export encountered errors on following paths: /admin/blog" error.
 */
import dynamic from 'next/dynamic';
import { firebaseConfigured } from '@/lib/firebaseConfig.mjs';

const AdminBlogPage = dynamic(() => import('./_AdminBlogPage'), { ssr: false });

export default function Page() {
  if (!firebaseConfigured) {
    return (
      <main style={{ maxWidth: 560, margin: '120px auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 12px' }}>Blog admin is not connected</h1>
        <p style={{ color: 'var(--color-white-60)', lineHeight: 1.6, margin: 0 }}>
          The Firebase settings for this site are missing, so admin posts cannot be loaded or saved.
          The file-based blog posts are not affected.
        </p>
      </main>
    );
  }
  return <AdminBlogPage />;
}
