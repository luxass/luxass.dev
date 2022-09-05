import NextBundleAnalyzer from '@next/bundle-analyzer';

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 */
function defineConfig(config) {
  return NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  })(config);
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
        destination: `https://github.com/luxass`,
        permanent: true
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'linkedin.luxass.dev'
          }
        ],
        destination: `https://www.linkedin.com/in/lucasnrgaard/`,
        permanent: true
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
              value: 'posts.luxass.dev'
            }
          ],
          destination: '/posts/:path*'
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'blog.luxass.dev'
            }
          ],
          destination: '/posts/:path*'
        }
      ]
    };
  }
});
