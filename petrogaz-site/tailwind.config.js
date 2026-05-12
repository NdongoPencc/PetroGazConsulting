/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        petroleum: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8ee6',
          600: '#006fc4',
          700: '#00589f',
          800: '#004a83',
          900: '#003d6d',
          950: '#002548',
        },
        gold: {
          400: '#f5c842',
          500: '#e6a800',
          600: '#c48f00',
        },
        dark: '#0a0f1e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
