// /lawn only: the flyer's heading font (Space Grotesk Bold, self-hosted from
// @fontsource, no request to Google) and this page's own styles. Every class in
// lawn.css starts with "lawn-", so no other page or the shared theme changes.
import '@fontsource/space-grotesk/latin-700.css';
import './lawn.css';

export default function LawnLayout({ children }) {
  return children;
}
