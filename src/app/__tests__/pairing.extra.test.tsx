import { render, fireEvent, act } from '@testing-library/react-native';
import PairingScreen from '../pairing';
import { useDevicesStore } from '@/stores/devices';
import { router, useLocalSearchParams } from 'expo-router';

const mockProtos: any[] = [];
let mockCb: any = null;

jest.mock('@/protocol/PairingProtocol', () => ({
  PairingProtocol: jest.fn().mockImplementation((_host: string, cb: any) => {
    mockCb = cb;
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

jest.mock('expo-router', () => ({
  __esModule: true,
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  Stack: () => null,
  Link: require('react-native').Text,
  useLocalSearchParams: jest.fn(() => ({})),
}));

const mockParams = useLocalSearchParams as jest.Mock;

beforeEach(() => {
  mockProtos.length = 0;
  mockCb = null;
  mockParams.mockReturnValue({ host: '192.168.1.50', port: '6467', name: 'Living Room' });
  useDevicesStore.setState({ found: {}, paired: {}, activeDeviceId: null });
  jest.clearAllMocks();
});

async function stepTo(s: string, err?: any) {
  await act(async () => {
    mockCb?.onStep(s, err);
  });
}

describe('PairingScreen extra paths', () => {
  it('submitting the full PIN calls submitCode', async () => {
    const { getByDisplayValue } = await render(<PairingScreen />);
    await stepTo('awaiting_code');
    const input = getByDisplayValue('');
    await fireEvent.changeText(input, '123456');
    expect(mockProtos[mockProtos.length - 1]!.submitCode).toHaveBeenCalledWith('123456');
  });

  it('CERT_REVOKED failure offers Re-pair which restarts the protocol', async () => {
    const { getByTestId } = await render(<PairingScreen />);
    const before = mockProtos.length;
    await stepTo('failed', {
      code: 'CERT_REVOKED',
      message: 'Certificate revoked.',
      steps: [],
      retryable: false,
    });
    await fireEvent.press(getByTestId('troubleshoot-repair'));
    expect(mockProtos.length).toBe(before + 1);
    expect(mockProtos[mockProtos.length - 1]!.start).toHaveBeenCalled();
  });

  it('copies diagnostics from the troubleshoot sheet', async () => {
    const { getByTestId } = await render(<PairingScreen />);
    await stepTo('failed', { code: 'WIFI_DROP', message: 'Lost.', steps: [], retryable: true });
    await fireEvent.press(getByTestId('troubleshoot-copy'));
  });

  it('header back cancels pairing and navigates back once', async () => {
    const { getByLabelText } = await render(<PairingScreen />);
    await fireEvent.press(getByLabelText('Back'));
    await fireEvent.press(getByLabelText('Back'));
    expect(router.back).toHaveBeenCalledTimes(1);
    expect(mockProtos[0]!.cancel).toHaveBeenCalled();
  });
});
