/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        primary:
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      },
      colors: {
        primary: {
          dark: "#613dc1",
          light: "#4e148c",
        },
        accent: {
          green: "#27AE60",
          red: "#E74C3C",
          yellow: "#F1C40F",
        },
        text: {
          darkGray: "#333333",
          mediumGray: "#666666",
          lightGray: "#999999",
        },
      },
    },
  },
  plugins: [],
};
