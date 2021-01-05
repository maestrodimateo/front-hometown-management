module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'hakki': {
          '50': '#fffcf3',
          '100': '#fff9e8',
          '200': '#fff1c5',
          '300': '#fee9a3',
          '400': '#fed85d',
          '500': '#fdc718',
          '600': '#e4b316',
          '700': '#be9512',
          '800': '#98770e',
          '900': '#7c620c'
        },
        'blumine': {
          '50': '#f5f7f9',
          '100': '#ebeff2',
          '200': '#cdd6df',
          '300': '#aebecb',
          '400': '#728da4',
          '500': '#355c7d',
          '600': '#305371',
          '700': '#28455e',
          '800': '#20374b',
          '900': '#1a2d3d'
        }
      },
      fontFamily: {
        main: ['Roboto Mono']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
