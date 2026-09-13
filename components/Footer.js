import Link from 'next/link';
import ZIcon from './ZIcon';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-white-10)',
        padding: '48px 24px 32px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* Logo + tagline */}
          <div>
            <Link
              href="/"
              className="link-muted"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <ZIcon size={28} />
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 18,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                }}
              >
                ZERBI<span style={{ color: 'var(--color-primary)' }}>Q</span>
              </span>
            </Link>
            <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: 0 }}>
              Run every crew. Own every job.
            </p>
          </div>

          {/* Nav links */}
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 28px',
              alignItems: 'center',
            }}
          >
            <Link href="/features" className="link-muted" style={{ fontSize: 14, fontWeight: 500 }}>
              Features
            </Link>
            <Link href="/pricing" className="link-muted" style={{ fontSize: 14, fontWeight: 500 }}>
              Pricing
            </Link>
            <Link href="/compare" className="link-muted" style={{ fontSize: 14, fontWeight: 500 }}>
              Compare
            </Link>
            <Link href="/blog" className="link-muted" style={{ fontSize: 14, fontWeight: 500 }}>
              Blog
            </Link>
            <a
              href="https://app.zerbiq.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="link-muted"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              Login
            </a>
            <a
              href="mailto:hello@zerbiq.com"
              className="link-muted"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              Contact
            </a>
          </nav>

          {/* Contact email */}
          <a
            href="mailto:hello@zerbiq.com"
            className="link-muted"
            style={{ fontSize: 14 }}
          >
            hello@zerbiq.com
          </a>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-white-10)',
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: 'var(--color-white-60)', fontSize: 13, margin: 0 }}>
            © 2026 Zerbiq. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link
              href="/legal/tos"
              className="link-muted"
              style={{ fontSize: 13 }}
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy"
              className="link-muted"
              style={{ fontSize: 13 }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
