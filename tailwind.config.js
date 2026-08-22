/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cb: {
          blue: "#324DC7",
          bluedark: "#1e3a8a",
          yellow: "#FEDB00",
          yellowhover: "#f5d000",
          green: "#0B6B3A",
          greenbg: "#CFE2D4",
          ink: "#1E1E1E",
          gray: "#505050",
          line: "#B3B3B3",
          panel: "#F8F8F8",
          chrome: "#EAEFFB",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-body)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
