/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./assets/**/*.js",
  ],
  safelist: [
    'hidden',
    'invisible',
    'opacity-0',
    'translate-y-[-8px]',
  ],
  theme: {
    extend: {
      // Add any customizations here, e.g., colors, spacing, etc.
    },
  },
  plugins: [],
  darkMode: 'class', // Matches your <html class="dark"> toggle
};
