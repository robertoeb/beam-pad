import { render, act } from '@testing-library/react-native';
import PairingScreen from '@/app/pairing';

let capturedCb: any = null;

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ host: '192.168.1.50', port: '6467', name: 'Apple TV' })),
  router: { back: jest.fn() },
}));

jest.mock('@/protocol/PairingProtocol', () => {
  return {
    PairingProtocol: jest.fn().mockImplementation((host: string, cb: any) => {
      capturedCb = cb;
      return {
        start: jest.fn(),
        submitCode: jest.fn(),
        getResult: jest.fn(() => null),
      };
    }),
  };
});

describe('PairingScreen', () => {
  it('renders loading step initially and pin input when awaiting code', async () => {
    const { getByText, getByDisplayValue } = await render(<PairingScreen />);
    expect(getByText('Contacting TV…')).toBeTruthy();

    await act(async () => {
      capturedCb?.onStep('awaiting_code');
    });

    expect(getByText('Enter the 6-character code shown on your TV')).toBeTruthy();
    expect(getByDisplayValue('')).toBeTruthy();
  });

  it('renders failure state on error', async () => {
    const { getByText } = await render(<PairingScreen />);

    await act(async () => {
      capturedCb?.onStep('failed', 'Invalid PIN entered');
    });

    expect(getByText('Pairing Failed')).toBeTruthy();
    expect(getByText('Invalid PIN entered')).toBeTruthy();
  });
});
