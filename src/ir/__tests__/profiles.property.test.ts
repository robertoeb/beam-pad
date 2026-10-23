import { IR_PROFILES, encodeCommand } from '../profiles';

describe('IR profiles property sweep', () => {
  it('every brands.json profile encodes power/volUp/volDown/mute', () => {
    expect(IR_PROFILES.length).toBeGreaterThan(0);
    for (const p of IR_PROFILES) {
      for (const cmd of ['power', 'volUp', 'volDown', 'mute'] as const) {
        const frame = encodeCommand(p, cmd);
        expect(frame).not.toBeNull();
      }
    }
  });

  it('carrier frequency is plausible (30kHz..60kHz)', () => {
    for (const p of IR_PROFILES) {
      const frame = encodeCommand(p, 'power');
      expect(frame).not.toBeNull();
      expect(frame!.frequency).toBeGreaterThanOrEqual(30000);
      expect(frame!.frequency).toBeLessThanOrEqual(60000);
    }
  });

  it('pattern is non-empty with no zero durations (odd mark-terminated NEC/RC5 allowed)', () => {
    for (const p of IR_PROFILES) {
      for (const cmd of ['power', 'volUp', 'volDown', 'mute'] as const) {
        const frame = encodeCommand(p, cmd);
        expect(frame).not.toBeNull();
        const pattern = frame!.pattern;
        expect(pattern.length).toBeGreaterThan(0);
        for (const d of pattern) {
          expect(d).toBeGreaterThan(0);
          expect(Number.isFinite(d)).toBe(true);
        }
      }
    }
  });

  it('unknown command returns null', () => {
    const frame = encodeCommand(IR_PROFILES[0]!, 'nope' as never);
    expect(frame).toBeNull();
  });
});
