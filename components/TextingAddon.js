import Link from 'next/link';
import { TEXTING_ADDON, TEXTING_NUMBER_PHRASE, TEXTING_REVIEW_TIME, TEXTING_OFF_ON_TITLE, TEXTING_EXPLAINER_HREF, TEXTING_EXPLAINER_LINK_LABEL } from '@/lib/planData';

// "Texting add-on" box shown under the plan cards on the pricing page.
// All prices come from TEXTING_ADDON in lib/planData.js.
export default function TextingAddon() {
  const { setupFee, blocks } = TEXTING_ADDON;

  const facts = [
    {
      title: 'Why it’s an add-on',
      body: 'Carriers charge for every text and every number. So texting is billed on its own, and no plan price includes it.',
    },
    {
      title: `$${setupFee} one-time setup`,
      body: 'This registers your business with the phone carriers.',
    },
    {
      title: 'Your own toll-free number',
      body: `Texts come from your business’s own ${TEXTING_NUMBER_PHRASE}, verified under your business name. ${TEXTING_REVIEW_TIME} Until then, messages go by email.`,
    },
    {
      title: 'When texts run out',
      body: 'Texting pauses and messages go by email until you buy more. Nothing is sent that you did not pay for.',
    },
    {
      title: TEXTING_OFF_ON_TITLE,
      body: `Turning texting off releases your toll-free number, and it can’t be recovered. Turning it back on means the $${setupFee} setup again, a new toll-free number, and carrier approval again. Unused texts you bought stay on your account.`,
    },
    {
      title: 'Without texting',
      body: 'Every plan still sends appointment reminders, on-the-way notices, invoices and review requests by email.',
    },
  ];

  return (
    <div
      id="texting-addon"
      style={{
        maxWidth: 1200,
        margin: '40px auto 0',
        background: 'rgba(61,92,255,0.08)',
        border: '1px solid rgba(61,92,255,0.35)',
        borderRadius: 12,
        padding: '28px 24px',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .texting-blocks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 0 0 24px; }
        .texting-facts  { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        @media (max-width: 900px) {
          .texting-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 600px) {
          .texting-blocks, .texting-facts { grid-template-columns: 1fr; }
        }
      `}</style>

      <h2 style={{ fontWeight: 900, fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.03em', margin: '0 0 8px', lineHeight: 1.2 }}>
        Texting add-on <span style={{ color: 'var(--color-white-60)', fontWeight: 600, fontSize: '0.6em', letterSpacing: 0 }}>optional for every plan</span>
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.65, margin: '0 0 20px' }}>
        Every plan sends reminders, on-the-way notices, invoices and review requests by email. Want them
        by text too? Add texting. You pay a ${setupFee} one-time setup, then buy prepaid text blocks.
      </p>

      <div className="texting-blocks">
        {blocks.map((b) => (
          <div
            key={b.texts}
            style={{ background: 'var(--color-raised)', border: '1px solid var(--color-white-10)', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}
          >
            <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em' }}>${b.price}</div>
            <div style={{ color: 'var(--color-white-60)', fontSize: 13, marginTop: 2 }}>
              {b.texts.toLocaleString('en-US')} texts
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--color-white-60)', fontSize: 13, lineHeight: 1.6, margin: '-8px 0 24px' }}>
        Block texts never expire. A long text, or one with emoji, can count as 2 or more texts.
      </p>

      <div className="texting-facts">
        {facts.map((f) => (
          <div key={f.title} style={{ background: 'var(--color-raised)', border: '1px solid var(--color-white-10)', borderRadius: 8, padding: '14px 16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 6px', lineHeight: 1.35 }}>{f.title}</h3>
            <p style={{ color: 'var(--color-white-60)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{f.body}</p>
          </div>
        ))}
      </div>

      <p style={{ margin: '20px 0 0', fontSize: 15 }}>
        <Link href={TEXTING_EXPLAINER_HREF} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          {TEXTING_EXPLAINER_LINK_LABEL}
        </Link>
      </p>
    </div>
  );
}
