import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — Zerbiq',
};

const h3Style = { color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' };
const listStyle = { margin: '0 0 12px', paddingLeft: 20, listStyleType: 'disc' };

// What app.zerbiq.com keeps in the browser (from the C:\dev\zerbiq audit, Oct 2026).
const APP_STORAGE = [
  {
    what: 'Sign-in session (local storage, sb-…-auth-token)',
    why: 'Keeps you signed in to the app. Set by Supabase, our sign-in provider.',
    howLong: 'Kept until you sign out.',
  },
  {
    what: 'Customer portal sign-in (cookie, zq_portal)',
    why: 'Keeps a business\u2019s customer signed in to its customer portal. It holds a random code, not your details.',
    howLong: 'Lasts 30 days from your last visit, or until you sign out.',
  },
  {
    what: 'QuickBooks connection check (cookie, zq_qbo_oauth)',
    why: 'Set only while an owner or administrator connects QuickBooks Online, to confirm the approval came back to the same browser.',
    howLong: 'Lasts 10 minutes and is deleted when the connection finishes.',
  },
  {
    what: 'App settings and work in progress (local and session storage, zq:… keys)',
    why: 'Remembers things like team colors, dismissed notices, recent searches, and unsent form answers.',
    howLong: 'Cleared when you sign out.',
  },
  {
    what: 'Display preferences (local storage)',
    why: 'Remembers light or dark mode, which sidebar sections are open, and whether you have seen the \u201cinstall app\u201d prompt.',
    howLong: 'Kept on your device until you clear it.',
  },
  {
    what: 'Customer portal and quote pages (session storage)',
    why: 'Shows the business\u2019s name and logo, holds a one-time sign-in link until you use it, and notes that you viewed a quote.',
    howLong: 'Cleared when you close the tab.',
  },
  {
    what: 'Error recovery (session storage)',
    why: 'Notes the time the app reloaded itself after an update, so it does not reload twice.',
    howLong: 'Cleared when you close the tab.',
  },
];

// Companies the browser itself talks to in the app.
const APP_THIRD_PARTIES = [
  {
    who: 'Supabase',
    why: 'Handles sign-in and stores and delivers the photos and files you upload.',
  },
  {
    who: 'Stripe',
    why: 'When you pay an invoice or set up payouts, you go to a Stripe page. Stripe\u2019s own cookies and privacy policy apply there.',
  },
  {
    who: 'Google and Intuit',
    why: 'Only if a business chooses to connect Google Calendar or QuickBooks Online: you are sent to Google or Intuit to approve the connection.',
  },
  {
    who: 'ipify',
    why: 'When a customer approves a quote, the page asks this service for the device\u2019s public IP address.',
  },
];

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

            {/* Rewritten Oct 2026 from a cookie and tracker audit of zerbiq.com and app.zerbiq.com. */}
            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                5. Cookies and Similar Technologies
              </h2>
              <p style={{ margin: '0 0 12px', color: '#fff' }}>
                We do not sell or share your personal information. We do not use advertising
                cookies or tracking pixels.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                &quot;Cookies and similar technologies&quot; means small files and records a website
                keeps in your browser (cookies, local storage, and session storage), and requests a
                page makes to other companies&apos; servers. We use them only to run the Service. We do
                not use analytics, advertising, or social media tracking tools, and no other company
                can track you across websites through Zerbiq.
              </p>

              <h3 style={h3Style}>Our website (zerbiq.com)</h3>
              <p style={{ margin: '0 0 12px' }}>
                Our website sets no cookies and stores nothing in your browser. Our fonts are served
                from our own website, so your browser does not contact Google or any other company
                to show our pages. Our hosting provider, Vercel, keeps standard server logs (such as
                IP address, browser type, and the page requested) to deliver the site and keep it
                secure. If you send the early-access form, what you type is emailed to our team; it
                is not stored in your browser. A staff-only page used to publish our blog uses
                Google sign-in, which stores a sign-in record in that staff member&apos;s browser;
                visitors never load it.
              </p>

              <h3 style={h3Style}>The Zerbiq app (app.zerbiq.com)</h3>
              <p style={{ margin: '0 0 12px' }}>
                All of these are essential: the app needs them to sign you in, keep you signed in,
                and remember the choices you make in it.
              </p>
              <ul style={listStyle}>
                {APP_STORAGE.map((item) => (
                  <li key={item.what} style={{ marginBottom: 8 }}>
                    <span style={{ color: '#fff' }}>{item.what}.</span> {item.why} {item.howLong}
                  </li>
                ))}
              </ul>

              <h3 style={h3Style}>Other companies your browser may contact in the app</h3>
              <ul style={listStyle}>
                {APP_THIRD_PARTIES.map((item) => (
                  <li key={item.who} style={{ marginBottom: 8 }}>
                    <span style={{ color: '#fff' }}>{item.who}.</span> {item.why}
                  </li>
                ))}
              </ul>
              <p style={{ margin: '0 0 12px' }}>
                Links to Google Maps, Apple Maps, or a business&apos;s review page are ordinary links;
                nothing is sent to those sites unless you click one.
              </p>

              <h3 style={h3Style}>Your choices</h3>
              <p style={{ margin: '0 0 12px' }}>
                You can see, block, or delete cookies and stored data in your browser&apos;s settings.
                Signing out of the app clears your sign-in and most stored data on that device.
                Session storage is cleared when you close the tab. If you block cookies or storage
                for app.zerbiq.com, you will not be able to sign in. Because we use no optional
                cookies, there is no cookie banner and nothing to opt out of.
              </p>

              <h3 style={h3Style}>Global Privacy Control</h3>
              <p style={{ margin: 0 }}>
                If your browser sends a Global Privacy Control (GPC) signal, we treat it as a valid
                request to opt out of the sale or sharing of your personal information, for that
                browser and for any account we can link to it. Because we never sell or share
                personal information and use no optional cookies, nothing else needs to change, and
                the site works the same either way. If we ever add an optional technology, it will
                not run in a browser that sends GPC.
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
                confidentiality. The services that handle the data our business customers keep in
                Zerbiq are listed in our{' '}
                <a href="/legal/dpa" style={{ color: 'var(--color-primary)' }}>
                  Data Processing Addendum
                </a>
                .
              </p>
            </div>

            {/* New Oct 2026: sections 7 and 8. Attorney review to follow. */}
            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                7. QuickBooks Online
              </h2>
              <p style={{ margin: '0 0 12px' }}>
                Connecting QuickBooks Online is optional. Only a company&apos;s owner or an
                administrator can connect it, and they do so by signing in to Intuit and approving
                the connection.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Once connected, Zerbiq writes the company&apos;s customers, invoices, and payments into
                that company&apos;s QuickBooks account. Zerbiq reads from QuickBooks only what it needs
                to avoid creating duplicates, such as the list of products and services (items) and
                the QuickBooks record IDs that match Zerbiq records, along with the name of the
                connected QuickBooks company.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                The access tokens Intuit issues for the connection are stored encrypted and are never
                shown to anyone, including the company&apos;s own users. Disconnecting QuickBooks,
                which the company can do at any time, revokes Zerbiq&apos;s access at Intuit and deletes
                the stored tokens.
              </p>
              <p style={{ margin: 0 }}>
                Zerbiq never sells QuickBooks data and never shares it with third parties.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                8. Text Messages (SMS)
              </h2>
              <p style={{ margin: '0 0 12px' }}>
                Zerbiq sends text messages on behalf of the businesses that use Zerbiq, for example
                appointment reminders, &quot;on the way&quot; notices, and invoice links. Texts are sent
                only to people who have given consent to receive them.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Mobile phone numbers and SMS consent are never shared with or sold to third parties or
                affiliates for marketing purposes.
              </p>
              <p style={{ margin: 0 }}>
                Reply STOP to any message to opt out, or HELP for help. Message frequency varies.
                Message and data rates may apply.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                9. Data Retention
              </h2>
              <p style={{ margin: 0 }}>
                We retain your data for as long as your account is active. If you cancel your
                subscription, your data is retained for 30 days before
                deletion. Archived customers and their records are retained indefinitely while your
                account is active.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                10. Children&apos;s Privacy
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
                11. Changes to This Policy
              </h2>
              <p style={{ margin: 0 }}>
                We may update this Privacy Policy from time to time. We will notify you of material
                changes by email or through the Service. Continued use after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                12. Contact
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
