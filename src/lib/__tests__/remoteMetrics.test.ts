import { computeMetrics } from '@/lib/useRemoteMetrics';

const insets = { top: 47, bottom: 34, left: 0, right: 0 };

describe('computeMetrics', () => {
  it.each([
    ['390x844 compact', { width: 390, height: 844 }, 'compact' as const],
    ['390x844 comfortable', { width: 390, height: 844 }, 'comfortable' as const],
    ['390x844 spacious', { width: 390, height: 844 }, 'spacious' as const],
    ['412x915 compact', { width: 412, height: 915 }, 'compact' as const],
    ['412x915 comfortable', { width: 412, height: 915 }, 'comfortable' as const],
    ['412x915 spacious', { width: 412, height: 915 }, 'spacious' as const],
    ['360x640 compact', { width: 360, height: 640 }, 'compact' as const],
    ['360x640 comfortable', { width: 360, height: 640 }, 'comfortable' as const],
    ['360x640 spacious', { width: 360, height: 640 }, 'spacious' as const],
  ])('%s', (_label, frame, density) => {
    const m = computeMetrics(frame, insets, density);
    expect(m.dpad).toBeGreaterThanOrEqual(200);
    expect(m.dpad).toBeLessThanOrEqual(288);
    expect(m.dpad % 2).toBe(0);
    expect(m.actionSize).toBeGreaterThanOrEqual(44);
    expect(m.tile).toBeGreaterThanOrEqual(42);
    expect(m.gutter).toBeGreaterThan(0);
    expect(m.zoneGap).toBeGreaterThan(0);
    expect(typeof m.showNowPlaying).toBe('boolean');
  });

  it('dpad differs between 640-tall and 915-tall frames', () => {
    const small = computeMetrics({ width: 360, height: 640 }, insets, 'comfortable');
    const tall = computeMetrics({ width: 412, height: 915 }, insets, 'comfortable');
    expect(small.dpad).not.toBe(tall.dpad);
  });

  it('all targets stay >= 44 dp in all densities', () => {
    for (const density of ['compact', 'comfortable', 'spacious'] as const) {
      for (const frame of [
        { width: 390, height: 844 },
        { width: 412, height: 915 },
        { width: 360, height: 640 },
      ]) {
        const m = computeMetrics(frame, insets, density);
        expect(m.actionSize).toBeGreaterThanOrEqual(44);
        expect(m.dpad).toBeGreaterThanOrEqual(200);
      }
    }
  });

  it('tile and dpad scale with density', () => {
    const frame = { width: 390, height: 844 };
    const compact = computeMetrics(frame, insets, 'compact');
    const comfortable = computeMetrics(frame, insets, 'comfortable');
    const spacious = computeMetrics(frame, insets, 'spacious');
    expect(comfortable.tile).toBe(56);
    expect(compact.tile).toBeLessThan(comfortable.tile);
    expect(spacious.tile).toBeGreaterThan(comfortable.tile);
    expect(spacious.dpad).toBeGreaterThanOrEqual(comfortable.dpad);
    expect(comfortable.dpad).toBeGreaterThanOrEqual(compact.dpad);
  });

  it('compact has smaller gutter and zoneGap than spacious', () => {
    const frame = { width: 390, height: 844 };
    const compact = computeMetrics(frame, insets, 'compact');
    const spacious = computeMetrics(frame, insets, 'spacious');
    expect(compact.gutter).toBeLessThan(spacious.gutter);
    expect(compact.zoneGap).toBeLessThan(spacious.zoneGap);
  });

  it('showNowPlaying is true for tall frames, false for short', () => {
    const tall = computeMetrics({ width: 390, height: 844 }, insets, 'comfortable');
    const short = computeMetrics({ width: 360, height: 640 }, insets, 'comfortable');
    expect(tall.showNowPlaying).toBe(true);
    expect(short.showNowPlaying).toBe(false);
  });
});
