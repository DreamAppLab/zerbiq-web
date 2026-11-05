import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Data Processing Addendum — Zerbiq',
};

const h2Style = { color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 12 };
const linkStyle = { color: 'var(--color-primary)' };

// Built from the services the app (app.zerbiq.com) actually calls, October 2026.
// Keep in step with the Privacy Policy's "Cookies and Similar Technologies" section.
const SUBPROCESSORS = [
  {
    name: 'Vercel, Inc.',
    purpose: 'Hosts the Zerbiq app and runs its servers.',
    data: 'All Client Customer Data passes through it while the app is in use; standard server logs.',
  },
  {
    name: 'Supabase, Inc.',
    purpose: 'Main database, user sign-in, and file storage.',
    data: 'All Client Customer Data, including photos, receipts, and documents you upload.',
  },
  {
    name: 'Upstash, Inc.',
    purpose: 'Short-term cache and abuse protection (rate limits).',
    data: 'Temporary copies of records shown in the app, kept for up to 24 hours.',
  },
  {
    name: 'Telnyx LLC',
    purpose: 'Sends and receives text messages (SMS).',
    data: 'Phone numbers and message text.',
  },
  {
    name: 'Mailgun Technologies, Inc.',
    purpose: 'Sends email, such as invoices, quotes, reminders, and sign-in codes.',
    data: 'Email addresses, names, and message content.',
  },
  {
    name: 'Stripe, Inc.',
    purpose: 'Processes card and bank payments and pays out to the Client.',
    data: 'Payment amounts, invoice details, customer email, and the payment details a payer enters on Stripe.',
  },
  {
    name: 'Google LLC (Google Maps Platform)',
    purpose: 'Address lookup, address suggestions, and map coordinates for routing.',
    data: 'Service and mailing addresses, and address search text.',
  },
  {
    name: 'Google LLC (Google Calendar)',
    purpose: 'Adds jobs to a connected Google Calendar. Only if the Client connects Google Calendar.',
    data: 'Job time, customer name, services, job notes, and assigned team member.',
  },
  {
    name: 'Anthropic, PBC',
    purpose: 'Reads uploaded bank statements to list their transactions. Only when the Client uses bank statement import.',
    data: 'The bank statement the Client uploads.',
  },
  {
    name: 'Intuit Inc. (QuickBooks Online)',
    purpose: 'Keeps the Client’s QuickBooks Online company in step with Zerbiq. Only if the Client connects QuickBooks Online.',
    data: 'Customer names and contact details, billing addresses, invoices, and payments.',
  },
  {
    name: 'OpenWeather Ltd (OpenWeatherMap)',
    purpose: 'Weather forecast shown in the app.',
    data: 'The Client’s business ZIP code only. No customer information.',
  },
];

function Section({ title, children }) {
  return (
    <div>
      <h2 style={h2Style}>{title}</h2>
      {children}
    </div>
  );
}

function P({ last, children }) {
  return <p style={{ margin: last ? 0 : '0 0 12px' }}>{children}</p>;
}

