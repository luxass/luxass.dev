const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    images: { allowFutureImage: true },
    newNextLinkBehavior: true,
  },
};

const sentryWebpackPluginOptions = {};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
