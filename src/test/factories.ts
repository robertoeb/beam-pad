import type { PairedDevice } from '@/stores/devices';
import type { IrFrame } from '@/ir/types';
import type { IrProfile } from '@/ir/profiles';
import type { Shortcut } from '@/shortcuts/types';

export function aDevice(overrides: Partial<PairedDevice> = {}): PairedDevice {
  return {
    id: 'tv-1',
    name: 'Test TV',
    host: '192.168.1.100',
    port: 6466,
    certPem: 'FAKE_CERT',
    keyPem: 'FAKE_KEY',
    ...overrides,
  };
}

export function anIrProfile(overrides: Partial<IrProfile> = {}): IrProfile {
  return {
    id: 'test-tv-nec',
    brand: 'Test',
    deviceType: 'tv',
    protocol: 'nec',
    device: 7,
    commands: { power: 2, volUp: 7, volDown: 11, mute: 15 },
    verified: true,
    source: 'test',
    ...overrides,
  } as IrProfile;
}

export function aVolumeTelemetry(
  overrides: Partial<{ level: number; max: number; muted: boolean; playerModel: string }> = {},
) {
  return { level: 9, max: 20, muted: false, playerModel: 'TPM191E', ...overrides };
}

export function aShortcut(overrides: Partial<Shortcut> = {}): Shortcut {
  return {
    id: 'app:netflix',
    label: 'Netflix',
    action: { kind: 'app', appId: 'netflix' },
    icon: 'netflix',
    builtIn: true,
    ...overrides,
  };
}

export function anIrFrame(overrides: Partial<IrFrame> = {}): IrFrame {
  return { frequency: 38028, pattern: [9000, 4500, 560, 560], ...overrides };
}
