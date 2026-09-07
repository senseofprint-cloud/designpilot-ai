/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7C3AED',
          purpleDeep: '#5B21B6',
          blue: '#2563EB',
          cyan: '#06B6D4',
          pink: '#EC4899',
          orange: '#F97316',
          lime: '#84CC16',
          navy: '#0F1226',
          navySoft: '#4B4F6B',
          bg: '#FBFAFF',
          border: '#E8E5F6',
          borderSoft: '#F0EEFA'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,18,38,.06)',
        card: '0 8px 24px -8px rgba(76,29,149,.18)',
        lifted: '0 24px 60px -16px rgba(37,37,90,.28)'
      },
      borderRadius: {
        xl2: '18px'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(30px,-20px) scale(1.06)' }
        },
        pulseOrb: {
          '0%': { boxShadow: '0 0 0 0 rgba(124,58,237,.35)' },
          '70%': { boxShadow: '0 0 0 26px rgba(124,58,237,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(124,58,237,0)' }
        },
        toastIn: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0 50%' }
        }
      },
      animation: {
        float: 'float 14s ease-in-out infinite',
        pulseOrb: 'pulseOrb 1.6s ease-in-out infinite',
        toastIn: 'toastIn .25s ease',
        shimmer: 'shimmer 1.4s ease infinite'
      }
    }
  },
  plugins: []
}
