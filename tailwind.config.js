const colors = {
  'brand-dark-green': '#00331E',
  'brand-green': '#02A343',
  'brand-light-green': '#6CBC3A',
  'brand-beige': '#FDF4D9',
  'brand-red': '#D92525',
};

module.exports = {
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
