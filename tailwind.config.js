/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': "20px 20px 60px #afa9a9, -20px -20px 60px #ede5e5",
      },
      colors: {
        background: "#CEC7C7",
        darkText: "black",
        dark10: "rgba(0, 0, 0, .1)",
        lightText: "#D9D9D9",
        darkText60: "rgba(0, 0, 0, .6)",
        lightText60: "rgba(217, 217, 217, .6)",
        foreground: "#D9D9D9",
        accent: "#DF8E74",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      screens: {
        'xxs': '0px',
  
        'xs': '480px',
        // => @media (min-width: 480px) { ... }
  
        'sm': '768px',
        // => @media (min-width: 768px) { ... }
  
        'md': '992px',
        // => @media (min-width: 992px) { ... }
  
        'lg': '1200px',
        // => @media (min-width: 1200px) { ... }
  
        'xl': '1320px',
        // => @media (min-width: 1320px) { ... }
  
        '2xl': '1660px',
        // => @media (min-width: 1920px) { ... } 
      },
    },
  },
  plugins: [],
};
