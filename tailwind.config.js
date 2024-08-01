/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryYellow: '#FFF5E1',
        secondaryYellow: '#A0937D',
        pink: '#E1D2D2',
        footerColor:'#FFEFC7',
        modalGray: 'rgba(33, 37, 41, 0.75)',
        green:'#219C90',
        navColor:'#FFD35A'
      }
    },
  },
  plugins: [],
}