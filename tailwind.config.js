/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#05070a",
        secondary: "#e5e7eb",
        accent: "#c5a059",
        muted: "#4b5563",
        navy: "#0a0f16",
        gold: "#c5a059",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
