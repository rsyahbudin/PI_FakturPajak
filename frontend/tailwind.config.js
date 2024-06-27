/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT ({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C62828",
        secondary: "#212226",
        tersier: "#B1B1B1",
        // title: "#613D2B",
        // background: "#EFEFEF",
      },
    },
  },
  plugins: [],
});
