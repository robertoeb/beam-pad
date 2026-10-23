import { render, act, fireEvent } from '@testing-library/react-native';
import PairingScreen from '../pairing';
import { useDevicesStore } from '@/stores/devices';
import { router, useLocalSearchParams } from 'expo-router';

const mockProtos: any[] = [];
const mockCbSlot: { cb: any } = { cb: null };

jest.mock('expo-router', () => ({
  __esModule: true,
  router: { push: jest.fn(), back: jest.fn() },
  Stack: () => null,
  Link: require('react-native').Text,
  useLocalSearchParams: jest.fn(() => ({})),
}));

jest.mock('@/protocol/PairingProtocol', () => ({
  PairingProtocol: jest.fn().mockImplementation((_host: string, cb: any) => {
    mockCbSlot.cb = cb;
    const proto = {
      start: jest.fn(),
      submitCode: jest.fn(),
      cancel: jest.fn(),
      getResult: jest.fn(() => ({ certPem: 'CERT', keyPem: 'KEY' })),
    };
    mockProtos.push(proto);
    return proto;
  }),
}));

jest.mock('@/components/TroubleshootSheet', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    TroubleshootSheet: ({ open }: any) => (open ? React.createElement(View, { testID: 'troubleshoot' }) : null),
  };
});

const mockParams = useLocalSearchParams as jest.Mock;

beforeEach(() => {
  mockProtos.length = 0;
  mockCbSlot.cb = null;
  mockParams.mockReturnValue({ host: '192.168.1.50', port: '6467', name: 'Living Room' });
  useDevicesStore.setState({ found: {}, paired: {}, activeDeviceId: null });
  jest.clearAllMocks();
});

async function stepTo(s: string, err?: any) {
  await act(async () => {
    mockCbSlot.cb?.onStep(s, err);
  });
}

describe('PairingScreen states', () => {
  it.each([
    ['probing', 'Contacting TV…'],
    ['connecting', 'Contacting TV…'],
    ['request', 'Contacting TV…'],
    ['option', 'Contacting TV…'],
    ['configuration', 'Contacting TV…'],
    ['secret', 'Verifying code…'],
  ])('working step %s shows progress copy', async (step, copy) => {
    const { getByText } = await render(<PairingScreen />);
    await stepTo(step);
    expect(getByText(copy as string)).toBeTruthy();
  });

  it('awaiting_code shows pin entry', async () => {
    const { getByText } = await render(<PairingScreen />);
    await stepTo('awaiting_code');
    expect(getByText('Enter the code on your TV')).toBeTruthy();
  });

  it('done persists device with cert and navigates back', async () => {
    await render(<PairingScreen />);
    await stepTo('done');
    const paired = useDevicesStore.getState().paired['192.168.1.50'];
    expect(paired).toMatchObject({ certPem: 'CERT', keyPem: 'KEY', name: 'Living Room' });
    expect(useDevicesStore.getState().activeDeviceId).toBe('192.168.1.50');
    expect(router.back).toHaveBeenCalled();
  });

  it('guard: no persist before the done step', async () => {
    await render(<PairingScreen />);
    for (const s of ['connecting', 'awaiting_code', 'secret']) {
      await stepTo(s);
      expect(useDevicesStore.getState().paired).toEqual({});
    }
  });

  it('failed shows error with retry when retryable, retry restarts protocol', async () => {
    const { getByText } = await render(<PairingScreen />);
    const before = mockProtos.length;
    await stepTo('failed', { code: 'WIFI_DROP', message: 'Lost Wi-Fi.', retryable: true });
    expect(getByText('Pairing Failed')).toBeTruthy();
    await fireEvent.press(getByText('Retry'));
    expect(mockProtos.length).toBe(before + 1);
    expect(mockProtos[mockProtos.length - 1]!.start).toHaveBeenCalled();
  });

  it('failed without retryable flag offers Try again button', async () => {
    const { getByText } = await render(<PairingScreen />);
    await stepTo('failed', { code: 'NOPE', message: 'Nope.', retryable: false });
    await fireEvent.press(getByText('Try again'));
    expect(mockProtos[mockProtos.length - 1]!.start).toHaveBeenCalled();
  });

  it('cancelled navigates back once', async () => {
    await render(<PairingScreen />);
    await stepTo('cancelled');
    expect(router.back).toHaveBeenCalledTimes(1);
  });
});
