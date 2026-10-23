import { haptic } from '../haptics';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settings';

beforeEach(() => {
  (Haptics.impactAsync as jest.Mock).mockClear();
  (Haptics.selectionAsync as jest.Mock).mockClear();
  useSettingsStore.setState({ haptics: true, hapticStrength: 'light' });
});

describe('haptic', () => {
  it('is a no-op when strength is off', () => {
    useSettingsStore.setState({ hapticStrength: 'off' });
    haptic('light');
    haptic('heavy');
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('is a no-op when the legacy haptics switch is off', () => {
    useSettingsStore.setState({ haptics: false, hapticStrength: 'medium' });
    haptic('medium');
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('fires Light for light at light strength', () => {
    haptic('light');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('upgrades light to Medium at medium strength', () => {
    useSettingsStore.setState({ hapticStrength: 'medium' });
    haptic('light');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
  });

  it('fires Heavy for heavy regardless of strength', () => {
    haptic('heavy');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
  });
});
