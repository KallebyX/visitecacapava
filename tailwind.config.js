const colors = {
  'brand-dark-green': '#00331E',
  'brand-green': '#02A343',
  'brand-light-green': '#6CBC3A',
  'brand-beige': '#FDF4D9',
  'brand-red': '#D92525',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Staatliches"', 'cursive'],
      },
    },
  },
  plugins: [],
};
