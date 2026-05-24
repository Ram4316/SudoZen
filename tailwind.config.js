/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          dark: '#121212',
          darker: '#0a0a0a',
          surface: '#1e1e1e',
          surfaceHover: '#2a2a2a',
          primary: '#8b5cf6', // A soft, premium violet
          secondary: '#6ee7b7',
          accent: '#f472b6',
          text: '#f3f4f6',
          textMuted: '#9ca3af',
          border: '#374151',
          error: '#ef4444',
          errorMuted: '#7f1d1d',
          success: '#10b981',
          highlight: 'rgba(139, 92, 246, 0.15)',
          selection: 'rgba(139, 92, 246, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'zen': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'zen-sm': '0 2px 10px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}