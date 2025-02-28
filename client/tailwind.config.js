/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths based on your project
  theme: {
    extend: {
      colors: {
        primary: "#2C5F2D",
        secondary: "#6A994E",
        accent: "#E9C46A",
        soil: "#8B5E3B",
        sky: "#A8DADC",
        offwhite: "#F8F9FA",
        darkgray: "#333333",
      },
    },
  },
  plugins: [],
};
