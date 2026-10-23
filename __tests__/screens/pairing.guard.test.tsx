import { render, act } from '@testing-library/react-native';
import PairingScreen from '@/app/pairing';
import { useDevicesStore } from '@/stores/devices';

let capturedCb: any = null;
let mockPairingResult: any = null;

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ host: '192.168.1.50', name: 'Living Room TV' })),
  router: { back: jest.fn() },
}));

jest.mock('@/protocol/PairingProtocol', () => {
  return {
    PairingProtocol: jest.fn().mockImplementation((_host: string, cb: any) => {
      capturedCb = cb;
      return {
        start: jest.fn(),
        submitCode: jest.fn(),
        cancel: jest.fn(),
        getResult: jest.fn(() => mockPairingResult),
      };
    }),
  };
});

jest.mock('@/components/TroubleshootSheet', () => ({
  TroubleshootSheet: () => null,
}));

describe('PairingScreen persist guard', () => {
  beforeEach(() => {
    mockPairingResult = null;
    useDevicesStore.setState({ paired: {}, activeDeviceId: null });
  });

  it('does not persist a device when getResult() is null', async () => {
    const addPaired = jest.fn();
    useDevicesStore.setState({ addPaired });
    await render(<PairingScreen />);

    await act(async () => {
      capturedCb?.onStep('done');
    });

    expect(addPaired).not.toHaveBeenCalled();
  });

  it('does not persist a device when PEMs are empty', async () => {
    mockPairingResult = { certPem: '', keyPem: '' };
    const addPaired = jest.fn();
    useDevicesStore.setState({ addPaired });
    await render(<PairingScreen />);

    await act(async () => {
      capturedCb?.onStep('done');
    });

    expect(addPaired).not.toHaveBeenCalled();
  });

  it('persists the device when both PEMs are present', async () => {
    mockPairingResult = { certPem: 'CERT', keyPem: 'KEY' };
    const addPaired = jest.fn();
    useDevicesStore.setState({ addPaired });
    await render(<PairingScreen />);

    await act(async () => {
      capturedCb?.onStep('done');
    });

    expect(addPaired).toHaveBeenCalledWith(
      expect.objectContaining({ certPem: 'CERT', keyPem: 'KEY' }),
    );
  });
});
