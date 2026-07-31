import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';

export const SCREEN_GRADIENT = ['#15152A', '#0A0A12'] as const;
export const BRAND_GRADIENT = ['#22D3EE', '#8B8CF8'] as const;
export const POWER_GRADIENT = ['#FF5A4D', '#E63E31'] as const;

type Point = { x: number; y: number };

interface GradientProps {
  colors: readonly [string, string];
  start?: Point;
  end?: Point;
  opacity?: number;
}

export function Gradient({
  colors,
  start = { x: 0.5, y: 0 },
  end = { x: 0.5, y: 1 },
  opacity = 1,
}: GradientProps) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.w || height !== size.h) setSize({ w: width, h: height });
  };

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill} onLayout={onLayout}>
      {size.w > 0 && size.h > 0 ? (
        <Svg width={size.w} height={size.h} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient
              id="grad"
              x1={`${start.x}`}
              y1={`${start.y}`}
              x2={`${end.x}`}
              y2={`${end.y}`}
            >
              <Stop offset="0" stopColor={colors[0]} stopOpacity={opacity} />
              <Stop offset="1" stopColor={colors[1]} stopOpacity={opacity} />
            </LinearGradient>
          </Defs>
          <Rect width={size.w} height={size.h} fill="url(#grad)" />
        </Svg>
      ) : null}
    </View>
  );
}

interface GlowProps {
  color: string;
  size: number;
  x?: number;
  y?: number;
  opacity?: number;
  center?: Point;
}

export function Glow({ color, size, x = 0, y = 0, opacity = 0.5 }: GlowProps) {
  return (
    <Svg
      width={size}
      height={size}
      pointerEvents="none"
      style={{ position: 'absolute', left: x, top: y }}
    >
      <Defs>
        <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity={opacity} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width={size} height={size} fill="url(#glow)" />
    </Svg>
  );
}
