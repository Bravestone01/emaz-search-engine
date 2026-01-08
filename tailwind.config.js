/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'emaz-blue': '#000B1E',
        'emaz-gold': '#D4AF37',
      },
    },
  },
  plugins: [],
}
