import type { IrFrame } from '../types';

const H = 444;

export function encodeRc6(mode: number, address: number, command: number): IrFrame {
  const pattern: number[] = [2666, 889];

  const bits: number[] = [];
  for (let i = 2; i >= 0; i--) bits.push((mode >> i) & 1);
  bits.push(0);
  for (let i = 7; i >= 0; i--) bits.push((address >> i) & 1);
  for (let i = 7; i >= 0; i--) bits.push((command >> i) & 1);

  const push = (mark: boolean, dur: number) => {
    const lastIsMark = pattern.length % 2 === 1;
    if (pattern.length > 0 && lastIsMark === mark) {
      pattern[pattern.length - 1]! += dur;
    } else {
      pattern.push(dur);
    }
  };

  for (let idx = 0; idx < bits.length; idx++) {
    const b = bits[idx]!;
    const isTrailer = idx === 7;
    const cell = isTrailer ? H * 2 : H;
    if (b === 1) {
      push(true, cell);
      push(false, cell);
    } else {
      push(false, cell);
      push(true, cell);
    }
  }

  pattern.push(0);

  return { frequency: 36000, pattern };
}
