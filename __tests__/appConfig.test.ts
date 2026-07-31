import config from '../app.config';

describe('app.config.ts', () => {
  it('has newArchEnabled', () => {
    expect((config as any).newArchEnabled).toBe(true);
  });

  it('has platforms android only', () => {
    expect((config as any).platforms).toEqual(['android']);
  });

  it('includes the google-cast plugin', () => {
    const plugins = (config as any).plugins as any[];
    const cast = plugins.find((p) => (Array.isArray(p) ? p[0] : p) === 'react-native-google-cast');
    expect(cast).toBeDefined();
    expect(Array.isArray(cast) ? cast[1] : undefined).toEqual({ receiverAppId: 'CC1AD845' });
  });

  it('does not include ios platform', () => {
    const platforms = (config as any).platforms as string[];
    expect(platforms).not.toContain('ios');
  });
});
