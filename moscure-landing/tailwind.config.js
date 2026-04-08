/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111111',
        surfaceHover: '#1A1A1A',
        gradientpink: '#FF4D6D',
        gradientyellow: '#FFD60A',
        gradientcyan: '#00F5D4',
        textPrimary: '#FFFFFF',
        textMuted: '#8A8A8A',
        borderDefault: '#2A2A2A',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'float-badge': 'floatBadge 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        borderGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
