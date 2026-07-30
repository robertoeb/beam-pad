/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: {
          DEFAULT: '#0C0C0E',
          elevated: '#15161A',
          border: 'rgba(255,255,255,0.08)',
        },
        accent: {
          cyan: '#00E5FF',
          red: '#FF3B30',
          green: '#34C759',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#52525B',
        },
      },
      fontFamily: {
        sans: ['Inter-Regular'],
        medium: ['Inter-Medium'],
        semibold: ['Inter-SemiBold'],
      },
      spacing: {
        's1': '4px',
        's2': '8px',
        's3': '12px',
        's4': '16px',
        's5': '20px',
        's6': '24px',
        's8': '32px',
        's10': '40px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        sheet: '24px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
