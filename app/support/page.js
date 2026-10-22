import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { brandify } from '@/components/ZerbiqBrand';
import { EARLY_ACCESS_HREF } from '@/lib/planData';
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_ADDRESS_LINES,
  SUPPORT_RESPONSE_TIME,
  DELETE_ACCOUNT_HREF,
} from '@/lib/siteConfig.mjs';

export const metadata = {
  title: 'Support — Zerbiq',
  description:
    'Get help with Zerbiq. Email or call our support team, find answers to common questions about signing in, PINs, text messages and billing, and reach us by mail.',
};

const linkStyle = { color: 'var(--color-primary)' };

const FAQS = [
  {
    q: 'How do I sign in to the app?',
    a: (
      <>
        Technicians sign in with their company code, Employee ID and PIN. Customers sign in with a
        one-time link or code sent to them by the business they work with. Business owners and
        office staff sign in at{' '}
        <a href="https://app.zerbiq.com/login" style={linkStyle}>
          app.zerbiq.com
        </a>
        .
      </>
    ),
  },
  {
    q: 'How do I reset my PIN?',
    a: 'Ask your office or business owner. They can reset your PIN for you from the team settings.',
  },
  {
    q: 'How do I delete my account?',
    a: (
      <>
        You can request deletion on our{' '}
        <a href={DELETE_ACCOUNT_HREF} style={linkStyle}>
          account deletion page
        </a>
        . You can also email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={linkStyle}>
          {SUPPORT_EMAIL}
        </a>{' '}
        and we will help.
      </>
    ),
  },
  {
    q: 'How do I stop getting text messages?',
    a: 'Reply STOP to any text to stop texts from that business. Reply HELP for help. Message frequency varies, and message and data rates may apply.',
  },
  {
    q: 'I have a billing question. Who do I ask?',
    a: (
      <>
        Business owners can email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}?subject=Billing%20question`} style={linkStyle}>
          {SUPPORT_EMAIL}
        </a>{' '}
        with questions about their subscription or invoices. If you are a customer of a business that
        uses Zerbiq, please contact that business about your invoice.
      </>
    ),
  },
];

const h2Style = { color: '#fff', fontWeight: 700, fontSize: 20, margin: '0 0 12px' };
const cardStyle = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-white-10)',
  borderRadius: 12,
  padding: '20px 22px',
};

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <HeroBackground />

      <section style={{ padding: '80px 24px 40px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: '0 0 16px',
              color: '#fff',
            }}
          >
            Support
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            {brandify('Questions about Zerbiq? We are here to help.')} We usually reply{' '}
            {SUPPORT_RESPONSE_TIME}.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {/* Contact block */}
          <div>
            <h2 style={h2Style}>How to get help</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                color: 'var(--color-white-60)',
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              <div style={cardStyle}>
                <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>Email</div>
                <a href={`mailto:${SUPPORT_EMAIL}`} style={{ ...linkStyle, overflowWrap: 'anywhere' }}>
                  {SUPPORT_EMAIL}
                </a>
                <div style={{ fontSize: 13, marginTop: 4 }}>Reply {SUPPORT_RESPONSE_TIME}</div>
              </div>
              <div style={cardStyle}>
                <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>Phone</div>
                <a href={SUPPORT_PHONE_HREF} style={linkStyle}>
                  {SUPPORT_PHONE}
                </a>
                <div style={{ fontSize: 13, marginTop: 4 }}>Business phone</div>
              </div>
              <div style={cardStyle}>
                <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>Mail</div>
                <address style={{ fontStyle: 'normal' }}>
                  {SUPPORT_ADDRESS_LINES.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </address>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 style={h2Style}>Common questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQS.map((f) => (
                <div key={f.q} style={cardStyle}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 6px' }}>
                    {f.q}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--color-white-60)', fontSize: 15, lineHeight: 1.7 }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* App + legal + early access */}
          <div style={{ color: 'var(--color-white-60)', fontSize: 15, lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 12px' }}>
              The {brandify('Zerbiq')} mobile app is a free download for iPhone and Android.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              Read our{' '}
              <Link href="/legal/privacy" style={linkStyle}>
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/legal/tos" style={linkStyle}>
                Terms of Service
              </Link>
              .
            </p>
            <p style={{ margin: 0 }}>
              Thinking about {brandify('Zerbiq')} for your business?{' '}
              <a href={EARLY_ACCESS_HREF} style={linkStyle}>
                Request early access
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
