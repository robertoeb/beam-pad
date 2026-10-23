import { render, fireEvent, act } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../ui/Card';
import { Skeleton, SkeletonRow } from '../ui/Skeleton';
import { MuteButton } from '../MuteButton';
import { MicButton } from '../MicButton';
import { VolumeControl } from '../VolumeControl';
import { AppIcon } from '../AppIcon';
import { VoiceOverlay } from '../VoiceOverlay';
import { CastSheet } from '../CastSheet';
import { ImeSheet } from '../ImeSheet';
import { TroubleshootSheet } from '../TroubleshootSheet';
import { NowPlayingStrip } from '../NowPlayingStrip';
import { AppGrid } from '../AppGrid';
import { ReorderableGrid } from '../ReorderableGrid';
import { TouchPad } from '../TouchPad';
import { useConnectionStore } from '@/stores/connection';
import { useCastStore } from '@/stores/cast';
import { useImeStore } from '@/stores/ime';
import { useLayoutStore } from '@/stores/layout';
import { key } from '@/lib/key';
import { KEYS } from '@/protocol/keycodes';

jest.mock('@/lib/key', () => ({
  key: jest.fn(),
}));

beforeEach(() => {
  (key as jest.Mock).mockClear();
});

describe('component smoke coverage', () => {
  it('Card renders padded and unpadded', async () => {
    const a = await render(
      <Card>
        <Text>Padded</Text>
      </Card>,
    );
    expect(a.getByText('Padded')).toBeTruthy();
    const b = await render(
      <Card padded={false} testID="card-plain">
        <Text>Plain</Text>
      </Card>,
    );
    expect(b.getByText('Plain')).toBeTruthy();
  });

  it('Skeleton and SkeletonRow render', async () => {
    const { toJSON } = await render(<Skeleton width={120} height={16} />);
    expect(toJSON()).toBeTruthy();
    const row = await render(<SkeletonRow />);
    expect(row.toJSON()).toBeTruthy();
  });

  it('MuteButton toggles icon by muted state and handles presses', async () => {
    useConnectionStore.setState({ volume: undefined });
    const a = await render(<MuteButton />);
    expect(a.getByLabelText('Mute')).toBeTruthy();
    await fireEvent(a.getByLabelText('Mute'), 'onPressIn', {});
    await fireEvent(a.getByLabelText('Mute'), 'onPressOut', {});
    await fireEvent.press(a.getByLabelText('Mute'));

    useConnectionStore.setState({
      volume: { level: 5, max: 20, muted: true, playerModel: 'X' },
    });
    const b = await render(<MuteButton />);
    expect(b.getByLabelText('Mute')).toBeTruthy();
  });

  it('MicButton renders holding/idle and forwards handlers', async () => {
    const handlers = { in: jest.fn(), out: jest.fn(), press: jest.fn() };
    const idle = await render(
      <MicButton voiceHolding={false} onPressIn={handlers.in} onPressOut={handlers.out} onPress={handlers.press} />,
    );
    await fireEvent(idle.getByLabelText('Voice'), 'onPressIn', {});
    await fireEvent(idle.getByLabelText('Voice'), 'onPressOut', {});
    await fireEvent.press(idle.getByLabelText('Voice'));
    expect(handlers.in).toHaveBeenCalled();
    expect(handlers.out).toHaveBeenCalled();
    expect(handlers.press).toHaveBeenCalled();

    const holding = await render(
      <MicButton voiceHolding onPressIn={handlers.in} onPressOut={handlers.out} onPress={handlers.press} />,
    );
    expect(holding.getByLabelText('Voice')).toBeTruthy();
  });

  it('VolumeControl renders empty/muted/level states and presses buttons', async () => {
    useConnectionStore.setState({ volume: undefined });
    const a = await render(<VolumeControl />);
    await fireEvent.press(a.getByLabelText('Volume up'));
    await fireEvent.press(a.getByLabelText('Volume down'));

    useConnectionStore.setState({
      volume: { level: 0, max: 0, muted: false, playerModel: 'X' },
    });
    const b = await render(<VolumeControl />);
    expect(b.toJSON()).toBeTruthy();

    useConnectionStore.setState({
      volume: { level: 9, max: 20, muted: true, playerModel: 'X' },
    });
    const c = await render(<VolumeControl />);
    expect(c.getByText('0')).toBeTruthy();
  });

  it('AppIcon renders default and square variants', async () => {
    const a = await render(<AppIcon appId="netflix" name="Netflix" color="#E50914" />);
    expect(a.toJSON()).toBeTruthy();
    const b = await render(
      <AppIcon appId="youtube" name="YouTube" color="#FF0000" size={48} rounded={false} />,
    );
    expect(b.toJSON()).toBeTruthy();
  });

  it('VoiceOverlay renders active and inactive', async () => {
    const a = await render(<VoiceOverlay active={false} />);
    expect(a.toJSON()).toBeTruthy();
    const b = await render(<VoiceOverlay active />);
    expect(b.toJSON()).toBeTruthy();
  });

  it('CastSheet renders closed, open idle, and open playing', async () => {
    const closed = await render(<CastSheet />);
    expect(closed.queryByTestId('cast-sheet')).toBeNull();

    useCastStore.setState({
      castSheetOpen: true,
      deviceName: 'Living Room',
      mediaTitle: undefined,
      mediaStatus: 'idle',
    });
    const open = await render(<CastSheet />);
    expect(open.getByTestId('cast-device-name')).toBeTruthy();
    await fireEvent.press(open.getByTestId('cast-play-pause'));

    useCastStore.setState({ mediaTitle: 'Movie', mediaStatus: 'playing' });
    const playing = await render(<CastSheet />);
    expect(playing.getByTestId('cast-media-title')).toBeTruthy();
    await fireEvent.press(playing.getByTestId('cast-stop'));
  });

  it('ImeSheet shows field, edits text, and dismisses', async () => {
    const hidden = await render(<ImeSheet />);
    expect(hidden.toJSON()).toBeTruthy();
    useImeStore.getState().showField({
      counterField: 1,
      label: 'Search',
      value: '',
      start: 0,
      end: 0,
    });
    const shown = await render(<ImeSheet />);
    await fireEvent.changeText(shown.getByTestId('ime-input'), 'hello');
    await fireEvent.press(shown.getByTestId('ime-done'));
    expect(useImeStore.getState().visible).toBe(false);
  });

  it('TroubleshootSheet renders closed and open error variants', async () => {
    const noop = () => {};
    const closed = await render(
      <TroubleshootSheet open={false} onClose={noop} error={undefined} />,
    );
    expect(closed.toJSON()).toBeTruthy();

    const err = {
      code: 'WIFI_OFF',
      message: 'Wi-Fi is off',
      steps: ['Turn on Wi-Fi', 'Retry'],
      retryable: true,
    };
    const onRetry = jest.fn();
    const open = await render(
      <TroubleshootSheet open onClose={noop} error={err as never} host="1.2.3.4" port={6466} onRetry={onRetry} />,
    );
    await fireEvent.press(open.getByTestId('troubleshoot-retry'));
    expect(onRetry).toHaveBeenCalled();

    const onRepair = jest.fn();
    const revoked = await render(
      <TroubleshootSheet
        open
        onClose={noop}
        error={{ ...err, code: 'CERT_REVOKED', detail: 'revoked' } as never}
        onRepair={onRepair}
      />,
    );
    expect(revoked.toJSON()).toBeTruthy();
  });

  it('NowPlayingStrip renders reconnecting, empty, and playing states', async () => {
    useConnectionStore.setState({ state: 'RECONNECTING' });
    const r = await render(<NowPlayingStrip />);
    expect(r.getByText('RECONNECTING')).toBeTruthy();

    useConnectionStore.setState({ state: 'ACTIVE', currentApp: undefined, volume: undefined });
    const empty = await render(<NowPlayingStrip />);
    expect(empty.queryByText('RECONNECTING')).toBeNull();

    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
      volume: { level: 10, max: 20, muted: false, playerModel: 'X' },
    });
    const playing = await render(<NowPlayingStrip />);
    expect(playing.toJSON()).toBeTruthy();
  });

  it('AppGrid renders view and edit modes', async () => {
    useLayoutStore.setState({ shortcuts: ['app:netflix', 'app:youtube'] });
    const view = await render(<AppGrid edit={false} />);
    expect(view.toJSON()).toBeTruthy();
    const edit = await render(<AppGrid edit />);
    expect(edit.toJSON()).toBeTruthy();
  });

  it('ReorderableGrid renders editable and locked', async () => {
    const renderItem = (id: string) => <Text>{id}</Text>;
    const locked = await render(
      <ReorderableGrid data={['a', 'b']} onChange={() => {}} editable={false} renderItem={renderItem} />,
    );
    expect(locked.getByText('a')).toBeTruthy();
    const editable = await render(
      <ReorderableGrid data={['a', 'b', 'c']} onChange={() => {}} editable renderItem={renderItem} columns={2} />,
    );
    expect(editable.getByText('c')).toBeTruthy();
  });

  it('TouchPad handles tap, swipe, and terminate gestures', async () => {
    const { getByLabelText } = await render(<TouchPad size={200} />);
    const pad = getByLabelText('Touchpad - swipe to navigate, tap to select') as {
      props: Record<string, (e: unknown) => void>;
    };
    const invoke = (name: string, e: unknown) =>
      act(async () => {
        (pad.props[name] as (ev: unknown) => void)(e);
      });
    const grant = (x: number, y: number, t = 1) =>
      invoke('onResponderGrant', {
        nativeEvent: { pageX: x, pageY: y, timestamp: t },
        touchHistory: {
          touchBank: {
            0: {
              touchActive: true,
              startPageX: x,
              startPageY: y,
              startTimeStamp: t,
              currentPageX: x,
              currentPageY: y,
              currentTimeStamp: t,
              previousPageX: x,
              previousPageY: y,
              previousTimeStamp: t,
            },
          },
          numberActiveTouches: 1,
          indexOfSingleActiveTouch: 0,
          mostRecentTimeStamp: t,
        },
      });
    const move = (x: number, y: number, t = 2) =>
      invoke('onResponderMove', {
        nativeEvent: { pageX: x, pageY: y, timestamp: t },
        touchHistory: {
          touchBank: {
            0: {
              touchActive: true,
              startPageX: x - 120,
              startPageY: y,
              startTimeStamp: 1,
              currentPageX: x,
              currentPageY: y,
              currentTimeStamp: t,
              previousPageX: x,
              previousPageY: y,
              previousTimeStamp: t,
            },
          },
          numberActiveTouches: 1,
          indexOfSingleActiveTouch: 0,
          mostRecentTimeStamp: t,
        },
      });

    // Tap (no movement) selects OK.
    await grant(100, 100);
    await invoke('onResponderRelease', { nativeEvent: {} });
    expect(key).toHaveBeenCalledWith(KEYS.ok);

    // Swipe right then terminate mid-gesture.
    (key as jest.Mock).mockClear();
    await grant(0, 0);
    await move(120, 2);
    expect(key).toHaveBeenCalledWith(KEYS.right);
    await invoke('onResponderTerminate', { nativeEvent: {} });

    // Small wobble below threshold sends nothing.
    (key as jest.Mock).mockClear();
    await grant(50, 50, 10);
    await move(55, 52, 11);
    expect(key).not.toHaveBeenCalled();
    await invoke('onResponderRelease', { nativeEvent: {} });
  });
});
