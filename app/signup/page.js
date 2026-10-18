import ZIcon from '@/components/ZIcon';
import Link from 'next/link';
import { EARLY_ACCESS_MAILTO } from '@/lib/planData';

const DEMO_URL = 'https://calendly.com/zerbiq-demos/30min';

export const metadata = {
  title: 'Request Early Access — Zerbiq',
  description: 'Zerbiq is not open for public signup yet. Request early access or book a live demo.',
};

export default function SignupPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          marginBottom: 40,
        }}
      >
        <ZIcon size={48} />
        <span
          style={{
            fontWeight: 900,
            fontSize: 28,
            letterSpacing: '-0.03em',
            color: '#fff',
          }}
        >
          ZERBI<span style={{ color: 'var(--color-primary)' }}>Q</span>
        </span>
      </Link>

      {/* Heading */}
      <h1
        style={{
          fontWeight: 900,
          fontSize: 'clamp(32px, 5vw, 52px)',
          letterSpacing: '-0.04em',
          margin: '0 0 12px',
          lineHeight: 1.05,
        }}
      >
        Request Early Access
      </h1>

      {/* Early-access note */}
      <p
        style={{
          color: 'var(--color-white-60)',
          fontSize: 17,
          lineHeight: 1.6,
          margin: '0 auto 36px',
        }}
      >
        Zerbiq isn&apos;t open for public signup yet. Request early access and we&apos;ll be in touch.
      </p>

      {/* Primary CTA */}
      <a
        href={EARLY_ACCESS_MAILTO}
        className="btn-primary"
        style={{
          display: 'inline-block',
          borderRadius: 10,
          padding: '16px 40px',
          fontWeight: 700,
          fontSize: 17,
          textDecoration: 'none',
          marginBottom: 32,
        }}
      >
        Request Early Access
      </a>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          width: '100%',
          maxWidth: 360,
          marginBottom: 32,
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      </div>

      {/* Secondary CTA */}
      <p
        style={{
          color: 'var(--color-white-60)',
          fontSize: 15,
          margin: '0 0 14px',
          lineHeight: 1.6,
        }}
      >
        Prefer a walkthrough? Book a 30-minute live demo.
      </p>
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff',
          borderRadius: 10,
          padding: '14px 36px',
          fontWeight: 700,
          fontSize: 15,
          textDecoration: 'none',
          transition: 'border-color 0.2s',
        }}
      >
        Book a demo
      </a>
    </div>
  );
}
