import { brandify } from '@/components/ZerbiqBrand';
import { PLAN_METADATA, WHITE_GLOVE_FEE, WHITE_GLOVE_DESCRIPTION } from '@/lib/planData';

// "White-Glove Onboarding" optional add-on box shown on /pricing, next to the
// Texting and Storage add-ons. Every number comes from lib/planData.js.
export default function WhiteGloveAddon() {
  return (
    <div
      id="white-glove"
      style={{
        maxWidth: 1200,
        margin: '32px auto 0',
        boxSizing: 'border-box',
        background: 'var(--color-raised)',
        border: '1px solid var(--color-white-10)',
        borderRadius: 12,
        padding: '24px',
      }}
    >
      <h2 style={{ fontWeight: 800, fontSize: 22, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
        White-Glove Onboarding (optional)
      </h2>
      <p style={{ margin: '0 0 20px', fontSize: 15, lineHeight: 1.7, color: 'var(--color-white-60)' }}>
        {brandify(`Want us to do the setup for you? White-Glove Onboarding is an optional, one-time add-on. ${WHITE_GLOVE_DESCRIPTION} It is never required: DIY spreadsheet import is included free on every plan.`)}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {PLAN_METADATA.map((p) => (
          <div
            key={p.name}
            style={{ border: '1px solid rgba(61,92,255,0.35)', borderRadius: 8, padding: '12px 14px', boxSizing: 'border-box' }}
          >
            <div style={{ fontSize: 13, color: 'var(--color-white-60)' }}>{p.name}</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>
              {WHITE_GLOVE_FEE[p.name] != null ? `$${WHITE_GLOVE_FEE[p.name]}` : 'Arranged with us'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-white-60)', lineHeight: 1.5 }}>
              {WHITE_GLOVE_FEE[p.name] != null ? 'One time' : 'Priced to fit your setup'}
            </div>
          </div>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--color-white-60)' }}>
        One-time price, added to any plan only if you want it.
      </p>
    </div>
  );
}
