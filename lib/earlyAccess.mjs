// ─────────────────────────────────────────────────────────────────────────────
// lib/earlyAccess.mjs — "Request Early Access" leads.
//
// The form (/early-access) posts here through app/api/early-access/route.js.
// A request is sent by email to EARLY_ACCESS_EMAIL through Resend. It creates
// no account. Until the Resend variables are set the handler answers
// 'not_configured' and the form offers the pre-filled email instead.
//
// Environment variable NAMES (values are set in Vercel, never in the repo):
//   RESEND_API_KEY      Resend API key
//   EARLY_ACCESS_FROM   sender on a domain verified in Resend,
//                       e.g. "Zerbiq <no-reply@zerbiq.com>"
//
// Plain .mjs (no Next imports) so node --test can load the real code.
// ─────────────────────────────────────────────────────────────────────────────

/** Where every early-access request goes — the same address as the email links. */
export const EARLY_ACCESS_EMAIL = 'hello@zerbiq.com';

/** The form page. Every "Request Early Access" button links here. */
export const EARLY_ACCESS_PATH = '/early-access';

/** Plans a visitor can pick. "Not sure yet" is the default when no plan is given. */
export const EARLY_ACCESS_PLANS = ['Solo', 'Core', 'Field', 'Command', 'Enterprise', 'Not sure yet'];

export const TEAM_SIZES = ['Just me', '2–5', '6–10', '11–25', '26–50', '51+'];

/** The hidden field people never see. A submission that fills it is dropped silently. */
export const HONEYPOT_FIELD = 'website';

export const THANK_YOU = "Thanks, we'll be in touch within one business day.";

/** Form fields in display order. maxLength is enforced on the server too. */
export const FIELDS = [
  { name: 'name',     label: 'Name',      required: true,  maxLength: 120 },
  { name: 'company',  label: 'Company',   required: true,  maxLength: 160 },
  { name: 'email',    label: 'Email',     required: true,  maxLength: 254 },
  { name: 'phone',    label: 'Phone',     required: true,  maxLength: 40 },
  { name: 'industry', label: 'Industry',  required: true,  maxLength: 120 },
  { name: 'teamSize', label: 'Team size', required: true,  maxLength: 20 },
  { name: 'plan',     label: 'Plan',      required: true,  maxLength: 20 },
  { name: 'message',  label: 'Message',   required: false, maxLength: 2000 },
];

/** Per IP: at most `max` requests in `windowMs`. */
export const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The plan from a ?plan= value, or "Not sure yet". */
export function planFromQuery(value) {
  const v = String(value ?? '').trim().toLowerCase();
  return EARLY_ACCESS_PLANS.find((p) => p.toLowerCase() === v) ?? 'Not sure yet';
}

/** Link for a "Request Early Access" button. */
export function earlyAccessHref(planName) {
  return planName ? `${EARLY_ACCESS_PATH}?plan=${encodeURIComponent(planName)}` : EARLY_ACCESS_PATH;
}

/**
 * mailto link to EARLY_ACCESS_EMAIL with the lead laid out in the body.
 * Used when the form cannot send, so nothing the visitor typed is lost.
 * @param {Record<string, string>} [values]
 */
export function earlyAccessMailto(values = {}) {
  const plan = values.plan && values.plan !== 'Not sure yet' ? values.plan : '';
  const subject = plan ? `Zerbiq ${plan} early access` : 'Zerbiq early access';
  const body = FIELDS.map((f) => `${f.label}: ${values[f.name] ?? ''}`).join('\n');
  return `mailto:${EARLY_ACCESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Check a submission.
 * @returns {{ ok: true, lead: Record<string,string> } | { ok: false, field: string, error: string }}
 */
export function validateEarlyAccess(input) {
  const lead = {};
  for (const f of FIELDS) {
    const raw = input?.[f.name];
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (f.required && !value) return { ok: false, field: f.name, error: `${f.label} is required.` };
    if (value.length > f.maxLength) return { ok: false, field: f.name, error: `${f.label} is too long.` };
    lead[f.name] = value;
  }
  if (!EMAIL_RE.test(lead.email)) return { ok: false, field: 'email', error: 'Enter a valid email address.' };
  if ((lead.phone.match(/\d/g) || []).length < 7) return { ok: false, field: 'phone', error: 'Enter a valid phone number.' };
  if (!EARLY_ACCESS_PLANS.includes(lead.plan)) return { ok: false, field: 'plan', error: 'Choose a plan.' };
  if (!TEAM_SIZES.includes(lead.teamSize)) return { ok: false, field: 'teamSize', error: 'Choose a team size.' };
  return { ok: true, lead };
}

/** The email sent for one lead. Subject has no line breaks (no header injection). */
export function buildLeadEmail(lead) {
  const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim();
  return {
    subject: oneLine(`Early access request: ${lead.company} (${lead.plan})`),
    text: FIELDS.map((f) => `${f.label}: ${lead[f.name] || '—'}`).join('\n'),
  };
}

/**
 * A simple per-IP limiter kept in memory. On Vercel each server instance keeps
 * its own count, so this stops one visitor resubmitting, not a distributed flood.
 */
export function createRateLimiter({ max, windowMs } = RATE_LIMIT) {
  const hits = new Map();
  return function isLimited(ip, now = Date.now()) {
    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(ip, recent);
      return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) {
      for (const [key, times] of hits) if (!times.some((t) => now - t < windowMs)) hits.delete(key);
    }
    return false;
  };
}

/** The caller's IP from Vercel's forwarding headers. */
export function requestIp(request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

const json = (status, body) => Response.json(body, { status });

/**
 * Handle POST /api/early-access.
 *   200 { ok: true }                     sent (or honeypot: dropped, same answer)
 *   400 { error, field }                 invalid input
 *   429 { error: 'rate_limited' }
 *   503 { error: 'not_configured' }      Resend variables not set yet
 *   502 { error: 'send_failed' }         Resend refused or could not be reached
 * Errors never echo the visitor's details, and nothing personal is logged.
 */
export async function handleEarlyAccess(request, { env, fetchImpl = fetch, isLimited, log = console } = {}) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json(400, { error: 'Invalid request.' });
  }

  if (isLimited(requestIp(request))) {
    return json(429, { error: 'rate_limited' });
  }

  if (String(input?.[HONEYPOT_FIELD] ?? '').trim()) {
    return json(200, { ok: true });
  }

  const checked = validateEarlyAccess(input);
  if (!checked.ok) return json(400, { error: checked.error, field: checked.field });

  if (!env?.RESEND_API_KEY || !env?.EARLY_ACCESS_FROM) {
    return json(503, { error: 'not_configured' });
  }

  const { subject, text } = buildLeadEmail(checked.lead);
  try {
    const res = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.EARLY_ACCESS_FROM,
        to: [EARLY_ACCESS_EMAIL],
        reply_to: checked.lead.email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      log.error('[early-access] Resend refused the email', { status: res.status });
      return json(502, { error: 'send_failed' });
    }
  } catch (err) {
    log.error('[early-access] Resend unreachable', { reason: err?.name || 'error' });
    return json(502, { error: 'send_failed' });
  }
  return json(200, { ok: true });
}
