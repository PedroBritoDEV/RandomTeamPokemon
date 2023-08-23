/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
  './src/**/*.vue',
  './src/views/**/*.vue',
  './src/components/**/*.vue',
],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
    height: {
      'vh-80': ' 80vh',
      '16' : '4rem'
    },
  },
  plugins: [

  ],
}

