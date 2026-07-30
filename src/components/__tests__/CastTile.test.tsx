import { render, fireEvent } from '@testing-library/react-native';
import { CastTile } from '../CastTile';
import { useCastStore } from '@/stores/cast';
import CastContext from 'react-native-google-cast';

const mockShowCastDialog = CastContext.showCastDialog as jest.Mock;

beforeEach(() => {
  useCastStore.setState({
    discovering: false,
    connected: false,
    deviceName: undefined,
    mediaStatus: 'idle',
    mediaTitle: undefined,
    castSheetOpen: false,
  });
  mockShowCastDialog.mockClear();
});

describe('CastTile', () => {
  it('renders disconnected state with white icon', async () => {
    const { getByTestId } = await render(<CastTile />);
    expect(getByTestId('cast-icon-disconnected')).toBeTruthy();
  });

  it('renders connected state with cyan icon', async () => {
    useCastStore.setState({ connected: true, deviceName: 'TV' });
    const { getByTestId } = await render(<CastTile />);
    expect(getByTestId('cast-icon-connected')).toBeTruthy();
  });

  it('calls showCastDialog on press', async () => {
    const { getByTestId } = await render(<CastTile />);
    fireEvent.press(getByTestId('cast-tile'));
    expect(mockShowCastDialog).toHaveBeenCalled();
  });

  it('opens CastSheet on long press when connected', async () => {
    useCastStore.setState({ connected: true });
    const { getByTestId } = await render(<CastTile />);
    fireEvent(getByTestId('cast-tile'), 'longPress');
    expect(useCastStore.getState().castSheetOpen).toBe(true);
  });

  it('does not open CastSheet on long press when disconnected', async () => {
    const { getByTestId } = await render(<CastTile />);
    fireEvent(getByTestId('cast-tile'), 'longPress');
    expect(useCastStore.getState().castSheetOpen).toBe(false);
  });
});
