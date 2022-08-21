/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    images: { allowFutureImage: true },
    newNextLinkBehavior: true
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "webext.luxass.dev"
          }
        ],
        destination: "/templates/webext"
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "snippets.luxass.dev"
          }
        ],
        destination: "/snippets/:path*"
      }
    ];
  }
};

module.exports = nextConfig;
