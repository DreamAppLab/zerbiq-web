/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // /contact and /support are the same content; keep one page and one URL.
    return [{ source: '/contact', destination: '/support', permanent: true }];
  },
};

export default nextConfig;
