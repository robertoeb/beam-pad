import { render, userEvent } from '@testing-library/react-native';
import { MoreSheet } from '@/components/MoreSheet';
import { useLayoutStore } from '@/stores/layout';
import { getActiveClient } from '@/services/sessionManager';

jest.mock('@/services/sessionManager', () => ({
  getActiveClient: jest.fn(),
}));

beforeEach(() => {
  (getActiveClient as jest.Mock).mockReturnValue(null);
  useLayoutStore.setState({ moreSheetOpen: false });
});

describe('MoreSheet', () => {
  it('renders when closed', async () => {
    const { queryByTestId } = await render(<MoreSheet />);
    expect(queryByTestId('more-sheet')).toBeTruthy();
  });

  it('renders and responds to button interactions when open', async () => {
    const user = userEvent.setup();
    useLayoutStore.setState({ moreSheetOpen: true });
    const { getByLabelText } = await render(<MoreSheet />);

    await user.press(getByLabelText('Voice'));
    await user.press(getByLabelText('Cast'));
    await user.press(getByLabelText('Play'));
    await user.press(getByLabelText('Pause'));
    await user.press(getByLabelText('Rewind'));
    await user.press(getByLabelText('Fast forward'));
    await user.press(getByLabelText('Previous'));
    await user.press(getByLabelText('Next'));
    await user.press(getByLabelText('Stop'));
    await user.press(getByLabelText('Digit 1'));
    await user.press(getByLabelText('Channel up'));
    await user.press(getByLabelText('Source'));
    await user.press(getByLabelText('Red'));
    await user.press(getByLabelText('Blue'));
  });
});
