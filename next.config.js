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
        source: "/",
        has: [
          {
            type: "host",
            value: "webext.luxass.dev"
          }
        ],
        destination: "/projects/webext"
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "zotera.luxass.dev"
          }
        ],
        destination: "/projects/zotera"
      },
    ];
  }
};

module.exports = nextConfig;
