/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-cyan':   '#00d4ff',
        'cyber-purple': '#8b5cf6',
        'cyber-green':  '#10b981',
        'cyber-amber':  '#f59e0b',
        'cyber-pink':   '#ec4899',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        'sans': ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
