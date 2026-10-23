import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useSettingsStore } from '@/stores/settings';

/**
 * Whether decorative motion should be suppressed. Honors the explicit
 * setting first; 'system' follows the OS reduce-motion preference.
 */
export function useReducedMotion(): boolean {
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    if (reduceMotion !== 'system') return;
    AccessibilityInfo.isReduceMotionEnabled?.().then(setSystemReduced).catch(() => {});
    const sub = AccessibilityInfo.addEventListener?.('reduceMotionChanged', setSystemReduced);
    return () => sub?.remove();
  }, [reduceMotion]);

  if (reduceMotion === true) return true;
  if (reduceMotion === false) return false;
  return systemReduced;
}
