/** @type {import('tailwindcss').Config} */
const { withAnimations } = require('animated-tailwindcss')

module.exports = withAnimations({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      "pt-serif": ["PT Serif", "serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "100%": "100%",
    },
    screens: {
      sm: '320px',
      md: '682px',
      lg: '1300px',
      xl: '1440px',
    },
    colors: {
      secondary: "#F4F2ED",
      black: "black",
      white: "white",
      main: {
        light: '#1B1A20',
        primary: '#18161A',
      },
      pomodoro: {
        red: '#ED665C',
        yellow: '#F0DB5B',
        green: '#4FF08D',
      },
      water: {
        DEFAULT: '#68A0CA',
      },
      main: {
        light: '#1B1A20',
        primary: '#18161A',
      },
      gray: {
        DEFAULT: '#3d3e42',
      },
    },
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
      boxShadow: {
        'main': '10px 10px 4px 0px rgba(0,0,0,0.25)',
        'habit': '1px 1px 4px 0px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        underline1: "url('/assets/Underline1.svg')",
        underline2: "url('/assets/Underline2.svg')",
        underline3: "url('/assets/Underline3.svg')",
        underline4: "url('/assets/Underline4.svg')",
        highlight3: "url('/assets/Highlight3.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
})