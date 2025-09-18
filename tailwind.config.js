const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./**/*.html", "./assets/**/*.js"],
  safelist: [
    'hidden',
    'invisible',
    'opacity-0',
    '-translate-y-2',
    'text-slate-900',
    'border-b-2',
    'border-orange-400',
    'text-white',
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.red, // alias to Tailwind’s red scale
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
