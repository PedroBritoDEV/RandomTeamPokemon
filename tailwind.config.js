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
      'vh-90': ' 90vh',
      'vh-10': ' 10vh',
      '1' : '1rem',
      '2' : '2rem',
      '4' : '4rem',
      '16' : '4rem',
      '72' : '18rem',
      '80' : '20rem',
      '96' : '96rem',
      'full' : '100%'
    },
  },
  plugins: [

  ],
}

