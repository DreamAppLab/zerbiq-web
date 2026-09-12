/**
 * Admin Blog page — loaded client-only (ssr: false) to prevent Firebase Auth
 * from trying to access browser APIs (localStorage, indexedDB) during the
 * Next.js build export phase, which causes the
 * "Export encountered errors on following paths: /admin/blog" error.
 */
import dynamic from 'next/dynamic';

const AdminBlogPage = dynamic(() => import('./_AdminBlogPage'), { ssr: false });

export default function Page() {
  return <AdminBlogPage />;
}
