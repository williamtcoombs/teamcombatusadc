/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./*.html",
    "./assets/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand palette
        brand: {
          700: "#991b1b", // main hero red
          800: "#7f1d1d", // darker step for gradients
          // Optional lighter step if you need it later:
          // 600: "#a61e1e",
        },
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
  safelist: [
    "hidden", "invisible", "opacity-0", "-translate-y-2", "translate-y-0",
  ],
  plugins: [],
};