// <!-- Draft for attorney review -->
export default function DpaPage() {
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
            Data Processing Addendum
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
            <Section title="1. About This Addendum">
              <P>
                This Data Processing Addendum (&quot;DPA&quot;) is part of the Zerbiq{' '}
                <a href="/legal/tos" style={linkStyle}>
                  Terms of Service
                </a>
                . It applies to every business that has a Zerbiq account (the &quot;Client&quot;).
              </P>
              <P>
                &quot;Client Customer Data&quot; means personal information about the Client&apos;s
                customers, leads, and team members that the Client puts into Zerbiq, or that Zerbiq
                collects for the Client. This includes information collected through the
                Client&apos;s customer portal, quote and invoice pages, lead forms, and text messages.
              </P>
              <P last>
                For Client Customer Data, the Client decides how and why it is used. Zerbiq acts
                only as the Client&apos;s service provider (sometimes called a processor). Where this
                DPA and the Terms of Service disagree about Client Customer Data, this DPA controls.
              </P>
            </Section>

            <Section title="2. Zerbiq Acts Only on the Client's Instructions">
              <P last>
                Zerbiq handles Client Customer Data only on the Client&apos;s instructions. Those
                instructions are the Terms of Service, this DPA, and the settings and actions the
                Client and its users choose in Zerbiq. If Zerbiq believes an instruction breaks the
                law, it will tell the Client.
              </P>
            </Section>

            <Section title="3. What Zerbiq Will Never Do">
              <P>
                Zerbiq uses Client Customer Data only to provide the Service to the Client. Zerbiq
                will not:
              </P>
              <ul style={{ margin: '0 0 12px', paddingLeft: 20, listStyleType: 'disc' }}>
                <li>sell Client Customer Data, or share it for targeted (cross-context behavioral) advertising;</li>
                <li>use it for Zerbiq&apos;s own purposes, such as marketing or building profiles;</li>
                <li>keep, use, or disclose it for any purpose other than providing the Service, or outside its direct business relationship with the Client;</li>
                <li>combine it with personal information Zerbiq gets from other sources, except as needed to provide the Service and as the law allows.</li>
              </ul>
              <P last>
                Zerbiq understands these restrictions and will comply with them. It will follow the
                California Consumer Privacy Act and other U.S. state privacy laws that apply to
                service providers, and give Client Customer Data the same level of protection those
                laws require. If Zerbiq can no longer meet these obligations, it will tell the
                Client, and the Client may take reasonable steps to stop and fix any unauthorized
                use.
              </P>
            </Section>

            <Section title="4. Confidentiality">
              <P last>
                Zerbiq keeps Client Customer Data confidential. Only people who need access to
                provide or support the Service get it, and they are bound to keep it confidential.
                When Zerbiq staff open a Client&apos;s account to give support, that access is logged.
              </P>
            </Section>

            <Section title="5. Security">
              <P last>
                Zerbiq protects Client Customer Data with reasonable technical and organizational
                measures suited to the data. These include encryption in transit (TLS), encryption at
                rest, access controls that keep each Client&apos;s data separate, and encrypted storage
                of the access tokens for connected services such as QuickBooks Online and Google
                Calendar.
              </P>
            </Section>

            <Section title="6. Subprocessors">
              <P>
                The Client authorizes Zerbiq to use the subprocessors listed below, and only them, to
                provide the Service. Zerbiq has a written agreement with each one that protects
                Client Customer Data at least as well as this DPA, and Zerbiq remains responsible for
                their work.
              </P>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '4px 0 16px' }}>
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
              <P last>
                Before adding or replacing a subprocessor, Zerbiq will update this list and email the
                account owner at least 30 days in advance. A Client that objects may end its
                subscription before the change takes effect.
              </P>
            </Section>

            <Section title="7. Helping with Customer Privacy Requests">
              <P last>
                Zerbiq lets the Client view, correct, export, and delete Client Customer Data in the
                app, and will help the Client answer requests from its customers and team members to
                access, correct, or delete their information. If one of the Client&apos;s customers
                contacts Zerbiq directly about such a request, Zerbiq will pass it to the Client and
                will not answer it except to point the person to the Client.
              </P>
            </Section>

            <Section title="8. Security Incidents">
              <P last>
                If Zerbiq becomes aware of unauthorized access to, or loss or disclosure of, Client
                Customer Data, it will notify the Client without undue delay. The notice will say
                what happened and what data was involved, as far as Zerbiq knows, and what Zerbiq is
                doing about it. Zerbiq will keep the Client updated and help the Client meet any
                notice duties it has to its customers or regulators.
              </P>
            </Section>

            <Section title="9. When the Account Ends">
              <P>
                While the account is open, the Client can export its data from the app at any time.
                When the account ends, the Client may also ask Zerbiq for a copy.
              </P>
              <P last>
                Zerbiq deletes Client Customer Data, including uploaded files, within 30 days after
                the account ends, unless the law requires Zerbiq to keep it. Copies in backups are
                deleted as those backups expire, and are kept secure until then.
              </P>
            </Section>

            <Section title="10. Information for the Client">
              <P last>
                On reasonable request, Zerbiq will give the Client the information it reasonably
                needs to confirm that Zerbiq is meeting this DPA.
              </P>
            </Section>

            <Section title="11. Contact">
              <P last>
                For questions about this DPA, contact us at{' '}
                <a href="mailto:hello@zerbiq.com" style={linkStyle}>
                  hello@zerbiq.com
                </a>
                .
              </P>
            </Section>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
