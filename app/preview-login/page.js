'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const COOKIE_NAME = 'zerbiq_preview_auth';
const CORRECT_TOKEN = 'zerbiq2026preview';

function ZIcon({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="72" height="72" rx="14" fill="#3D5CFF" />
      <path
        d="M18 20 L54 20 L24 52 L54 52"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function PreviewLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password === CORRECT_TOKEN) {
      // Set cookie — expires in 30 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      document.cookie = `${COOKIE_NAME}=${CORRECT_TOKEN}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
      router.push('/');
      router.refresh();
    } else {
      setError('Incorrect password.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ZIcon size={40} />
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '22px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            }}
          >
            ZERBIQ
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#111118',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <h1
            style={{
              margin: '0 0 4px',
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            Preview Access
          </h1>
          <p
            style={{
              margin: '0 0 28px',
              color: 'rgba(255,255,255,0.45)',
              fontSize: '14px',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
          >
            This site is in private preview.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '15px',
                padding: '13px 16px',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'rgba(61,92,255,0.6)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(255,255,255,0.12)')
              }
            />

            {error && (
              <p
                style={{
                  margin: '0',
                  color: '#FF4D4D',
                  fontSize: '13px',
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: loading ? '#2a3db5' : '#3D5CFF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                padding: '13px 16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
                transition: 'background-color 0.15s, opacity 0.15s',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#2a4aee';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = '#3D5CFF';
              }}
            >
              {loading ? 'Entering…' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
