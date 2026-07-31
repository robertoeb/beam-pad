/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0A0A12',
        surface: {
          DEFAULT: '#13131E',
          elevated: '#1A1A2A',
          border: 'rgba(255,255,255,0.07)',
          highlight: 'rgba(255,255,255,0.05)',
        },
        accent: {
          cyan: '#22D3EE',
          violet: '#8B8CF8',
          blue: '#3B82F6',
          red: '#FF453A',
          green: '#34D399',
          yellow: '#FBBF24',
        },
        brand: {
          start: '#22D3EE',
          end: '#8B8CF8',
        },
        text: {
          primary: '#F5F6FA',
          secondary: '#B7BDCB',
          muted: '#747B8A',
        },
      },
      fontFamily: {
        sans: ['Inter-Regular'],
        medium: ['Inter-Medium'],
        semibold: ['Inter-SemiBold'],
      },
      spacing: {
        s1: '4px',
        s2: '8px',
        s3: '12px',
        s4: '16px',
        s5: '20px',
        s6: '24px',
        s8: '32px',
        s10: '40px',
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '22px',
        sheet: '28px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
