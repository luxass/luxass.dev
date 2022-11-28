const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: ({ colors }) => ({
      blue: '#4169E1',
      black: '#000000',
      white: '#FFFFFF',
      gray: colors.neutral
    }),
    fontFamily: {
      inter: ['Inter', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: []
};
