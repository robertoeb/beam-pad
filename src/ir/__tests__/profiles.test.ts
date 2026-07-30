import { IR_PROFILES, encodeCommand } from '../profiles';
import type { IrProtocol } from '../types';

const IMPLEMENTED_PROTOCOLS: IrProtocol[] = [
  'nec',
  'necx',
  'rc5',
  'rc6',
  'sirc12',
  'sirc15',
  'sirc20',
];

describe('IR profile database', () => {
  it('has unique ids', () => {
    const ids = IR_PROFILES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every profile uses an implemented protocol', () => {
    for (const p of IR_PROFILES) {
      expect(IMPLEMENTED_PROTOCOLS).toContain(p.protocol);
    }
  });

  it('every profile defines power, volUp, volDown, mute', () => {
    for (const p of IR_PROFILES) {
      expect(p.commands.power).toBeDefined();
      expect(p.commands.volUp).toBeDefined();
      expect(p.commands.volDown).toBeDefined();
      expect(p.commands.mute).toBeDefined();
    }
  });

  it('command values fit protocol bit-width', () => {
    for (const p of IR_PROFILES) {
      const maxCmd = p.protocol.startsWith('sirc') ? 127 : 255;
      for (const [name, val] of Object.entries(p.commands)) {
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(maxCmd);
      }
    }
  });

  it('verified is boolean', () => {
    for (const p of IR_PROFILES) {
      expect(typeof p.verified).toBe('boolean');
    }
  });

  it('encodeCommand returns a frame for every profile and command', () => {
    for (const p of IR_PROFILES) {
      for (const name of Object.keys(p.commands) as (keyof typeof p.commands)[]) {
        const frame = encodeCommand(p, name);
        expect(frame).not.toBeNull();
        expect(frame!.frequency).toBeGreaterThan(0);
        expect(frame!.pattern.length).toBeGreaterThan(0);
      }
    }
  });
});
