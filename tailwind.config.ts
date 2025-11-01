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
        graphite: '#0F1117',
        obsidian: '#141824',
        mist: '#F4F6FB',
        accent: {
          cyan: '#38BDF8',
          indigo: '#6366F1',
          slate: '#1E293B',
          silver: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.35), transparent 60%), radial-gradient(circle at 80% 0%, rgba(99, 102, 241, 0.28), transparent 55%)',
      },
      boxShadow: {
        'soft-xl': '0 35px 60px -15px rgba(15, 17, 23, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
