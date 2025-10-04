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
        // Lock brand utilities to the exact brand hex
        // e.g., text-brand-700 / bg-brand-700 / border-brand-700
        brand: {
          700: '#991b1b',
        },
       },
       fontFamily: {
         sans: [...defaultTheme.fontFamily.sans],
       },
     },
   },
  plugins: [],
};
