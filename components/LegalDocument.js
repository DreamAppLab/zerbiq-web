import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const css = `
.legal-doc { color: var(--color-white-60); font-size: 15px; line-height: 1.8; overflow-wrap: anywhere; }
.legal-doc p { margin: 0 0 14px; }
.legal-doc h2 { color: #fff; font-weight: 700; font-size: 18px; line-height: 1.4; margin: 36px 0 12px; }
.legal-doc h2 .num { margin-right: 8px; }
.legal-doc .art { margin-top: 12px; }
.legal-doc .art h2 { text-transform: uppercase; padding-top: 12px; border-top: 1px solid var(--color-white-10); }
.legal-doc .num { color: #fff; font-weight: 600; white-space: nowrap; }
.legal-doc .sec > p strong { color: #fff; font-weight: 600; }
.legal-doc .cl { padding-left: 20px; }
.legal-doc a { color: var(--color-primary); }
.legal-doc strong { color: #fff; font-weight: 600; }
@media (max-width: 640px) {
  .legal-doc { font-size: 14.5px; line-height: 1.75; }
  .legal-doc .cl { padding-left: 12px; }
}
`;

const linkStyle = { color: 'var(--color-primary)' };

export default function LegalDocument({ title, html, pdfHref }) {
  return (
    <>
      <Navbar />

      <main>
      <section style={{ padding: '72px 24px 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(26px, 4vw, 44px)',
              letterSpacing: '-0.04em',
              margin: '0 0 12px',
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 14, margin: '0 0 36px' }}>
            <a href={pdfHref} style={linkStyle} download>
              Download PDF
            </a>
          </p>

          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div className="legal-doc" dangerouslySetInnerHTML={{ __html: html }} />

          <p
            style={{
              marginTop: 48,
              paddingTop: 20,
              borderTop: '1px solid var(--color-white-10)',
              color: 'var(--color-white-60)',
              fontSize: 14,
            }}
          >
            Legal documents:{' '}
            <a href="/legal/tos" style={linkStyle}>Terms of Service</a>
            {' · '}
            <a href="/legal/privacy" style={linkStyle}>Privacy Policy</a>
            {' · '}
            <a href="/legal/dpa" style={linkStyle}>Data Processing Addendum</a>
            {' · '}
            <a href="/legal/subprocessors" style={linkStyle}>Subprocessors</a>
          </p>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
}
