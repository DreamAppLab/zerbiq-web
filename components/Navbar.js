'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ZIcon from './ZIcon';

const COMPARE_ITEMS = [
  { label: 'Our Plans',             href: '/compare' },
  { label: 'Zerbiq vs Jobber',      href: '/vs/jobber' },
  { label: 'Zerbiq vs HouseCall Pro', href: '/vs/housecall-pro' },
];

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing',  href: '/pricing' },
  { label: 'Blog',     href: '/blog' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [compareOpen, setCompareOpen]   = useState(false);
  const compareRef                       = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close compare dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (compareRef.current && !compareRef.current.contains(e.target)) {
        setCompareOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

        .compare-dropdown {
          position: relative;
        }
        .compare-trigger {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.6);
          font-size: 15px;
          font-weight: 500;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0;
          transition: color 0.2s;
        }
        .compare-trigger:hover { color: #ffffff; }
        .compare-trigger.open  { color: #ffffff; }
        .compare-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10,10,15,0.97);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 6px;
          min-width: 220px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.6);
          z-index: 200;
          backdrop-filter: blur(16px);
        }
        .compare-item {
          display: block;
          padding: 9px 14px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 7px;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .compare-item:hover {
          background: rgba(61,92,255,0.12);
          color: #fff;
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
            {NAV_LINKS.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}

            {/* Pricing */}
            <Link href="/pricing" className="nav-link">Pricing</Link>

            {/* Compare dropdown */}
            <div className="compare-dropdown" ref={compareRef}>
              <button
                className={`compare-trigger${compareOpen ? ' open' : ''}`}
                onClick={() => setCompareOpen((o) => !o)}
                aria-expanded={compareOpen}
                aria-haspopup="true"
              >
                Compare
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: compareOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {compareOpen && (
                <div className="compare-menu" role="menu">
                  {COMPARE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="compare-item"
                      role="menuitem"
                      onClick={() => setCompareOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog */}
            <Link href="/blog" className="nav-link">Blog</Link>
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
          {['/', '/features', '/pricing'].map((href) => {
            const label = { '/': 'Home', '/features': 'Features', '/pricing': 'Pricing' }[href];
            return (
              <Link key={href} href={href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            );
          })}
          {COMPARE_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}
              style={{ fontSize: 20, paddingLeft: 12, color: 'rgba(255,255,255,0.7)' }}>
              {item.label}
            </Link>
          ))}
          <Link href="/blog" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
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
