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
        primary: {
          50: "#e6f7ff",
          100: "#bae3ff",
          200: "#7dd3fc",
          300: "#38bdf8",
          400: "#0ea5e9",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
          800: "#0c4a6e",
          900: "#102a43",
          950: "#102031",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};


