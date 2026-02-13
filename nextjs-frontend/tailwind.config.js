/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
      extend: {
        colors : {
          "factory-blue" : "#2c3e50",
          "factory-green" : "#57bf94",
          "factory-black" : "#2C3139",
          "factory-dark-black" : "#272C32",
          "factory-dark-green" : "#4ca981",
          "dark-brown" : "#2C3139"
        },
        fontFamily : {
          'outfit' : ["Outfit", "sans-serif"]
        },
        height:{
          customh: 'calc(100vh - 96px)'
        },
  
      },
    },
    plugins: [],
  }