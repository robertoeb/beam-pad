import { render, userEvent } from '@testing-library/react-native';
import { PinInput } from '@/components/PinInput';

// Interaction-heavy suite (userEvent typing): CI runners can stall
// past the 5s default under load. 15s still catches real hangs.
jest.setTimeout(15_000);

describe('PinInput', () => {
  it('renders empty input by default', async () => {
    const onComplete = jest.fn();
    const { getByDisplayValue } = await render(<PinInput length={6} onComplete={onComplete} />);
    expect(getByDisplayValue('')).toBeTruthy();
  });

  it('filters invalid characters and invokes onComplete when length reached', async () => {
    const onComplete = jest.fn();
    const { getByDisplayValue } = await render(<PinInput length={4} onComplete={onComplete} />);
    const user = userEvent.setup();
    const input = getByDisplayValue('');

    await user.type(input, '12abZ!');

    expect(onComplete).toHaveBeenCalledWith('12AB');
  });

  it('exposes an accessible pairing-code label with digit progress', async () => {
    const { getByLabelText } = await render(<PinInput length={6} onComplete={jest.fn()} />);
    const input = getByLabelText('6-character pairing code');
    expect(input.props.accessibilityValue).toMatchObject({ max: 6 });
  });
});
