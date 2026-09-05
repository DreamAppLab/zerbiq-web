'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ZIcon from './ZIcon';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .nav-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #ffffff; }

        .nav-cta {
          background: var(--color-primary);
          color: #fff;
          border-radius: 8px;
          padding: 10px 20px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.88; }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #fff;
        }

        .mobile-nav-link {
          color: #fff;
          text-decoration: none;
          font-size: 28px;
          font-weight: 700;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: block;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'rgba(10,10,15,0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <nav
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <ZIcon size={32} />
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: '-0.02em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              ZERBI<span style={{ color: 'var(--color-primary)' }}>Q</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
            <a
              href="https://app.zerbiq.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Login
            </a>
            <Link href="/signup" className="nav-cta">
              Start Free Trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 8h16M4 12h16M4 16h16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '100px 32px 40px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://app.zerbiq.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </a>
          <div style={{ marginTop: 32 }}>
            <Link
              href="/signup"
              className="nav-cta"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'inline-block', padding: '14px 28px', fontSize: 16 }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
