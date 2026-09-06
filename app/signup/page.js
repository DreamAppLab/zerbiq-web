import ZIcon from '@/components/ZIcon';
import Link from 'next/link';

export const metadata = {
  title: 'Sign Up — Zerbiq',
  description: 'Start your free trial with Zerbiq.',
};

const DEMO_URL = 'https://calendly.com/zerbiq-demos/30min';

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
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          marginBottom: 32,
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

      <h1
        style={{
          fontWeight: 900,
          fontSize: 'clamp(32px, 5vw, 52px)',
          letterSpacing: '-0.04em',
          margin: '0 0 16px',
          lineHeight: 1.05,
        }}
      >
        Coming Soon
      </h1>

      <p
        style={{
          color: 'var(--color-white-60)',
          fontSize: 17,
          lineHeight: 1.7,
          maxWidth: 440,
          margin: '0 auto 36px',
        }}
      >
        Free trial signup is on the way. Book a demo to get early access.
      </p>

      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{
          display: 'inline-block',
          borderRadius: 10,
          padding: '16px 36px',
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        Book a Demo
      </a>
    </div>
  );
}
