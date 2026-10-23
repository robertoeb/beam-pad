import { executeMacro, fireShortcut } from '../shortcuts';
import { getActiveClient } from '../session';
import { showToast } from '@/components/Toast';
import { shortcutRegistry } from '@/shortcuts/registry';
import { KEYS } from '@/protocol/keycodes';

jest.mock('../session', () => ({
  getClient: jest.fn(),
  getActiveClient: jest.fn(),
}));

jest.mock('@/components/Toast', () => ({
  showToast: jest.fn(),
}));

const mockClient = {
  keyPress: jest.fn(),
  launchApp: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (getActiveClient as unknown as jest.Mock).mockReturnValue(mockClient);
});

describe('executeMacro branches', () => {
  it('runs app steps via deep link', async () => {
    const ok = await executeMacro([{ type: 'app', appId: 'netflix' }]);
    expect(ok).toBe(true);
    expect(mockClient.launchApp).toHaveBeenCalledWith(expect.stringContaining('netflix'));
  });

  it('fails app steps for unknown app ids', async () => {
    const ok = await executeMacro([{ type: 'app', appId: 'no-such-app' }]);
    expect(ok).toBe(false);
  });

  it('returns false when a step fails mid-macro', async () => {
    const ok = await executeMacro([
      { type: 'key', keyCode: KEYS.home },
      { type: 'app', appId: 'no-such-app' },
    ]);
    expect(ok).toBe(false);
    expect(showToast).toHaveBeenCalledWith('Macro step failed');
  });

  it('empty macro succeeds trivially', async () => {
    await expect(executeMacro([])).resolves.toBe(true);
  });
});

describe('fireShortcut branches', () => {
  it('returns false for unknown shortcut ids', () => {
    jest.spyOn(shortcutRegistry, 'resolve').mockReturnValueOnce(null);
    expect(fireShortcut('nope')).toBe(false);
  });

  it('toasts when no TV is connected', () => {
    (getActiveClient as unknown as jest.Mock).mockReturnValue(null);
    jest.spyOn(shortcutRegistry, 'resolve').mockReturnValueOnce({
      id: 'key:power',
      label: 'Power',
      action: { kind: 'key', keyCode: KEYS.power },
      icon: 'power',
      builtIn: true,
    });
    expect(fireShortcut('key:power')).toBe(false);
    expect(showToast).toHaveBeenCalledWith('No TV connected - pick a device');
  });

  it('fires key shortcuts', () => {
    jest.spyOn(shortcutRegistry, 'resolve').mockReturnValueOnce({
      id: 'key:home',
      label: 'Home',
      action: { kind: 'key', keyCode: KEYS.home },
      icon: 'home',
      builtIn: true,
    });
    expect(fireShortcut('key:home')).toBe(true);
    expect(mockClient.keyPress).toHaveBeenCalledWith(KEYS.home);
  });

  it('fires app shortcuts and rejects unknown apps', () => {
    jest.spyOn(shortcutRegistry, 'resolve').mockReturnValueOnce({
      id: 'app:netflix',
      label: 'Netflix',
      action: { kind: 'app', appId: 'netflix' },
      icon: 'netflix',
      builtIn: true,
    });
    expect(fireShortcut('app:netflix')).toBe(true);

    jest.spyOn(shortcutRegistry, 'resolve').mockReturnValueOnce({
      id: 'app:ghost',
      label: 'Ghost',
      action: { kind: 'app', appId: 'ghost' },
      icon: 'x',
      builtIn: true,
    });
    expect(fireShortcut('app:ghost')).toBe(false);
  });

  it('fires macro shortcuts without awaiting', () => {
    jest.spyOn(shortcutRegistry, 'resolve').mockReturnValueOnce({
      id: 'user:m1',
      label: 'Macro',
      action: { kind: 'macro', steps: [{ type: 'key', keyCode: KEYS.home }] },
      icon: 'x',
      builtIn: false,
    });
    expect(fireShortcut('user:m1')).toBe(true);
  });

  it('ir shortcuts return false (handled by IR path)', () => {
    jest.spyOn(shortcutRegistry, 'resolve').mockReturnValueOnce({
      id: 'user:ir1',
      label: 'IR',
      action: { kind: 'ir', command: 'power' },
      icon: 'x',
      builtIn: false,
    });
    expect(fireShortcut('user:ir1')).toBe(false);
  });
});
