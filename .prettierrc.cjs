module.exports = {
  ...require.resolve("@luxass/prettier-config"),
  plugins: [
    require.resolve("prettier-plugin-astro"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
