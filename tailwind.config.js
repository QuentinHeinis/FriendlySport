module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "Orange": "#ff9800",
        "Rose": "#f2325c",
        "Dark_gray": "#151514",
        "Dark_gray2": "#2C2B28",
        "Gray_white": "#e9e9e9",
        "Gray": "#c4c4c4"
      },
      "fontFamily": {
        "bebas-neue": "Bebas Neue",
        "mulish": "Mulish",
        "oswald": "Oswald",
        "staatliches": "Staatliches"
      },
      "boxShadow": {
        "3D effect": "inset 9px 9px 16px 0px rgba(255,255,255,0.5), inset -9px -9px 16px 0px rgba(0,0,0,0.5)"
      },
      "borderRadius": {
        "none": "0",
        "xs": "0.0625rem",
        "sm": "0.3125rem",
        "default": "0.5625rem",
        "lg": "0.9375rem",
        "xl": "1.25rem",
        "2xl": "1.5625rem",
        "3xl": "1.875rem",
        "4xl": "2.1875rem",
        "5xl": "2.5625rem",
        "6xl": "2.96875rem",
        "7xl": "3.125rem",
        "8xl": "6rem",
        "full": "9999px"
      }
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
}

