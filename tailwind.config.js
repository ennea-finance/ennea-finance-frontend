/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        deepblue: '#15009E',
        lightblue: '#D9E4F6',// ← your custom color
      },
      boxShadow: {
        deep: '0 10px 50px rgba(21, 0, 158, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
