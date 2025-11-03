/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#1337ec",
        "background-light": "#f6f6f8",
        "background-dark": "#101322",
        "text-light": "#0d101b",
        "text-dark": "#f6f6f8",
        "text-secondary-light": "#4c599a",
        "text-secondary-dark": "#a1a7c4",
        "card-light": "#ffffff",
        "card-dark": "#1a1e33",
        "border-light": "#e7e9f3",
        "border-dark": "#2d3358"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"]
      }
    },
  },
  plugins: [],
};