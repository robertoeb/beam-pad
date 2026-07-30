import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettingsStore, type Density } from '@/stores/settings';

export interface RemoteMetrics {
  dpad: number;
  actionSize: number;
  tile: number;
  gutter: number;
  zoneGap: number;
  showNowPlaying: boolean;
}

const HEADER_HEIGHT = 44;
const SHORTCUT_ROW_HEIGHT = 80;
const NOW_PLAYING_HEIGHT = 28;
const DENSITY_FACTOR: Record<Density, number> = {
  compact: 0.75,
  comfortable: 1,
  spacious: 1.25,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundEven(n: number): number {
  return Math.round(n / 2) * 2;
}

export function computeMetrics(
  frame: { width: number; height: number },
  insets: { top: number; bottom: number; left: number; right: number },
  density: Density,
): RemoteMetrics {
  const factor = DENSITY_FACTOR[density];
  const available = frame.height - insets.top - insets.bottom - HEADER_HEIGHT - SHORTCUT_ROW_HEIGHT;
  const dpad = roundEven(clamp(available * 0.62, 200, 288));
  const actionSize = dpad >= 240 ? 72 : 56;
  const tile = 64;
  const gutterBase = 16;
  const gutter = Math.round(gutterBase * factor);
  const zoneGapBase = 24;
  const zoneGap = Math.round(zoneGapBase * factor);
  const showNowPlaying = available > 560;

  return { dpad, actionSize, tile, gutter, zoneGap, showNowPlaying };
}

export function useRemoteMetrics(): RemoteMetrics {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const density = useSettingsStore((s) => s.density);
  return computeMetrics(frame, insets, density);
}

export { HEADER_HEIGHT, SHORTCUT_ROW_HEIGHT, NOW_PLAYING_HEIGHT };
