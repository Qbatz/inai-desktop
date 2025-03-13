/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      scrollbar: ['hidden'],
      height: {
        '500':'500px',
        '348' : '348px'
      },
      width: {
        '1200':'1200px',
        '464' : '464px',
      },
      fontFamily: {
        Gilroy : ['Gilroy','sans-serif'],
        Montserrat : ['Montserrat','sans-serif']
      },
    },
  },
  plugins: [],
}

