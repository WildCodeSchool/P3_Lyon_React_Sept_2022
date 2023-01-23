/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "#1423DC",
        bluelight: "#EBF2FB",
        violet: "#C9CBF0",
        green: "#95CD31",
        yellow: "#F5AB00",
        background: "#F6F6F6",
      },
    },
  },
  plugins: [],
};
