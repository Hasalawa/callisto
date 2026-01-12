/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626', // රතු පාට
        secondary: '#FFFFFF', // සුදු පාට
        dark: '#1F2937', // අකුරු සඳහා
      }
    },
  },
  plugins: [],
}