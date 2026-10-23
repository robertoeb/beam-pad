import { render, act } from '@testing-library/react-native';
import PairingScreen from '@/app/pairing';

const capturedCbSlot: { cb: any } = { cb: null };

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ host: '192.168.1.50', port: '6467', name: 'Apple TV' })),
  router: { back: jest.fn() },
}));

jest.mock('@/protocol/PairingProtocol', () => {
  return {
    PairingProtocol: jest.fn().mockImplementation((_host: string, cb: any) => {
      capturedCbSlot.cb = cb;
      return {
        start: jest.fn(),
        submitCode: jest.fn(),
        cancel: jest.fn(),
        getResult: jest.fn(() => null),
      };
    }),
  };
});

jest.mock('@/components/TroubleshootSheet', () => ({
  TroubleshootSheet: ({ open }: any) => {
    if (!open) return null;
    const React = require('react');
    const { View, Text } = require('react-native');
    return React.createElement(
      View,
      { testID: 'troubleshoot-sheet' },
      React.createElement(Text, null, 'Troubleshoot content'),
    );
  },
}));

describe('PairingScreen', () => {
  it('renders loading step initially and pin input when awaiting code', async () => {
    const { getByText, getByDisplayValue } = await render(<PairingScreen />);
    expect(getByText('Contacting TV…')).toBeTruthy();

    await act(async () => {
      capturedCbSlot.cb?.onStep('awaiting_code');
    });

    expect(getByText('Enter the code on your TV')).toBeTruthy();
    expect(getByDisplayValue('')).toBeTruthy();
  });

  it('renders failure state on error', async () => {
    const { getByText } = await render(<PairingScreen />);

    await act(async () => {
      capturedCbSlot.cb?.onStep('failed', {
        code: 'PAIRING_REJECTED',
        message: 'The TV rejected the pairing request.',
        steps: ['Try again'],
        retryable: true,
      });
    });

    expect(getByText('Pairing Failed')).toBeTruthy();
    expect(getByText('The TV rejected the pairing request.')).toBeTruthy();
  });

  it('navigates back when the pairing is cancelled by the TV', async () => {
    const { router } = require('expo-router');
    await render(<PairingScreen />);

    await act(async () => {
      capturedCbSlot.cb?.onStep('cancelled');
    });

    expect(router.back).toHaveBeenCalled();
  });
});
