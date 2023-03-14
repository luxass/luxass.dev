const luxassPrettier = require("@luxass/prettier-config");

module.exports = {
  ...luxassPrettier,
  plugins: [
    ...luxassPrettier.plugins,
    require.resolve("prettier-plugin-astro")
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ]
};
