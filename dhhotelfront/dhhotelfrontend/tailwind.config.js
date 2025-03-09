/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: "rgb(217, 221, 219)",
        customColor: "rgb(255, 188, 141)",
      },
    },
  },
  plugins: [],
}