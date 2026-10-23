import { SPRING } from '@/lib/spring';

export { SPRING };

export const tokens = {
  colors: {
    background: '#0A0A12',
    surface: {
      DEFAULT: '#13131E',
      elevated: '#1A1A2A',
      /** Sunken wells: inputs, button faces. */
      sunken: '#15151F',
      /** Modal sheets. */
      sheet: '#10101A',
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
      mid: '#5EA8F0',
      end: '#8B8CF8',
    },
    text: {
      primary: '#F5F6FA',
      secondary: '#B7BDCB',
      muted: '#747B8A',
      /** Small (<14px) muted text — the only grey that passes 4.5:1 on near-black. */
      soft: '#9AA0B4',
    },
    /** Disabled-control grey (volume rail, touchpad ring). */
    disabled: '#5E6472',
    /** Full-screen modal scrim. */
    scrim: '#05050A',
  },
} as const;

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  sheet: 28,
  pill: 999,
} as const;

export const control = { min: 44, sm: 44, md: 56, lg: 72 } as const;

export const type = {
  display: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    lineHeight: 34,
    color: '#F5F6FA',
  } as const,
  title: { fontFamily: 'Inter-SemiBold', fontSize: 20, lineHeight: 26, color: '#F5F6FA' } as const,
  heading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#F5F6FA',
  } as const,
  label: { fontFamily: 'Inter-Medium', fontSize: 14, lineHeight: 20, color: '#F5F6FA' } as const,
  status: { fontFamily: 'Inter-Medium', fontSize: 12, lineHeight: 16, color: '#B7BDCB' } as const,
  micro: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    color: '#747B8A',
  } as const,
} as const;

export const motion = {
  spring: SPRING,
  fadeDuration: 120,
  sheetOpenDuration: 200,
  sheetCloseDuration: 250,
} as const;

export const zIndex = {
  background: 0,
  content: 1,
  header: 2,
  sheet: 10,
  toast: 20,
  overlay: 30,
  voice: 40,
} as const;
