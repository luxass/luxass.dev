/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 */
function defineConfig(config) {
  return config;
}

export default defineConfig({
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
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'templates.luxass.dev'
          }
        ],
        destination: '/templates/:path*'
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'snippets.luxass.dev'
          }
        ],
        destination: '/snippets/:path*'
      }
    ];
  }
})
