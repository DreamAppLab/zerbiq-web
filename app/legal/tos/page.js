import LegalDocument from '@/components/LegalDocument';
import { pageMetadata } from '@/lib/seo.mjs';
import { TITLE, HTML } from './content';

export const metadata = pageMetadata({
  title: 'Terms of Service — Zerbiq',
  description:
    'The terms that apply when you use Zerbiq: accounts, billing, acceptable use, third-party integrations and labor and pay information.',
  path: '/legal/tos',
});

export default function TermsPage() {
  return <LegalDocument title={TITLE} html={HTML} pdfHref="/legal/Zerbiq-Terms-of-Service.pdf" />;
}
