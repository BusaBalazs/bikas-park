/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        park: {
          bg: '#0A0F1E',
          bg2: '#0F1830',
          panel: 'rgba(255,255,255,0.055)',
          border: 'rgba(255,255,255,0.10)',
          green: '#3CFF9A',
          green2: '#12C97A',
          red: '#FF3B5C',
          amber: '#FFC93F',
          cyan: '#35E6FF',
          violet: '#B084FF',
          ink: '#EAF3FF',
          dim: '#8FA3C4',
        },
      },
      boxShadow: {
        neonGreen: '0 0 24px rgba(60,255,154,0.55), 0 0 4px rgba(60,255,154,0.8)',
        neonRed: '0 0 24px rgba(255,59,92,0.6), 0 0 4px rgba(255,59,92,0.9)',
        neonCyan: '0 0 24px rgba(53,230,255,0.55), 0 0 4px rgba(53,230,255,0.8)',
        neonAmber: '0 0 20px rgba(255,201,63,0.5)',
        glass: '0 8px 32px rgba(0,0,0,0.35)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.18)', opacity: 0.75 },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.6)', opacity: 0.9 },
          '100%': { transform: 'scale(2.4)', opacity: 0 },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 1.6s ease-in-out infinite',
        floaty: 'floaty 3s ease-in-out infinite',
        ripple: 'ripple 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}
