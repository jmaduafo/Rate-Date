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
        homeBackground: '#AA705D',
        homeText: '#FFFFFF', 
        homeText30: 'rgba(255, 255, 255, .3)', 
        homeText50: 'rgba(255, 255, 255, .5)', 
        homeText70: 'rgba(255, 255, 255, .7)', 
        homeAccent: '#000000',
        homeAccent2: '#DDBAAF',
        gradientBottom: '#724242',
        gradientTop: '#FFD0D0',
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
      }, 
      "bounce": {
        from: { transform: "translateY(-5px)"},
        to: { transform: "translateY(5px)"},
      }, 
      "slide1": {
        from: { transform: "translateX(-30%)"},
        to: { transform: "translateX(0%)"},
      }, 
      "slide2": {
        from: { transform: "translateX(0%)"},
        to: { transform: "translateX(-30%)"},
      }, 
      "slide3": {
        from: { transform: "translateX(-20%)"},
        to: { transform: "translateX(0%)"},
      }, 
      "ping": {
        from: { opacity: 0},
        to: { opacity: 1},
      }, 
      "bounceMove1": {
        from: { top: "10%", left: "10%"},
        to: { top: "100%", left: "90%"},
      },
      "bounceMove2": {
        from: { top: "10%", left: "5%"},
        to: { top: "60%", left: "90%"},
      },
      "bounceMove3": {
        '0%': { top: "10%", left: "5%"},
        '25%': { top: "40%", left: "15%"},
        '50%': { top: "60%", left: "55%"},
        '100%': { top: "40%", left: "90%"},
      },
      "bounceMove4": {
        '0%': { top: "70%", left: "85%"},
        '25%': { top: "50%", left: "65%"},
        '50%': { top: "40%", left: "45%"},
        '100%': { top: "60%", left: "20%"},
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "spinner": "spinning 2s linear infinite",
      "skeleton": "skeleton 2s ease-in-out infinite alternate",
      "bounce": "bounce 1s ease-in-out infinite alternate",
      "bounceMove1": "bounceMove1 35s ease infinite alternate",
      "bounceMove2": "bounceMove2 30s ease infinite alternate",
      "bounceMove3": "bounceMove3 45s ease infinite alternate",
      "bounceMove4": "bounceMove4 30s ease infinite alternate",
      "slide1": "slide1 60s linear infinite",
      "slide2": "slide2 45s linear infinite",
      "slide3": "slide3 60s linear infinite",
      "ping1": "ping 0.4s ease infinite",
      "ping2": "ping 0.4s ease infinite .1s",
      "ping3": "ping 0.4s ease infinite .2s",
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
};
