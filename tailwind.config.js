/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0a0a0a',
        'cyber-dark': '#1a1a1a',
        'neon-green': '#00ff9f',
        'neon-red': '#ff3e3e',
        'neon-blue': '#00d4ff',
        'neon-purple': '#b537f2',
        'cyber-gray': '#2a2a2a',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 159, 0.5)',
        'neon-red': '0 0 20px rgba(255, 62, 62, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(0, 255, 159, 0.5)'
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 30px rgba(0, 255, 159, 0.8)'
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
      },
    },
  },
  plugins: [],
}
