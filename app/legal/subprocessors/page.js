import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo.mjs';
import { SUBPROCESSORS } from '../subprocessors-data';

export const metadata = pageMetadata({
  title: 'Subprocessors — Zerbiq',
  description:
    'The companies Zerbiq uses to provide the service, what each does and what data it receives.',
  path: '/legal/subprocessors',
});

const linkStyle = { color: 'var(--color-primary)' };

export default function SubprocessorsPage() {
  return (
    <>
      <Navbar />

      <main>
      <section style={{ padding: '72px 24px 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '-0.04em',
              margin: '0 0 12px',
            }}
          >
            Subprocessors
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 14, marginBottom: 32 }}>
            Last updated: November 25, 2026
          </p>

          <div style={{ color: 'var(--color-white-60)', fontSize: 15, lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 16px' }}>
              These are the subprocessors Zerbiq LLC uses to provide the Service, as described in
              Section 6 of the{' '}
              <a href="/legal/dpa#subprocessors" style={linkStyle}>
                Data Processing Addendum
              </a>
              . Zerbiq has a written agreement with each one, and remains responsible for their
              work. Before adding or replacing a subprocessor, Zerbiq will update this list and
              email the account owner at least 30 days in advance.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '4px 0 24px' }}>
              {SUBPROCESSORS.map((s) => (
                <div
                  key={s.name}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-white-10)',
                    borderRadius: 10,
                    padding: '14px 16px',
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{s.name}</div>
                  <div>{s.purpose}</div>
                  <div>
                    <span style={{ color: '#fff' }}>Data: </span>
                    {s.data}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: 0 }}>
              Questions? Contact{' '}
              <a href="mailto:support@zerbiq.com" style={linkStyle}>
                support@zerbiq.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
}
