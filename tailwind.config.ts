import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        deep: '#0a0a0f',
        card: '#111118',
        red: '#e8002d',
        cyan: '#00d2ff',
        gold: '#ffd700',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
