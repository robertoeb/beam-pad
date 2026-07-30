import { requireNativeModule } from 'expo-modules-core';

let Native: any = null;
try {
  Native = requireNativeModule('IrBlaster');
} catch {
  // Native module not yet compiled — will be available after prebuild
}

export interface IrRange {
  min: number;
  max: number;
}

export const IrBlaster = {
  hasIrEmitter: (): Promise<boolean> => Native?.hasIrEmitter() ?? Promise.resolve(false),
  getCarrierFrequencyRanges: (): Promise<IrRange[]> =>
    Native?.getCarrierFrequencyRanges() ?? Promise.resolve([]),
  transmit: (frequency: number, pattern: number[]): Promise<void> =>
    Native?.transmit(frequency, pattern) ?? Promise.resolve(),
};
