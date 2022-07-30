const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      // custom colour definition

      // default is a shade of dark greyish black
      raisinb: {
        1: 'b6b9cd',
        2: '#9296b5',
        3: '#6d749c',
        4: '#535879',
        5: '#3a3d55',
        6: '#212330',
        DEFAULT: '#212330',
      },

      // default is a lighter black
      space: {
        1: '#cecfdf',
        2: '#a9abc7',
        3: '#8487ae',
        4: '#616594',
        5: '#494c6f',
        6: '#2b2d42',
        DEFAULT: '#2b2d42',
      },

      // default is a light-ish grey
      manatee: {
        1: '#dbdfe6',
        2: '#b7bfcc',
        3: '#8d99ae',
        4: '#707f99',
        5: '#556177',
        6: '#3b4454',
        DEFAULT: '#8d99ae',
      },

      // default is a variant of white
      cultured: {
        1: '#edf4f2',
        2: '#ccdae0',
        3: '#a6bfc9',
        4: '#81a4b1',
        5: '#5d8798',
        6: '#566572',
        DEFAULT: '#edf4f2',
      },

      // default is a pinkish red
      imperial: {
        1: '#fcd9dd',
        2: '#f8a0aa',
        3: '#f46778',
        4: '#ef233c',
        5: '#d11026',
        6: '#980b1c',
        DEFAULT: '#ef233c',
      },

      // default is a darker red
      amaranth: {
        1: '#fd9bab',
        2: '#fc5f79',
        3: '#fb2347',
        4: '#d90429',
        5: '#a0031d',
        6: '#640212',
        DEFAULT: '#d90429',
      },

      // default is a vibrant green
      malachite: {
        1: '#b6f6c7',
        2: '#7ff09d',
        3: '#48ea73',
        4: '#1adb4e',
        5: '#13a43a',
        6: '#od6e27',
        DEFAULT: '#1adb4e',
      },

      // colours that need to be ported over from tailwind
      lime: colors.lime,
      black: colors.black,
      white: colors.white,
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  extend: {},
  plugins: [],
}
