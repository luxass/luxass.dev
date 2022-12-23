/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  }
  /* async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "git.luxass.dev"
          }
        ],
        destination: "https://github.com/luxass",
        permanent: true
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "linkedin.luxass.dev"
          }
        ],
        destination: "https://www.linkedin.com/in/lucasnrgaard/",
        permanent: true
      }
    ];
  } */
});
