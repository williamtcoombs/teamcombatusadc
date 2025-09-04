// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        display: ["Antonio", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 6px 20px -8px rgba(2,6,23,0.15)",
        deep: "0 12px 32px -12px rgba(2,6,23,0.35)"
      }
    }
  },
  plugins: []
};