// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./assets/**/*.js"],
  // No darkMode since you don't use it
  safelist: [
    // JS-toggled classes for mobile drawer + helpers
    'hidden','invisible','opacity-0','-translate-y-2',
    // active nav highlight (set by script/attrs)
    'text-slate-900','border-b-2','border-orange-400','text-white',
  ],
  theme: {
    extend: {
      colors: {
      // Use Tailwind's red scale as our brand for now
      brand: colors.red,
    },
      fontFamily: {
        // keep Tailwind's default sans stack
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
