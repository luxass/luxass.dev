// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
