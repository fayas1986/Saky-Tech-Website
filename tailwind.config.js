/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#0d83fd',
          primaryDark: '#0b66c2',
          heading: '#2d465e',
          body: '#212529',
          light: '#f3f9ff',
          surface: '#ffffff',
          dark: '#2d465e',
          navy: '#1e293b',
          lime: '#10b981',
        },
        ilanding: {
          blue: '#0d83fd',
          blueHover: '#0b66c2',
          navy: '#2d465e',
          lightBg: '#f3f9ff',
          text: '#212529',
          muted: '#6c757d',
          border: '#e2e8f0',
        },
      },
      boxShadow: {
        'card': '0 5px 25px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 30px rgba(13, 131, 253, 0.12)',
        'cta': '0 15px 35px rgba(13, 131, 253, 0.2)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

