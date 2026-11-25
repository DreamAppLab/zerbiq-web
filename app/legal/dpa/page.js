import LegalDocument from '@/components/LegalDocument';
import { pageMetadata } from '@/lib/seo.mjs';
import { TITLE, HTML } from './content';

export const metadata = pageMetadata({
  title: 'Data Processing Agreement — Zerbiq',
  description:
    'How Zerbiq processes personal data on your behalf: instructions, restrictions, security, subprocessors, incident notice and deletion.',
  path: '/legal/dpa',
});

export default function DpaPage() {
  return <LegalDocument title={TITLE} html={HTML} pdfHref="/legal/Zerbiq-Data-Processing-Addendum.pdf" />;
}
