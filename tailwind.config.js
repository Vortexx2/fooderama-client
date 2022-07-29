/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      raisinblack: {
        1: 'b6b9cd',
        2: '#9296b5',
        3: '#6d749c',
        4: '#535879',
        5: '#3a3d55',
        6: '#212330',
        DEFAULT: '#212330',
      },
    },
    extend: {},
  },
  plugins: [],
}
