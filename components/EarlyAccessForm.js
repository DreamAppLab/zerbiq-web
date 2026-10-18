'use client';

import { useState } from 'react';
import {
  EARLY_ACCESS_EMAIL,
  EARLY_ACCESS_PLANS,
  TEAM_SIZES,
  HONEYPOT_FIELD,
  THANK_YOU,
  earlyAccessMailto,
} from '@/lib/earlyAccess.mjs';

const INDUSTRY_SUGGESTIONS = [
  'Lawn care', 'Landscaping', 'Pest control', 'Pool service', 'Cleaning',
  'HVAC', 'Plumbing', 'Electrical', 'Irrigation', 'Snow removal',
];

const FAILURE_MESSAGES = {
  rate_limited: 'We have had several requests from your connection in the last hour.',
  not_configured: 'Our form cannot send requests just yet.',
};

const inputStyle = {
  width: '100%',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-white-10)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 16,
  padding: '12px 14px',
  fontFamily: 'inherit',
};

function Field({ label, htmlFor, optional, children, wide }) {
  return (
    <div className={wide ? 'ea-wide' : undefined} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
      <label htmlFor={htmlFor} style={{ fontSize: 14, fontWeight: 600 }}>
        {label}
        {optional && <span style={{ color: 'var(--color-white-60)', fontWeight: 400 }}> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export default function EarlyAccessForm({ initialPlan }) {
  const [values, setValues] = useState({
    name: '', company: '', email: '', phone: '', industry: '', teamSize: '',
    plan: initialPlan, message: '', [HONEYPOT_FIELD]: '',
  });
  // idle | sending | sent | failed
  const [status, setStatus] = useState('idle');
  const [failure, setFailure] = useState({ reason: '', field: '' });

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    let reason = 'send_failed';
    let field = '';
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (res.status === 400) {
        reason = body.error || 'Please check the form.';
        field = body.field || '';
      } else {
        reason = body.error || reason;
      }
    } catch {
      // network failure: fall through to the email fallback
    }
    setFailure({ reason, field });
    setStatus('failed');
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        style={{
          background: 'rgba(61,92,255,0.12)',
          border: '1px solid rgba(61,92,255,0.4)',
          borderRadius: 12,
          padding: '32px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>{THANK_YOU}</p>
      </div>
    );
  }

  const invalidField = status === 'failed' && failure.field ? failure.field : '';
  const sendFailed = status === 'failed' && !failure.field;

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: 'var(--color-raised)',
        border: '1px solid var(--color-white-10)',
        borderRadius: 12,
        padding: 'clamp(20px, 4vw, 32px)',
      }}
    >
      <style>{`
        .ea-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .ea-wide { grid-column: 1 / -1; }
        @media (max-width: 640px) { .ea-grid { grid-template-columns: minmax(0, 1fr); } }
        .ea-form input:focus, .ea-form select:focus, .ea-form textarea:focus {
          outline: 2px solid var(--color-primary); outline-offset: 1px;
        }
        .ea-hp { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
      `}</style>

      <div className="ea-grid ea-form">
        <Field label="Name" htmlFor="ea-name">
          <input id="ea-name" name="name" autoComplete="name" required maxLength={120}
            value={values.name} onChange={set('name')} style={inputStyle} aria-invalid={invalidField === 'name'} />
        </Field>
        <Field label="Company" htmlFor="ea-company">
          <input id="ea-company" name="company" autoComplete="organization" required maxLength={160}
            value={values.company} onChange={set('company')} style={inputStyle} aria-invalid={invalidField === 'company'} />
        </Field>
        <Field label="Email" htmlFor="ea-email">
          <input id="ea-email" name="email" type="email" autoComplete="email" required maxLength={254}
            value={values.email} onChange={set('email')} style={inputStyle} aria-invalid={invalidField === 'email'} />
        </Field>
        <Field label="Phone" htmlFor="ea-phone">
          <input id="ea-phone" name="phone" type="tel" autoComplete="tel" required maxLength={40}
            value={values.phone} onChange={set('phone')} style={inputStyle} aria-invalid={invalidField === 'phone'} />
        </Field>
        <Field label="Industry" htmlFor="ea-industry">
          <input id="ea-industry" name="industry" list="ea-industries" required maxLength={120}
            placeholder="e.g. Lawn care"
            value={values.industry} onChange={set('industry')} style={inputStyle} aria-invalid={invalidField === 'industry'} />
          <datalist id="ea-industries">
            {INDUSTRY_SUGGESTIONS.map((i) => <option key={i} value={i} />)}
          </datalist>
        </Field>
        <Field label="Team size" htmlFor="ea-team">
          <select id="ea-team" name="teamSize" required value={values.teamSize} onChange={set('teamSize')}
            style={inputStyle} aria-invalid={invalidField === 'teamSize'}>
            <option value="" disabled>Choose…</option>
            {TEAM_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Plan you're interested in" htmlFor="ea-plan" wide>
          <select id="ea-plan" name="plan" required value={values.plan} onChange={set('plan')}
            style={inputStyle} aria-invalid={invalidField === 'plan'}>
            {EARLY_ACCESS_PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Message" htmlFor="ea-message" optional wide>
          <textarea id="ea-message" name="message" rows={4} maxLength={2000}
            value={values.message} onChange={set('message')} style={{ ...inputStyle, resize: 'vertical' }} />
        </Field>

        {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
        <div className="ea-hp" aria-hidden="true">
          <label htmlFor="ea-website">Website</label>
          <input id="ea-website" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off"
            value={values[HONEYPOT_FIELD]} onChange={set(HONEYPOT_FIELD)} />
        </div>
      </div>

      {invalidField && (
        <p role="alert" style={{ color: '#fca5a5', fontSize: 14, margin: '18px 0 0' }}>{failure.reason}</p>
      )}

      {sendFailed && (
        <div
          role="alert"
          style={{
            margin: '20px 0 0',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.35)',
            borderRadius: 8,
            padding: '14px 16px',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: '0 0 8px' }}>
            {FAILURE_MESSAGES[failure.reason] || 'Your request did not go through.'}{' '}
            Please email us at{' '}
            <a href={`mailto:${EARLY_ACCESS_EMAIL}`} style={{ color: '#fff', fontWeight: 700 }}>{EARLY_ACCESS_EMAIL}</a>
            {' '}and we&apos;ll be in touch within one business day.
          </p>
          <a href={earlyAccessMailto(values)} style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
            Open an email with your details filled in →
          </a>
        </div>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={status === 'sending'}
        style={{
          marginTop: 24,
          width: '100%',
          border: 'none',
          borderRadius: 10,
          padding: '15px 24px',
          fontWeight: 700,
          fontSize: 16,
          cursor: status === 'sending' ? 'wait' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        {status === 'sending' ? 'Sending…' : 'Request Early Access'}
      </button>
    </form>
  );
}
