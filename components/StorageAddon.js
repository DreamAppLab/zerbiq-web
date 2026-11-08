import { brandify } from '@/components/ZerbiqBrand';
import {
  PLAN_METADATA,
  STORAGE_PACKS,
  STORAGE_INCLUDED_GB,
  STORAGE_PACKS_SENTENCE,
  STORAGE_ASSUMPTION_NOTE,
  storageCapacityLabel,
  storageIncludedLabel,
} from '@/lib/planData';

// "Photo & video storage" box shown on /pricing: what each plan includes and
// the add-on packs. Every number comes from lib/planData.js.
export default function StorageAddon() {
  return (
    <div
      id="storage"
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
        Photo &amp; video storage
      </h2>
      <p style={{ margin: '0 0 20px', fontSize: 15, lineHeight: 1.7, color: 'var(--color-white-60)' }}>
        {brandify('Every plan includes storage for job photos and videos. If you need more, add a pack on any plan and stack as many as you like.')}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {PLAN_METADATA.map((p) => {
          const gb = STORAGE_INCLUDED_GB[p.name];
          return (
            <div
              key={p.name}
              style={{ border: '1px solid var(--color-white-10)', borderRadius: 8, padding: '12px 14px', boxSizing: 'border-box' }}
            >
              <div style={{ fontSize: 13, color: 'var(--color-white-60)' }}>{p.name}</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{storageIncludedLabel(p.name)}</div>
              <div style={{ fontSize: 12, color: 'var(--color-white-60)', lineHeight: 1.5 }}>
                {gb == null ? 'No storage limit' : storageCapacityLabel(gb)}
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 12px' }}>Storage packs (per month, any plan)</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {STORAGE_PACKS.map((pack) => (
          <div
            key={pack.label}
            style={{ border: '1px solid rgba(61,92,255,0.35)', borderRadius: 8, padding: '12px 14px', boxSizing: 'border-box' }}
          >
            <div style={{ fontSize: 20, fontWeight: 800 }}>
              {pack.label} <span style={{ fontSize: 15, fontWeight: 600 }}>${pack.monthlyPrice}/mo</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-white-60)', lineHeight: 1.5 }}>
              {storageCapacityLabel(pack.gb)}
            </div>
          </div>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--color-white-60)' }}>
        {STORAGE_PACKS_SENTENCE} {STORAGE_ASSUMPTION_NOTE}
      </p>
    </div>
  );
}
