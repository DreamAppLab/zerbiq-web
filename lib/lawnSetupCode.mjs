// ─────────────────────────────────────────────────────────────────────────────
// lib/lawnSetupCode.mjs — the lawn care flyer's setup code field (/lawn).
// A light format check only: it never says a code is valid. The app checks the
// code at sign-up. The code is never stored or logged on this site.
// ─────────────────────────────────────────────────────────────────────────────

/** Printed before the number on the flyer and shown fixed in front of the field. */
export const LAWN_CODE_PREFIX = 'LAWN-';

/** How many digits follow the prefix. */
export const LAWN_CODE_DIGITS = 6;

/**
 * What the visitor typed or pasted, reduced to the digits after "LAWN-".
 * "123456" -> "123456"; a pasted "LAWN-123456" or "lawn 123 456" -> "123456";
 * letters and symbols are dropped; at most 6 digits are kept.
 */
export function lawnCodeDigits(raw) {
  const text = String(raw ?? '').trim().replace(/^lawn\s*-?\s*/i, '');
  return text.replace(/\D/g, '').slice(0, LAWN_CODE_DIGITS);
}

/** 'empty' (no code: fine, the code is optional), 'partial' (fewer than 6 digits) or 'complete'. */
export function lawnCodeStatus(digits) {
  const d = lawnCodeDigits(digits);
  if (d.length === 0) return 'empty';
  return d.length === LAWN_CODE_DIGITS ? 'complete' : 'partial';
}

/** The full code for the sign-up link ("LAWN-123456"), or '' unless all 6 digits are there. */
export function lawnSetupCode(digits) {
  const d = lawnCodeDigits(digits);
  return d.length === LAWN_CODE_DIGITS ? `${LAWN_CODE_PREFIX}${d}` : '';
}
