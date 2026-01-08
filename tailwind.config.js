/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lux-gold': '#D4AF37',
      },
      fontSize: {
        'hero': ['64px', { lineHeight: '1.1', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
