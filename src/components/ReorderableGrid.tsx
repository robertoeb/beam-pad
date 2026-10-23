import { useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';
import Animated, { Layout, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const springLayout =
  typeof Layout !== 'undefined'
    ? Layout.springify().damping(30).stiffness(260).mass(0.8)
    : undefined;

interface ReorderableGridProps {
  data: string[];
  onChange: (data: string[]) => void;
  editable: boolean;
  columns?: number;
  renderItem: (id: string, index: number, isActive: boolean) => React.ReactNode;
  /** Fires when a drag starts/ends so the parent can lock its ScrollView. */
  onActiveChange?: (active: boolean) => void;
}

export function ReorderableGrid({
  data,
  onChange,
  editable,
  columns = 4,
  renderItem,
  onActiveChange,
}: ReorderableGridProps) {
  const [order, setOrder] = useState<string[]>(data);
  const [grid, setGrid] = useState({ w: 350, h: 200 });
  const [active, setActive] = useState<string | null>(null);

  const orderRef = useRef(data);
  const gridRef = useRef(grid);
  const editableRef = useRef(editable);
  const baseIndex = useRef(0);
  const responders = useRef(new Map<string, ReturnType<typeof PanResponder.create>>());

  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  gridRef.current = grid;
  editableRef.current = editable;

  useEffect(() => {
    setOrder(data);
    orderRef.current = data;
  }, [data]);

  const setDragging = (id: string | null) => {
    setActive(id);
    onActiveChange?.(id !== null);
  };

  const getResponder = (id: string) => {
    let responder = responders.current.get(id);
    if (responder) return responder;

    // NOTE: cells contain Pressables (tile + remove badge) and usually live
    // inside a ScrollView. Both claim the touch first, so the takeover must
    // happen in the *capture* phase — bubble-phase alone never engages and
    // drags feel dead. Taps (no qualifying move) still reach the children.
    const shouldTakeOver = (_e: unknown, g: PanResponderGestureState) =>
      editableRef.current && (Math.abs(g.dx) > 8 || Math.abs(g.dy) > 8);

    responder = PanResponder.create({
      onMoveShouldSetPanResponder: shouldTakeOver,
      onMoveShouldSetPanResponderCapture: shouldTakeOver,
      onPanResponderGrant: () => {
        baseIndex.current = orderRef.current.indexOf(id);
        setDragging(id);
      },
      onPanResponderMove: (_e, g) => {
        const { w, h } = gridRef.current;
        const cols = columns;
        const cw = w / cols;
        const ch = h / Math.max(1, Math.ceil(orderRef.current.length / cols));

        const current = orderRef.current;
        const from = current.indexOf(id);
        if (from === -1) return;

        const target = Math.max(
          0,
          Math.min(
            current.length - 1,
            baseIndex.current + Math.round(g.dy / ch) * cols + Math.round(g.dx / cw),
          ),
        );
        if (target !== from) {
          const next = [...current];
          next.splice(from, 1);
          next.splice(target, 0, id);
          orderRef.current = next;
          setOrder(next);
        }

        tx.value = g.dx - Math.round(g.dx / cw) * cw;
        ty.value = g.dy - Math.round(g.dy / ch) * ch;
      },
      onPanResponderRelease: () => {
        onChange(orderRef.current);
        setDragging(null);
        tx.value = 0;
        ty.value = 0;
      },
      onPanResponderTerminate: () => {
        onChange(orderRef.current);
        setDragging(null);
        tx.value = 0;
        ty.value = 0;
      },
    });

    responders.current.set(id, responder);
    return responder;
  };

  const activeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== grid.w || height !== grid.h) setGrid({ w: width, h: height });
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} onLayout={onLayout}>
      {order.map((id, index) => {
        const isActive = id === active;
        const cell = (
          <View style={{ alignItems: 'center' }}>{renderItem(id, index, isActive)}</View>
        );
        return (
          <Animated.View
            key={id}
            testID={`grid-cell-${id}`}
            layout={isActive ? undefined : springLayout}
            style={{
              width: `${100 / columns}%`,
              alignItems: 'center',
              paddingVertical: 8,
              zIndex: isActive ? 10 : 0,
            }}
            {...(editable ? getResponder(id).panHandlers : undefined)}
          >
            {isActive ? <Animated.View style={activeStyle}>{cell}</Animated.View> : cell}
          </Animated.View>
        );
      })}
    </View>
  );
}
