import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import { Text } from 'react-native';
import { ReorderableGrid } from '../ReorderableGrid';

interface CellHandlers {
  onMoveShouldSetResponderCapture: (e: never, g?: never) => unknown;
  onMoveShouldSetResponder: (e: never, g?: never) => unknown;
  onResponderGrant: (e: never, g?: never) => unknown;
  onResponderMove: (e: never, g?: never) => unknown;
  onResponderRelease: (e: never, g?: never) => unknown;
}

// Minimal synthetic touch history shaped like RN's responder events — enough
// for PanResponder's centroid math (TouchHistoryMath reads touchBank).
function touchEvent(pageX: number, pageY: number, time: number) {
  const track = {
    touchActive: true,
    startPageX: pageX,
    startPageY: pageY,
    currentPageX: pageX,
    currentPageY: pageY,
    previousPageX: pageX,
    previousPageY: pageY,
    startTimeStamp: 0,
    currentTimeStamp: time,
  };
  return {
    nativeEvent: { touches: [track] },
    touchHistory: {
      touchBank: [track],
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: time,
    },
  } as never;
}

function moveEvent(fromX: number, toX: number, time: number) {
  const track = {
    touchActive: true,
    startPageX: fromX,
    startPageY: 0,
    currentPageX: toX,
    currentPageY: 0,
    previousPageX: fromX,
    previousPageY: 0,
    startTimeStamp: 0,
    currentTimeStamp: time,
  };
  return {
    nativeEvent: { touches: [track] },
    touchHistory: {
      touchBank: [track],
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: time,
    },
  } as never;
}

function renderGrid(props?: Partial<React.ComponentProps<typeof ReorderableGrid>>) {
  const onChange = jest.fn();
  const onActiveChange = jest.fn();
  let tree!: ReactTestRenderer;
  act(() => {
    tree = create(
      <ReorderableGrid
        data={['a', 'b', 'c', 'd']}
        onChange={onChange}
        editable
        columns={4}
        onActiveChange={onActiveChange}
        renderItem={(id) => <Text>{id}</Text>}
        {...props}
      />,
    );
  });
  const cells = tree.root.findAll(
    (n) =>
      typeof n.type === 'string' &&
      typeof (n.props as Record<string, unknown>)?.testID === 'string' &&
      ((n.props as Record<string, unknown>).testID as string).startsWith('grid-cell-'),
  );
  return { tree, cells, onChange, onActiveChange };
}

function handlersOf(node: { props: Record<string, unknown> }): CellHandlers {
  return node.props as unknown as CellHandlers;
}

describe('ReorderableGrid drag', () => {
  it('takes over in the capture phase once editable and moving', () => {
    const { cells } = renderGrid();
    expect(cells.length).toBe(4);
    const h = handlersOf(cells[0]!);
    // +100px move accumulates into gestureState → passes the 8px gate.
    expect(h.onMoveShouldSetResponderCapture(moveEvent(0, 100, 2), undefined)).toBe(true);
  });

  it('refuses takeover for taps and when not editable', () => {
    const { cells } = renderGrid();
    const h = handlersOf(cells[0]!);
    expect(h.onMoveShouldSetResponder(moveEvent(0, 2, 2), undefined)).toBe(false);

    const locked = renderGrid({ editable: false });
    expect(locked.cells.length).toBe(4);
    // Non-editable cells carry no responder handlers at all.
    expect(
      (locked.cells[0]!.props as Record<string, unknown>).onMoveShouldSetResponderCapture,
    ).toBeUndefined();
  });

  it('notifies active state and commits the reorder on release', () => {
    const { cells, onChange, onActiveChange } = renderGrid();
    const first = handlersOf(cells[0]!);
    act(() => {
      first.onResponderGrant(touchEvent(10, 10, 1), undefined);
    });
    expect(onActiveChange).toHaveBeenCalledWith(true);
    act(() => {
      // Default grid is 350x200, 4 columns → cell ~87 wide: +100px moves one slot.
      first.onResponderMove(moveEvent(10, 110, 2), undefined);
    });
    act(() => {
      first.onResponderRelease(touchEvent(110, 10, 3), undefined);
    });
    expect(onActiveChange).toHaveBeenCalledWith(false);
    expect(onChange).toHaveBeenCalledWith(['b', 'a', 'c', 'd']);
  });
});
