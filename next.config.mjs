import { withContentlayer } from 'next-contentlayer';
import NextBundleAnalyzer from '@next/bundle-analyzer';
import { env } from './src/env/server.mjs';

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  })(withContentlayer(config));
}

export default defineNextConfig({
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