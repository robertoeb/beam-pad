import { render, userEvent } from '@testing-library/react-native';
import { SegmentedControl } from '@/components/settings/SegmentedControl';

describe('SegmentedControl', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C', disabled: true },
  ];

  it('renders all options', async () => {
    const { getByText } = await render(
      <SegmentedControl options={options} value="a" onChange={() => {}} />,
    );

    expect(getByText('Option A')).toBeTruthy();
    expect(getByText('Option B')).toBeTruthy();
    expect(getByText('Option C')).toBeTruthy();
  });

  it('calls onChange with selected value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { getByLabelText } = await render(
      <SegmentedControl options={options} value="a" onChange={onChange} />,
    );

    await user.press(getByLabelText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('marks selected option with accessibilityState selected', async () => {
    const { getByLabelText } = await render(
      <SegmentedControl options={options} value="a" onChange={() => {}} />,
    );

    expect(getByLabelText('Option A').props.accessibilityState.selected).toBe(true);
    expect(getByLabelText('Option B').props.accessibilityState.selected).toBe(false);
  });

  it('marks disabled option', async () => {
    const { getByLabelText } = await render(
      <SegmentedControl options={options} value="a" onChange={() => {}} />,
    );

    expect(getByLabelText('Option C').props.accessibilityState.disabled).toBe(true);
  });
});
