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
            Last updated: October 28, 2026
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

            {/* New Oct 2026: sections 7 and 8. Section 7 updated Oct 26, 2026 to match the Intuit production review. Attorney review to follow. */}
            <div>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                7. QuickBooks Online (Intuit)
              </h2>
              <p style={{ margin: 0 }}>
                Zerbiq can connect to your QuickBooks Online company so your customers and services
                come over from QuickBooks and your invoices and payments match your books. The
                connection is optional. It is off until a company owner or
                administrator chooses to connect it, and if you never connect it, none of this
                applies to you.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                What we ask Intuit for
              </h3>
              <p style={{ margin: '0 0 12px' }}>
                Zerbiq asks for one permission only: Accounting. It does not ask for access to
                QuickBooks Payments, and it does not ask for your Intuit profile.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                What Zerbiq sends to QuickBooks
              </h3>
              <p style={{ margin: '0 0 12px' }}>
                Zerbiq sends your customers, invoices, payments, credit memos and refunds to your
                QuickBooks company. For a customer, that is the name, company, email, phone numbers,
                and billing and service addresses. For an invoice, it is the number, dates, line
                items (description, quantity, price, amount and service date) and tax. Payments,
                credit memos and refunds carry the amount, date and reference number. Zerbiq does
                not send job or invoice notes, costs, margins or technician pay.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                What Zerbiq brings in from QuickBooks
              </h3>
              <p style={{ margin: '0 0 12px' }}>
                When you connect, and again whenever something changes in QuickBooks, Zerbiq copies
                these records from your QuickBooks company into your Zerbiq account so you do not
                have to type them twice:
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Customers: the name, company, email, up to two phone numbers, and the billing and
                shipping addresses. A QuickBooks sub-customer (a job or location) becomes a service
                address on its customer. Inactive customers are skipped.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Items (products and services): the name, price, whether it is taxable, and its
                category. They become your services in Zerbiq.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Vendors: the company, contact name, email, phone number, billing address, account
                number and payment terms. They become your suppliers in Zerbiq.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Employees: the name, email, phone number and hire date only. Zerbiq does not bring in
                pay rates, Social Security numbers or bank details. People brought in this way start
                as inactive, with no sign-in and no permissions, until your company chooses a role
                for each one and activates them under Team.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Purchase orders: the number, dates, status, vendor, line items, amounts, tax and
                memo. They are shown in Zerbiq for reference and cannot be edited there.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Zerbiq checks what it brings in against what is already in your account (by email,
                or by name and address) and asks you before it merges anything it is not sure about.
                It does not overwrite a value you changed in Zerbiq, and it does not bring back a
                record you deleted in Zerbiq.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                What else Zerbiq reads from QuickBooks
              </h3>
              <p style={{ margin: '0 0 12px' }}>
                Zerbiq also reads your QuickBooks company name, your items (products and services),
                tax codes, payment methods, the bank account a refund is paid from, and a few
                preferences, such as automatic credit application and sales tax, so it can send
                records correctly. It looks up an existing customer, invoice or payment only when it
                needs to avoid creating a duplicate.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                How we protect it
              </h3>
              <p style={{ margin: '0 0 12px' }}>
                The sign-in tokens Intuit gives Zerbiq are encrypted with AES-256-GCM before they are
                saved. The encryption key is kept outside the database, and the tokens are never
                sent to your web browser. Records travel to Intuit over HTTPS. Only your
                company&apos;s owners and administrators can see or change the connection.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                How we use it
              </h3>
              <p style={{ margin: '0 0 12px' }}>
                We use the information in your QuickBooks connection only to run that connection for
                you. We do not sell it, and we do not use it for marketing.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                Disconnecting
              </h3>
              <p style={{ margin: '0 0 12px' }}>
                You can disconnect at any time. In Zerbiq, go to Settings → Integrations → QuickBooks
                and click Disconnect. Zerbiq asks Intuit to revoke its access, deletes the stored
                tokens (even if Intuit cannot be reached), and stops sending anything to QuickBooks.
                You can also disconnect from QuickBooks, on its Apps page. Zerbiq then can no longer
                use the connection, deletes the tokens the next time it tries, and shows
                &ldquo;Reconnect needed.&rdquo;
              </p>
              <p style={{ margin: '12px 0 0' }}>
                Records already in QuickBooks stay there, because they are part of your books, and
                records already brought into Zerbiq stay in your Zerbiq account. After
                you disconnect, Zerbiq keeps the list that matches your Zerbiq records to their
                QuickBooks records, and the sync log, so that reconnecting the same QuickBooks
                company does not create duplicates. Deleting your Zerbiq account deletes all of it.
              </p>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, margin: '20px 0 8px' }}>
                Questions
              </h3>
              <p style={{ margin: 0 }}>
                For privacy questions about the QuickBooks connection, write to{' '}
                <a href="mailto:support@zerbiq.com" style={{ color: 'var(--color-primary)' }}>
                  support@zerbiq.com
                </a>
                . QuickBooks and Intuit are trademarks of Intuit Inc. Intuit&apos;s handling of your
                QuickBooks data is covered by Intuit&apos;s own privacy statement.
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
                <a href="mailto:support@zerbiq.com" style={{ color: 'var(--color-primary)' }}>
                  support@zerbiq.com
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
                <a href="mailto:support@zerbiq.com" style={{ color: 'var(--color-primary)' }}>
                  support@zerbiq.com
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
