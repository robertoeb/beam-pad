import { useSettingsStore, SETTINGS_VERSION } from '../settings';

describe('settings migration', () => {
  it('migrates v0 haptics:false to hapticStrength:off', () => {
    const persistOptions = (useSettingsStore as any).persist.getOptions();
    const migrate = persistOptions.migrate;

    const v0Payload = {
      volumeTarget: 'tv-os',
      irProfileId: 'samsung-tv-nec',
      haptics: false,
      powerKeyMode: 'toggle',
      density: 'comfortable',
    };

    const migrated = migrate(v0Payload, 0);
    expect(migrated.hapticStrength).toBe('off');
    expect(migrated.irProfileId).toBe('samsung-tv-nec');
    expect(migrated.volumeTarget).toBe('tv-os');
  });

  it('migrates v0 haptics:true to hapticStrength:light', () => {
    const persistOptions = (useSettingsStore as any).persist.getOptions();
    const migrate = persistOptions.migrate;

    const v0Payload = {
      volumeTarget: 'ir',
      irProfileId: 'lg-tv-nec',
      haptics: true,
      powerKeyMode: 'sleep-wake',
      density: 'compact',
    };

    const migrated = migrate(v0Payload, 0);
    expect(migrated.hapticStrength).toBe('light');
    expect(migrated.irProfileId).toBe('lg-tv-nec');
    expect(migrated.volumeTarget).toBe('ir');
    expect(migrated.powerKeyMode).toBe('sleep-wake');
  });

  it('fills in missing keys with defaults on migration', () => {
    const persistOptions = (useSettingsStore as any).persist.getOptions();
    const migrate = persistOptions.migrate;

    const v0Payload = {
      volumeTarget: 'tv-os',
      haptics: true,
    };

    const migrated = migrate(v0Payload, 0);
    expect(migrated.volumeStep).toBe(1);
    expect(migrated.backDoubleTapHome).toBe(false);
    expect(migrated.okLongPress).toBe('voice');
    expect(migrated.wakeOnConnect).toBe(false);
    expect(migrated.irPerDevice).toEqual({});
    expect(migrated.irRepeatCount).toBe(1);
    expect(migrated.irGapMs).toBe(40);
  });

  it('does not overwrite existing hapticStrength at current version', () => {
    const persistOptions = (useSettingsStore as any).persist.getOptions();
    const migrate = persistOptions.migrate;

    const currentPayload = {
      volumeTarget: 'tv-os',
      haptics: true,
      hapticStrength: 'medium',
    };

    const migrated = migrate(currentPayload, SETTINGS_VERSION);
    expect(migrated.hapticStrength).toBe('medium');
  });
});
