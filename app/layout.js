// Inter served from our own domain (no request to Google). A fixed family name, so
// a cached server build can never point at a font class the CSS no longer has.
import '@fontsource-variable/inter';
import './globals.css';
import HeroBackground from '@/components/HeroBackground';

export const metadata = {
  title: 'Zerbiq — Built for the field. Loved by the office.',
  description:
    'Zerbiq is the field service operations platform for owner-operators. Schedule jobs, dispatch crews, invoice customers, and manage your whole operation from one screen.',
  openGraph: {
    title: 'Zerbiq — Built for the field. Loved by the office.',
    description:
      'Zerbiq is the field service operations platform for owner-operators. Schedule jobs, dispatch crews, invoice customers, and manage your whole operation from one screen.',
    images: [{ url: '/og-image.png' }], // <!-- Replace with real OG image -->
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 72 72'%3E%3Crect width='72' height='72' rx='14' fill='%233D5CFF'/%3E%3Cpath d='M18 20 L54 20 L24 52 L54 52' stroke='white' stroke-width='6' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Fixed full-viewport route animation — sits behind all page content */}
        <HeroBackground />
        {children}
      </body>
    </html>
  );
}
