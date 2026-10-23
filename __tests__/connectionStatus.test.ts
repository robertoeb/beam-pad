import { statusFor } from '@/components/ConnectionStatus';

describe('statusFor', () => {
  it('maps ACTIVE to cyan without pulse', () => {
    expect(statusFor('ACTIVE')).toEqual({ color: '#22D3EE', label: 'Connected', pulse: false });
  });

  it('maps ERROR_STATE to red without pulse', () => {
    expect(statusFor('ERROR_STATE')).toEqual({
      color: '#FF453A',
      label: 'Connection error',
      pulse: false,
    });
  });

  it('maps IDLE to grey without pulse', () => {
    expect(statusFor('IDLE')).toEqual({ color: '#747B8A', label: 'Not connected', pulse: false });
  });

  it.each(['CONNECTING', 'CONFIGURING', 'RECONNECTING'] as const)(
    'maps %s to grey with pulse',
    (state) => {
      const status = statusFor(state);
      expect(status.color).toBe('#747B8A');
      expect(status.pulse).toBe(true);
    },
  );
});
