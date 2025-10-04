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
        // Custom brand color (exact hex)
        brand: {
          700: "#991b1b",
          // Optional: add lighter/darker shades if you need them later
          // 600: "#a61e1e",
          // 800: "#861818",
        },
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
  safelist: [
    // Your transition/menu classes
    "hidden", "invisible", "opacity-0", "-translate-y-2", "translate-y-0",
  ],
  plugins: [],
};
