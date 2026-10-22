import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service — Zerbiq',
};

// <!-- Replace with final TOS from legal review -->
export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 14, marginBottom: 48 }}>
            Last updated: October 18, 2026
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
                1. Acceptance of Terms
              </h2>
              <p style={{ margin: 0 }}>
                By accessing or using the Zerbiq platform (&quot;Service&quot;), you agree to be
                bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these
                Terms, do not use the Service. Zerbiq reserves the right to update these Terms at
                any time. Continued use of the Service after changes constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                2. Use of Service
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq grants you a limited, non-exclusive, non-transferable license to access and
                use the Service for your internal business operations. You agree not to resell,
                sublicense, or exploit the Service for any commercial purpose other than your own
                field service business. You are responsible for all activity that occurs under your
                account.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                3. Accounts and Security
              </h2>
              <p style={{ margin: 0 }}>
                You must provide accurate and complete information when creating an account. You are
                responsible for maintaining the confidentiality of your credentials and for all
                activities under your account. Notify Zerbiq immediately at{' '}
                <a href="mailto:support@zerbiq.com" style={{ color: 'var(--color-primary)' }}>
                  support@zerbiq.com
                </a>{' '}
                if you suspect unauthorized access.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                4. Subscription and Billing
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq offers subscription plans billed monthly or annually. Your subscription
                automatically renews at the end of each billing period unless cancelled. You may
                cancel at any time. No refunds are issued for partial billing periods. Zerbiq
                reserves the right to change pricing with 30 days&apos; notice.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                5. Data and Privacy
              </h2>
              <p style={{ margin: 0 }}>
                Your use of the Service is also governed by our{' '}
                <a href="/legal/privacy" style={{ color: 'var(--color-primary)' }}>
                  Privacy Policy
                </a>
                . You retain ownership of all data you upload to Zerbiq. By using the Service, you
                grant Zerbiq the right to process your data to provide the Service.
              </p>
              <p style={{ margin: '12px 0 0' }}>
                Our{' '}
                <a href="/legal/dpa" style={{ color: 'var(--color-primary)' }}>
                  Data Processing Addendum
                </a>{' '}
                is part of these Terms. It covers the personal information about your customers,
                leads, and team members that you keep in Zerbiq: Zerbiq acts only on your
                instructions, uses that information only to provide the Service, never sells it or
                uses it for its own purposes, keeps it confidential and secure, uses only the
                subprocessors listed there, helps you with your customers&apos; privacy requests,
                tells you without undue delay about a security incident, and deletes or returns the
                information when your account ends.
              </p>
            </div>

            {/* New Oct 2026: sections 6 and 7. Attorney review to follow. */}
            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                6. QuickBooks Online Connection
              </h2>
              <p style={{ margin: 0 }}>
                Connecting a QuickBooks Online account to Zerbiq is optional. By connecting it, you
                authorize Zerbiq to exchange data with that QuickBooks account as described in our{' '}
                <a href="/legal/privacy" style={{ color: 'var(--color-primary)' }}>
                  Privacy Policy
                </a>
                . You can disconnect QuickBooks at any time. Intuit&apos;s own terms also apply to your
                QuickBooks account.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                7. Labor and Pay Information
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq lets you record pay rates and the amounts your team earns so you can understand
                labor costs and job profitability. Zerbiq is not a payroll provider, employer of record,
                or tax or legal adviser. You are solely responsible for paying your workers correctly and
                for complying with all wage, hour, tax and withholding laws that apply to you.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                8. Prohibited Uses
              </h2>
              <p style={{ margin: 0 }}>
                You agree not to use the Service to: (a) violate any applicable law; (b) transmit
                spam or harmful content; (c) reverse engineer or attempt to extract source code; (d)
                interfere with or disrupt the Service; or (e) use the Service to compete with
                Zerbiq.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                9. Limitation of Liability
              </h2>
              <p style={{ margin: 0 }}>
                To the maximum extent permitted by law, Zerbiq shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your
                use of the Service. Zerbiq&apos;s total liability to you shall not exceed the amount
                you paid in the 12 months preceding the claim.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                10. Termination
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq may suspend or terminate your account at any time for violation of these
                Terms. You may terminate your account at any time. Upon termination, your right to
                use the Service ceases. Data may be retained for up to 30 days after termination.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                11. Contact
              </h2>
              <p style={{ margin: 0 }}>
                For questions about these Terms, contact us at{' '}
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
