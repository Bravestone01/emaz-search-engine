import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#000B1E',
          text: '#D4AF37',
          accent: '#FFD700',
          secondary: '#0A1929',
        },
      },
      fontSize: {
        h1: ['6.3rem', { lineHeight: '1.2' }],
        h2: ['5.4rem', { lineHeight: '1.3' }],
        h3: ['4.5rem', { lineHeight: '1.4' }],
        body: ['2.7rem', { lineHeight: '1.5' }],
        small: ['1.8rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '9': '0.9rem',
        '18': '1.8rem',
        '27': '2.7rem',
        '36': '3.6rem',
        '45': '4.5rem',
        '54': '5.4rem',
        '63': '6.3rem',
        '72': '7.2rem',
        '81': '8.1rem',
        '90': '9.0rem',
      },
    },
  },
  plugins: [],
}

export default config
