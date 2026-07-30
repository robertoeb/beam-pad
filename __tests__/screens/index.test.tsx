import { render, userEvent } from '@testing-library/react-native';
import IndexScreen from '@/app/index';
import { router } from 'expo-router';

describe('IndexScreen', () => {
  it('renders remote interface and navigates to settings', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<IndexScreen />);

    expect(getByLabelText('Settings')).toBeTruthy();
    expect(getByLabelText('Back')).toBeTruthy();
    expect(getByLabelText('Home')).toBeTruthy();

    await user.press(getByLabelText('Settings'));
    expect(router.push).toHaveBeenCalledWith('/settings');
  });
});
