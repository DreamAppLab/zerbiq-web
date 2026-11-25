/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // /contact and /support are the same content; keep one page and one URL.
    return [
      { source: '/contact', destination: '/support', permanent: true },
      // The old lead form is gone; keep old /early-access links working.
      { source: '/early-access', destination: '/support', permanent: true },
      // Self-serve sign-up lives in the app; keep old /signup links working.
      { source: '/signup', destination: 'https://app.zerbiq.com/signup', permanent: true },
    ];
  },
};

export default nextConfig;
