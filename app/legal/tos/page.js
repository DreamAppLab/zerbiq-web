import LegalDocument from '@/components/LegalDocument';
import { TITLE, HTML } from './content';

export const metadata = {
  title: 'Terms of Service — Zerbiq',
};

export default function TermsPage() {
  return <LegalDocument title={TITLE} html={HTML} pdfHref="/legal/Zerbiq-Terms-of-Service.pdf" />;
}
