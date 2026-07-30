export const tokens = {
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
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      muted: '#52525B',
    },
  },
} as const;

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40 } as const;
export const radius = { sm: 8, md: 12, lg: 16, xl: 20, sheet: 24, pill: 999 } as const;
export const control = { min: 44, sm: 44, md: 56, lg: 72 } as const;
