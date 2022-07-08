/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    images: { allowFutureImage: true },
    newNextLinkBehavior: true,
    swcPlugins: [
      [
        "luxass-projects",
        {
          
        },
      ],
    ],
  },
};

module.exports = nextConfig;
