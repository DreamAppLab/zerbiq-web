import LegalDocument from '@/components/LegalDocument';
import { pageMetadata } from '@/lib/seo.mjs';
import { TITLE, HTML } from './content';

export const metadata = pageMetadata({
  title: 'Privacy Policy — Zerbiq',
  description:
    'How Zerbiq collects, uses and protects your information, including customer data, texting and the QuickBooks Online connection.',
  path: '/legal/privacy',
});

export default function PrivacyPage() {
  return <LegalDocument title={TITLE} html={HTML} pdfHref="/legal/Zerbiq-Privacy-Policy.pdf" />;
}
