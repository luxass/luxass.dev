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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'git.luxass.dev',
          },
        ],
        permanent: true,
        destination: 'https://github.com/luxass',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'linkedin.luxass.dev',
          },
        ],
        permanent: true,
        destination: 'https://www.linkedin.com/in/lucasnrgaard/',
      }
    ]
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
