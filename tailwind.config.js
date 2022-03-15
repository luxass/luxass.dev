module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        apps: "repeat(auto-fit, 6rem)",
      },
      gridTemplateRows: {
        apps: "repeat(auto-fit, 6rem)",
      },
      transitionProperty: {
        app: "0.3s all ease",
      },
    },
  },
  plugins: [],
};
