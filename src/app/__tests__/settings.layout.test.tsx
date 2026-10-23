import { render } from '@testing-library/react-native';
import SettingsLayout from '../settings/_layout';
import { Stack } from 'expo-router';

jest.mock('expo-router', () => ({
  __esModule: true,
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  Stack: jest.fn(() => null),
  Link: require('react-native').Text,
  useLocalSearchParams: jest.fn(() => ({})),
}));

describe('settings layout', () => {
  it('renders the settings stack', async () => {
    await render(<SettingsLayout />);
    expect(Stack).toHaveBeenCalled();
  });
});
