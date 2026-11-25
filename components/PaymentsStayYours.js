import { brandify } from '@/components/ZerbiqBrand';
import { PAYMENTS_STAY_YOURS_TITLE, PAYMENTS_STAY_YOURS_TEXT } from '@/lib/planData';

// "Your payments stay yours" callout, shown on /pricing and /compare.
// The wording lives in lib/planData.js so both pages say the same thing.
export default function PaymentsStayYours({ maxWidth = 1200 }) {
  return (
    <div
      id="payments-stay-yours"
      style={{
        maxWidth,
        margin: '0 auto',
        boxSizing: 'border-box',
        background: 'rgba(61,92,255,0.08)',
        border: '1px solid rgba(61,92,255,0.35)',
        borderRadius: 12,
        padding: '20px 24px',
      }}
    >
      <h2 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
        {PAYMENTS_STAY_YOURS_TITLE}
      </h2>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
        {brandify(PAYMENTS_STAY_YOURS_TEXT)}
      </p>
    </div>
  );
}
