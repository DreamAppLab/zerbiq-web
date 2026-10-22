import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { brandify } from '@/components/ZerbiqBrand';
import {
  TEXTING_EXPLAINER,
  TEXTING_PRICING_HREF,
  textingPriceSummary,
} from '@/lib/planData';

export const metadata = {
  title: 'How texting works — Zerbiq',
  description:
    'Why texting is billed on its own, what carrier verification needs, and why every business gets its own toll-free number.',
};

const linkStyle = { color: 'var(--color-primary)', fontWeight: 600 };
const bodyStyle = { color: 'var(--color-white-60)', fontSize: 15, lineHeight: 1.7, margin: '0 0 14px' };
const cardStyle = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-white-10)',
  borderRadius: 12,
  padding: '24px 22px',
  boxSizing: 'border-box',
};
const h2Style = { color: '#fff', fontWeight: 700, fontSize: 20, margin: '0 0 12px', lineHeight: 1.3 };

export default function TextingPage() {
  const { title, subtitle, intro, sections } = TEXTING_EXPLAINER;
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
            {title}
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 17, lineHeight: 1.7, margin: 0 }}>{subtitle}</p>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={cardStyle}>
            {intro.map((p) => (
              <p key={p} style={bodyStyle}>{brandify(p)}</p>
            ))}
            <p style={{ ...bodyStyle, color: '#fff', fontWeight: 600, margin: 0 }}>
              {textingPriceSummary()}{' '}
              <Link href={TEXTING_PRICING_HREF} style={linkStyle}>See texting prices</Link>
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.id} id={s.id} style={{ ...cardStyle, scrollMarginTop: 90 }}>
              <h2 style={h2Style}>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} style={bodyStyle}>{brandify(p)}</p>
              ))}
              {s.bullets && (
                <ul style={{ ...bodyStyle, paddingLeft: 20, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.bullets.map((b) => (
                    <li key={b} style={{ overflowWrap: 'anywhere' }}>{b}</li>
                  ))}
                </ul>
              )}
              {(s.after || []).map((p) => (
                <p key={p} style={bodyStyle}>{brandify(p)}</p>
              ))}
            </div>
          ))}

          <p style={{ ...bodyStyle, margin: 0, textAlign: 'center' }}>
            Questions? Visit our{' '}
            <Link href="/support" style={linkStyle}>support page</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
