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
        background: "black",
        foreground: "#D9D9D9",
        myBackground: "#CEC7C7",
        myBackgroundMuted: "rgba(206, 199, 199, .3)",
        myBackground60: "rgba(206, 199, 199, .6)",
        myForeground: "#E9E9E9",
        myAccent: "#DF8E74",
        myWarning: '#E62020',
        mutedBorder: 'rgba(255, 255, 255, .4)',
        darkText: "black",
        dark10: "rgba(0, 0, 0, .05)",
        dark30: "rgba(0, 0, 0, .3)",
        lightText: "#D9D9D9",
        darkText60: "rgba(0, 0, 0, .6)",
        lightText60: "rgba(217, 217, 217, .6)",
        border: "hsl(var(--border))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "spinner": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
      "skeleton": {
        from: { opacity: .3},
        to: { opacity: 1},
      } 
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "spinner": "spinning 2s linear infinite",
      "skeleton": "skeleton 2s ease-in-out infinite alternate",
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
};
