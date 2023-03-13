export default defineNuxtConfig({
  modules: ["nuxt-og-image", "@unocss/nuxt", "nuxt-graphql-client"],
  css: ["@unocss/reset/tailwind.css"],
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
      }
    }
  }
});
