// const luxassConfig = require.resolve("@luxass/prettier-config");

// module.exports = {
//   ...luxassConfig,
//   plugins: [
//     ...luxassConfig.plugins,
//     require.resolve('prettier-plugin-astro')
//   ],
//   overrides: [

//   ]
// }

module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
