/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'league-spartan': ['"League Spartan"', 'sans-serif'],
      },
      colors: {
        blue: {
          light: "#F5FCFF",
          medium: "#1376F8",
          dark: "#011632",
          black: "#000118",
        },
        green: {
          medium: "#2EC114",
        },
      },
    },
  },
  plugins: [],
};
