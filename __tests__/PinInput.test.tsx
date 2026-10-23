import { render, userEvent } from '@testing-library/react-native';
import { PinInput } from '@/components/PinInput';

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
});
