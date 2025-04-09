/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      scrollbarColor: ['transparent'],
      scrollbar: ['hidden'],
      height: {
        '500': '500px',
        '348': '348px'
      },
      width: {
        '1200': '1200px',
        '464': '464px',
      },
      screens: {
        xs: "480px", 
        
      },
      fontFamily: {
        Gilroy: ['Gilroy', 'sans-serif'],
        Montserrat: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        "28px": "28px",
      },
      color: {
        'blueGray-500': '#778192',
        'trueGray-400': '#939393',
        'trueGray-600':'#4B4B4B'
      },
      margin: {
        'extra': '1rem',
      },
      backgroundColor: {
        'blueGray-100': '#F1F4F9',
        'trueGray-400':'#939393',
        'blueGray-50':'#F9FAFC'
      },
      flex: {
        'flex-33%': '0 0 33.33%'
      }

    },
  },
  plugins: [require('tailwind-scrollbar')],
}

