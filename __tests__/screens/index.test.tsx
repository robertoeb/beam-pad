import { render } from '@testing-library/react-native';
import IndexScreen from '@/app/index';
import { getActiveClient } from '@/services/sessionManager';
import { KEYS } from '@/protocol/keycodes';

jest.mock('@/services/sessionManager', () => ({
  getActiveClient: jest.fn(),
}));

describe('IndexScreen', () => {
  it('renders remote interface and sends the TV settings key', async () => {
    const mockKeyPress = jest.fn();
    (getActiveClient as jest.Mock).mockReturnValue({ keyPress: mockKeyPress });

    const { getByLabelText, getAllByLabelText } = await render(<IndexScreen />);

    expect(getByLabelText('TV Settings')).toBeTruthy();
    expect(getByLabelText('Back')).toBeTruthy();
    expect(getByLabelText('Home')).toBeTruthy();
    expect(getAllByLabelText('Voice').length).toBeGreaterThanOrEqual(1);
    expect(getByLabelText('Keyboard')).toBeTruthy();

    const { press } = require('@testing-library/react-native').fireEvent;
    press(getByLabelText('TV Settings'));

    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.settings);
  });
});
