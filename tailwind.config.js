/** @type {import('tailwindcss').Config} */
const { withAnimations } = require('animated-tailwindcss')

module.exports = withAnimations({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '428px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'main': {
        light: '#1B1A20',
        primary: '#18161A',
      },
      'pomodoro': {
        red: '#ED665C',
        yellow: '#F0DB5B',
        green: '#4FF08D',
      },
      'water': {
        DEFAULT: '#68A0CA',
      },
      'main': {
        light: '#1B1A20',
        primary: '#18161A',
      },
      'white': {
        DEFAULT: '#FFFFFF ',
      },
      'gray': {
        DEFAULT: '#8c8c8c',
      },
    },
    extend: {
      boxShadow: {
        'main': '10px 10px 4px 0px rgba(0,0,0,0.25)',
        'habit': '1px 1px 4px 0px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
})