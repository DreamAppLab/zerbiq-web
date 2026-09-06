import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — Zerbiq',
};

// <!-- Replace with final Privacy Policy from legal review -->
export default function PrivacyPage() {
  return (
    <>
      <Navbar />

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
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 14, marginBottom: 48 }}>
            Last updated: September 5, 2026
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 36,
              color: 'var(--color-white-60)',
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                1. Information We Collect
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq collects information you provide directly when you create an account,
                including your name, email address, business name, and billing information. We also
                collect data you enter into the Service, such as customer records, job details,
                invoices, and crew information. We may automatically collect usage data such as
                browser type, IP address, and pages visited.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                2. How We Use Your Information
              </h2>
              <p style={{ margin: 0 }}>
                We use the information we collect to: (a) provide and improve the Zerbiq platform;
                (b) process payments and manage your subscription; (c) send you service-related
                communications; (d) respond to your support requests; and (e) comply with legal
                obligations. We do not sell your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                3. Data Storage and Security
              </h2>
              <p style={{ margin: 0 }}>
                Your data is stored on secure servers in the United States. Zerbiq uses
                industry-standard encryption (TLS/SSL) for data in transit and AES-256 encryption
                for data at rest. We implement access controls to limit who can access your data
                within Zerbiq. While we take security seriously, no system is 100% secure.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                4. Your Data Rights
              </h2>
              <p style={{ margin: 0 }}>
                You have the right to access, correct, or delete your personal data at any time.
                You may export your customer and job data through the Zerbiq dashboard. To request
                data deletion or a full export, contact us at{' '}
                <a href="mailto:support@zerbiq.com" style={{ color: 'var(--color-primary)' }}>
                  support@zerbiq.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                5. Cookies
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq uses essential cookies required for authentication and platform functionality.
                We do not use tracking or advertising cookies. You may disable cookies in your
                browser settings, but some features of the Service may not function correctly without
                them.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                6. Third-Party Services
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq uses third-party services to operate the platform, including payment
                processors and cloud infrastructure providers. These parties have access to your data
                only as necessary to perform their services and are obligated to maintain
                confidentiality.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                7. Data Retention
              </h2>
              <p style={{ margin: 0 }}>
                We retain your data for as long as your account is active. If you cancel your
                subscription or your trial expires, your data is retained for 30 days before
                deletion. Archived customers and their records are retained indefinitely while your
                account is active.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                8. Children&apos;s Privacy
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq is not directed at children under 13. We do not knowingly collect personal
                information from children. If you believe we have collected information from a child,
                contact us immediately at{' '}
                <a href="mailto:hello@zerbiq.com" style={{ color: 'var(--color-primary)' }}>
                  hello@zerbiq.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                9. Changes to This Policy
              </h2>
              <p style={{ margin: 0 }}>
                We may update this Privacy Policy from time to time. We will notify you of material
                changes by email or through the Service. Continued use after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                10. Contact
              </h2>
              <p style={{ margin: 0 }}>
                For privacy questions or requests, contact us at{' '}
                <a href="mailto:hello@zerbiq.com" style={{ color: 'var(--color-primary)' }}>
                  hello@zerbiq.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
