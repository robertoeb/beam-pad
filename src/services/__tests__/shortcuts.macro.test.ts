import { executeMacro, clampWait } from '../shortcuts';
import { getActiveClient } from '../sessionManager';
import { showToast } from '@/components/Toast';

jest.mock('../sessionManager', () => ({
  getActiveClient: jest.fn(),
}));

jest.mock('@/components/Toast', () => ({
  showToast: jest.fn(),
}));

const mockClient = {
  keyPress: jest.fn(),
  launchApp: jest.fn(),
};

const { getActiveClient: mockGetActive } = getActiveClient as any;

beforeEach(() => {
  jest.clearAllMocks();
  (getActiveClient as unknown as jest.Mock).mockReturnValue(mockClient);
});

describe('executeMacro', () => {
  it('executes steps in order', async () => {
    const steps = [
      { type: 'key' as const, keyCode: 1 },
      { type: 'wait' as const, ms: 100 },
      { type: 'key' as const, keyCode: 2 },
    ];
    const result = await executeMacro(steps);
    expect(result).toBe(true);
    expect(mockClient.keyPress).toHaveBeenCalledTimes(2);
    expect(mockClient.keyPress).toHaveBeenNthCalledWith(1, 1);
    expect(mockClient.keyPress).toHaveBeenNthCalledWith(2, 2);
  });

  it('clamps wait times', () => {
    expect(clampWait(10)).toBe(50);
    expect(clampWait(5000)).toBe(3000);
    expect(clampWait(500)).toBe(500);
  });

  it('aborts on disconnect', async () => {
    (getActiveClient as unknown as jest.Mock).mockReturnValue(null);
    const steps = [{ type: 'key' as const, keyCode: 1 }];
    const result = await executeMacro(steps);
    expect(result).toBe(false);
    expect(showToast).toHaveBeenCalledWith('Macro aborted - TV disconnected');
  });

  it('aborts mid-macro if disconnect happens', async () => {
    let callCount = 0;
    (getActiveClient as unknown as jest.Mock).mockImplementation(() => {
      callCount++;
      if (callCount <= 2) return mockClient;
      return null;
    });

    const steps = [
      { type: 'key' as const, keyCode: 1 },
      { type: 'wait' as const, ms: 50 },
      { type: 'key' as const, keyCode: 2 },
    ];
    const result = await executeMacro(steps);
    expect(result).toBe(false);
    expect(showToast).toHaveBeenCalledWith('Macro aborted - TV disconnected');
  });

  it('shows single toast on failure', async () => {
    (getActiveClient as unknown as jest.Mock).mockReturnValue(null);
    await executeMacro([{ type: 'key', keyCode: 1 }]);
    expect(showToast).toHaveBeenCalledTimes(1);
  });
});
