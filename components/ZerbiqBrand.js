/**
 * ZerbiqBrand — renders the official Zerbiq wordmark with the correct
 * brand treatment: "ZERBI" in the current text color, "Q" in brand blue.
 *
 * Usage as a component:   <ZerbiqBrand />
 * Usage in prose strings: {brandify("Set it once — Zerbiq handles the rest.")}
 *
 * NEVER render the word "Zerbiq" as plain text in any visible UI element.
 * Exceptions: meta tags, alt text, href values, email addresses.
 */

export default function ZerbiqBrand() {
  return (
    <>ZERBI<span style={{ color: 'var(--color-primary)' }}>Q</span></>
  );
}

/**
 * brandify(text) — splits a string on every occurrence of "Zerbiq" and
 * inserts a <ZerbiqBrand /> component in its place.  Returns the original
 * value unchanged when no "Zerbiq" is found.
 *
 * Works in server and client components.
 */
export function brandify(text) {
  if (!text || !text.includes('Zerbiq')) return text;
  const parts = text.split('Zerbiq');
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <ZerbiqBrand key={i} />]
      : [part]
  );
}
