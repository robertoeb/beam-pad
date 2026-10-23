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

describe('app.config.ts launch artwork', () => {
  const config = require('../app.config').default;

  it('has a launcher icon', () => {
    expect(config.icon).toBe('./assets/icon.png');
  });

  it('has a dark splash matching the OLED theme', () => {
    expect(config.splash.image).toBe('./assets/icon.png');
    expect(config.splash.resizeMode).toBe('contain');
    expect(config.splash.backgroundColor).toBe('#0A0A12');
    expect(config.splash.dark?.backgroundColor).toBe('#0A0A12');
  });

  it('has an adaptive icon with monochrome variant', () => {
    const adaptive = config.android.adaptiveIcon;
    expect(adaptive.foregroundImage).toBe('./assets/adaptive-icon.png');
    expect(adaptive.monochromeImage).toBe('./assets/adaptive-icon-monochrome.png');
    expect(adaptive.backgroundColor).toBe('#0A0A12');
  });
});
