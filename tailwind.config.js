/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#252A37",
        sec: "#0437F2",
        bg: "#FFFFFF",
      },
      fontFamily: {
        open: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
