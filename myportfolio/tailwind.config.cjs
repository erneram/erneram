/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Playfair_Display: ['"Playfair Display"', 'Italic'],
        Lora: ['"Lora"', 'Italic'],
        Nunito: ['"Nunito"', 'Italic'],
        Yeseva: ['"Yeseva"', 'Italic'],
        Josefin: ['"Josefin Sans"', 'Italic'],
      },
      cursor: {
        Fancy: 'url(/cursor.png), default',
      }
    },
  },
  plugins: [],
}

