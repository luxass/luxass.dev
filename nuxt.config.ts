export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "nuxt-graphql-client"],
  app: {
    head: {
      title: "Home | luxass.dev",
      meta: [
        {
          name: "title",
          content: "Home | luxass.dev",
        },
        {
          name: "description",
          content:
            "With a background as a fullstack developer. Lucas Nørgaard builds both modern and scalable applications",
        },
        {
          name: "keywords",
          content:
            "lucas nørgård, web developer, fullstack, backend, website, lucas, luxass, nørgård",
        },
        {
          property: "og:title",
          content: "Home | luxass.dev",
        },
        {
          property: "og:description",
          content:
            "With a background as a fullstack developer. Lucas Nørgaard builds both modern and scalable applications",
        },
        {
          property: "og:url",
          content: "https://luxass.dev",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site:name",
          content: "luxass.dev",
        },
        {
          property: "og:image",
          content: "https://image.luxass.dev/api/og",
        },
        {
          property: "og:image:alt",
          content: "luxass.dev",
        },
        {
          property: "og:image:width",
          content: "300",
        },
        {
          property: "og:image:height",
          content: "300",
        },
        {
          property: "og:image:type",
          content: "image/jpg",
        }
      ],
    },
  },
  css: ["@unocss/reset/tailwind.css"],
  runtimeConfig: {
    public: {
      siteUrl: "https://luxass.dev",
    },
  },
  "graphql-client": {
    clients: {
      default: {
        host: "https://api.github.com/graphql",
        schema: "./github-graphql.schema.json",
        token: {
          type: "Bearer",
          name: "Authorization",
          value: process.env.GITHUB_TOKEN,
        },
      },
    },
  },
  routeRules: {
    "api/projects": {
      cache: {
        maxAge: 60 * 60,
      },
    },
  },
});
