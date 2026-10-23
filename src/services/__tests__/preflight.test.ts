import { preflight } from '../preflight';

describe('preflight', () => {
  const realFetch = globalThis.fetch;

  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it('returns ok:true when the TV responds', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue(true) as never;
    await expect(preflight('192.168.1.50', 50)).resolves.toEqual({ ok: true });
  });

  it('returns ok:true even when fetch rejects (no-cors networks)', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('no-cors')) as never;
    await expect(preflight('192.168.1.50', 50)).resolves.toEqual({ ok: true });
  });

  it('returns ok:true on timeout budget expiry', async () => {
    jest.useFakeTimers();
    globalThis.fetch = jest.fn(() => new Promise(() => {})) as never;
    const p = preflight('192.168.1.50', 300);
    jest.advanceTimersByTime(300);
    await expect(p).resolves.toEqual({ ok: true });
    jest.useRealTimers();
  });
});
