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
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       has: [
  //         {
  //           type: "host",
  //           value: "webext.luxass.dev"
  //         }
  //       ],
  //       destination: "/about"
  //     },
  //     {
  //       source: "/:path*",
  //       has: [
  //         {
  //           type: "host",
  //           value: "luxass.dev"
  //         }
  //       ],
  //       destination: "/404"
  //     }
  //   ];
  // }
};

module.exports = nextConfig;
