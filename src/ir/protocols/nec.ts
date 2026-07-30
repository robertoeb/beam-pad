import type { IrFrame } from '../types';

export function encodeNec(address: number, command: number): IrFrame {
  const T = 562;
  const pattern: number[] = [9000, 4500];
  const bytes = [address & 0xff, ~address & 0xff, command & 0xff, ~command & 0xff];
  for (const byte of bytes) {
    for (let i = 7; i >= 0; i--) {
      pattern.push(T, (byte >> i) & 1 ? T * 3 : T);
    }
  }
  pattern.push(T);
  return { frequency: 38028, pattern };
}
