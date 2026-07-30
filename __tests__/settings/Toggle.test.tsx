import { render, userEvent } from '@testing-library/react-native';
import { Toggle } from '@/components/settings/Toggle';
import { useSettingsStore } from '@/stores/settings';

beforeEach(() => {
  useSettingsStore.setState({ reduceMotion: true });
});

describe('Toggle', () => {
  it('renders with switch role and checked state', async () => {
    const onChange = jest.fn();
    const { getByRole } = await render(
      <Toggle value={true} onValueChange={onChange} accessibilityLabel="Test toggle" />,
    );

    const toggle = getByRole('switch');
    expect(toggle).toBeTruthy();
    expect(toggle.props.accessibilityState.checked).toBe(true);
  });

  it('calls onValueChange when pressed', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { getByRole } = await render(
      <Toggle value={false} onValueChange={onChange} accessibilityLabel="Test toggle" />,
    );

    await user.press(getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { getByRole } = await render(
      <Toggle value={false} onValueChange={onChange} disabled accessibilityLabel="Test toggle" />,
    );

    await user.press(getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('reports disabled state in accessibilityState', async () => {
    const { getByRole } = await render(
      <Toggle value={false} onValueChange={() => {}} disabled accessibilityLabel="Test toggle" />,
    );

    expect(getByRole('switch').props.accessibilityState.disabled).toBe(true);
  });
});
