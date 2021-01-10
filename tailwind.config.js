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
          '50': '#f4f4f5',
          '100': '#e8e9ec',
          '200': '#c6c7cf',
          '300': '#a4a5b1',
          '400': '#5f6277',
          '500': '#1b1e3d',
          '600': '#181b37',
          '700': '#14172e',
          '800': '#101225',
          '900': '#0d0f1e'
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