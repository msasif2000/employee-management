/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        bg1: "#FFDD90",
        bgk: "#FFEEC2",
        txt1: "#7D5D00",
        txt2: "#361600", 
        sl1: "#B18500", 
        sl2: "#A37B00", 
        bs1: "#FFD369",
        bs2: "#FAC741", 
        ic1: "#FFEEC2"
      }
    },
  },
  plugins: [require("daisyui")],
}

