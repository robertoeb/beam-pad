import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settings';

export type HapticKind = 'light' | 'medium' | 'heavy' | 'selection';

/**
 * Single haptics entry point. Honors both the legacy `haptics` kill-switch
 * and `hapticStrength` (`off` disables everything; `medium` upgrades lights
 * to medium). Call this instead of `expo-haptics` directly so the settings
 * screen actually works.
 */
export function haptic(kind: HapticKind = 'light'): void {
  const { haptics, hapticStrength } = useSettingsStore.getState();
  if (!haptics || hapticStrength === 'off') return;
  const boosted = hapticStrength === 'medium' && kind === 'light';
  const style =
    kind === 'heavy'
      ? Haptics.ImpactFeedbackStyle.Heavy
      : kind === 'medium' || boosted
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light;
  if (kind === 'selection' && !boosted) {
    void Haptics.selectionAsync();
    return;
  }
  void Haptics.impactAsync(style);
}
