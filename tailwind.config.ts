import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'emaz-blue': '#000B1E',
        'emaz-gold': '#D4AF37',
        'emaz-secondary': '#0A1929',
      },
      spacing: {
        '9': '9px',
        '18': '18px',
        '27': '27px',
        '36': '36px',
        '45': '45px',
        '54': '54px',
        '63': '63px',
      },
      fontSize: {
        '18': ['18px', { lineHeight: '1.6' }],
        '27': ['27px', { lineHeight: '1.4' }],
        '36': ['36px', { lineHeight: '1.3' }],
        '45': ['45px', { lineHeight: '1.2' }],
        '54': ['54px', { lineHeight: '1.15' }],
        '63': ['63px', { lineHeight: '1.1' }],
      },
      borderRadius: {
        '9': '9px',
      },
    },
  },
  plugins: [],
}

export default config
