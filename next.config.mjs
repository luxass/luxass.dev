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
        source: '/',
        has: [
          {
            type: 'host',
            value: 'git.luxass.dev'
          }
        ],
        destination: `https://github.com/luxass`
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'linkedin.luxass.dev'
          }
        ],
        destination: `https://www.linkedin.com/in/lucasnrgaard/`
      }
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
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
      ]
    };
  }
});
