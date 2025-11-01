import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx,json}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#101113',
        midnight: '#08090a',
        pewter: '#d0d4d9',
        accent: {
          blue: '#4c6ef5',
          silver: '#bcccdc',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 20% 20%, rgba(76, 110, 245, 0.25), transparent 60%), radial-gradient(circle at 80% 0%, rgba(188, 205, 220, 0.15), transparent 55%)',
      },
      boxShadow: {
        'soft-xl': '0 35px 60px -15px rgba(8, 9, 10, 0.55)',
      },
    },
  },
  plugins: [],
};

export default config;
