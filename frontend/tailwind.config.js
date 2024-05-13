/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  darkMode: "media",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#77D4FC",
        secondary: "#4B91F1",
        accent: "#4B91F1",
        background: "#010C80",
      },
    },
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};


