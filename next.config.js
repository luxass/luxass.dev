const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(
  withContentlayer({
    //swcMinify: true,
    reactStrictMode: true,
    experimental: {
      //legacyBrowsers: false,
      //browsersListForSwc: true,
      images: { allowFutureImage: true }
      //newNextLinkBehavior: true
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
  })
);
