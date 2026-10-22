import Link from 'next/link';
import ZIcon from './ZIcon';
import ZerbiqBrand from '@/components/ZerbiqBrand';
import { SIGN_IN_HREF, SUPPORT_EMAIL, activeStoreLinks } from '@/lib/siteConfig.mjs';

export default function Footer() {
  const storeLinks = activeStoreLinks();
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
                <ZerbiqBrand />
              </span>
            </Link>
            <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: 0 }}>
              Built for the field. Loved by the office.
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
            <Link href="/about" className="link-muted" style={{ fontSize: 14, fontWeight: 500 }}>
              About
            </Link>
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
              href={SIGN_IN_HREF}
              className="link-muted"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              Sign in
            </a>
            {/* Hidden until a store link is set in lib/siteConfig.mjs */}
            {storeLinks.length > 0 && (
              <span
                style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '12px 16px', alignItems: 'center' }}
              >
                <span style={{ color: 'var(--color-white-60)', fontSize: 14, fontWeight: 500 }}>
                  Get the app:
                </span>
                {storeLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-muted"
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    {s.label}
                  </a>
                ))}
              </span>
            )}
            <Link href="/support" className="link-muted" style={{ fontSize: 14, fontWeight: 500 }}>
              Support
            </Link>
            <Link href="/contact" className="link-muted" style={{ fontSize: 14, fontWeight: 500 }}>
              Contact
            </Link>
          </nav>

          {/* Contact email */}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="link-muted"
            style={{ fontSize: 14 }}
          >
            {SUPPORT_EMAIL}
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
            © 2026 <ZerbiqBrand />. All rights reserved.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
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
            <Link
              href="/legal/dpa"
              className="link-muted"
              style={{ fontSize: 13 }}
            >
              Data Processing Addendum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
