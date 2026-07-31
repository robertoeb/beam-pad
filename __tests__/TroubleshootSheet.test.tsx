import { render, fireEvent } from '@testing-library/react-native';
import { TroubleshootSheet } from '@/components/TroubleshootSheet';
import type { ConnectError } from '@/protocol/errors';

jest.mock('react-native/Libraries/Components/Clipboard/Clipboard', () => ({
  __esModule: true,
  default: { setString: jest.fn() },
}));

function makeError(overrides: Partial<ConnectError> = {}): ConnectError {
  return {
    code: 'PORT_CLOSED',
    message: 'Your TV answered but its remote service is off.',
    steps: ['Step 1', 'Step 2'],
    retryable: true,
    ...overrides,
  };
}

describe('TroubleshootSheet', () => {
  it('renders error message and steps', async () => {
    const error = makeError();
    const { getByText } = await render(
      <TroubleshootSheet open={true} onClose={jest.fn()} error={error} />,
    );
    expect(getByText('Your TV answered but its remote service is off.')).toBeTruthy();
    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('Step 2')).toBeTruthy();
  });

  it('shows Retry when retryable', async () => {
    const error = makeError({ retryable: true });
    const onRetry = jest.fn();
    const { getByTestId } = await render(
      <TroubleshootSheet open={true} onClose={jest.fn()} error={error} onRetry={onRetry} />,
    );
    const btn = getByTestId('troubleshoot-retry');
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onRetry).toHaveBeenCalled();
  });

  it('hides Retry when not retryable', async () => {
    const error = makeError({ retryable: false, code: 'CERT_REVOKED' });
    const { queryByTestId } = await render(
      <TroubleshootSheet open={true} onClose={jest.fn()} error={error} onRetry={jest.fn()} />,
    );
    expect(queryByTestId('troubleshoot-retry')).toBeNull();
  });

  it('shows Re-pair for CERT_REVOKED', async () => {
    const error = makeError({ code: 'CERT_REVOKED', retryable: false });
    const onRepair = jest.fn();
    const { getByTestId } = await render(
      <TroubleshootSheet open={true} onClose={jest.fn()} error={error} onRepair={onRepair} />,
    );
    const btn = getByTestId('troubleshoot-repair');
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onRepair).toHaveBeenCalled();
  });

  it('diagnostics copy button is present', async () => {
    const error = makeError();
    const { getByTestId } = await render(
      <TroubleshootSheet
        open={true}
        onClose={jest.fn()}
        error={error}
        host="10.0.0.5"
        port={6466}
      />,
    );
    expect(getByTestId('troubleshoot-copy')).toBeTruthy();
  });
});
