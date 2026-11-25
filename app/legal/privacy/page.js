import LegalDocument from '@/components/LegalDocument';
import { TITLE, HTML } from './content';

export const metadata = {
  title: 'Privacy Policy — Zerbiq',
};

export default function PrivacyPage() {
  return <LegalDocument title={TITLE} html={HTML} pdfHref="/legal/Zerbiq-Privacy-Policy.pdf" />;
}
