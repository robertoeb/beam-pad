import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MinusCircle } from 'lucide-react-native';
import { useEffect } from 'react';
import { haptic } from '@/lib/haptics';
import { useConnectionStore } from '@/stores/connection';
import { shortcutRegistry } from '@/shortcuts/registry';
import { BRAND_ICONS, KEY_ICONS, initialsFallback } from '@/shortcuts/icons';
import { BRAND_LOGOS } from '@/shortcuts/brandLogos';
import { SPRING } from '@/lib/spring';
import { Glow } from '@/theme/gradient';
import { space, radius } from '@/theme/tokens';
import type { Shortcut } from '@/shortcuts/types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ShortcutTileProps {
  shortcut: Shortcut | null;
  size: number;
  editMode?: boolean;
  onRemove?: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
  showLabel?: boolean;
  missing?: boolean;
}

export function ShortcutTile({
  shortcut,
  size,
  editMode = false,
  onRemove,
  onPress,
  onLongPress,
  showLabel = false,
  missing = false,
}: ShortcutTileProps) {
  const currentApp = useConnectionStore((s) => s.currentApp);
  const scale = useSharedValue(1);
  const flash = useSharedValue(0);
  const rotation = useSharedValue(0);

  const isCurrent =
    shortcut?.action.kind === 'app' &&
    currentApp?.packageName === shortcutRegistry.getApp(shortcut.action.appId)?.packageName;

  const appIcon = shortcut?.action.kind === 'app' ? BRAND_LOGOS[shortcut.action.appId] : undefined;

  useEffect(() => {
    if (editMode) {
      rotation.value = withRepeat(withTiming(1.5, { duration: 120 }), -1, true);
    } else {
      rotation.value = withTiming(0, { duration: 120 });
    }
  }, [editMode, rotation]);

  const animStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    borderColor:
      flash.value > 0
        ? 'rgba(34,211,238,0.65)'
        : isCurrent
          ? 'rgba(34,211,238,0.7)'
          : 'rgba(255,255,255,0.08)',
  }));

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flash.value,
  }));

  const pressIn = () => {
    scale.value = withSpring(0.95, SPRING);
    flash.value = withTiming(1, { duration: 90 });
  };

  const pressOut = () => {
    scale.value = withSpring(1, SPRING);
    flash.value = withTiming(0, { duration: 140 });
  };

  const iconSize = Math.round(size * 0.5);
  const innerPad = space[3];
  const label = shortcut?.label ?? 'Unknown';
  const tint = shortcut?.tint ?? '#747B8A';
  const bgTint = missing ? 'rgba(94,100,114,0.15)' : `${tint}24`;
  const tileBg = appIcon ? appIcon.background : bgTint;

  const renderIcon = () => {
    if (missing || !shortcut) {
      return <Text style={{ fontWeight: '600', fontSize: 15, color: '#747B8A' }}>?</Text>;
    }

    if (shortcut.action.kind === 'app') {
      const icon = BRAND_LOGOS[shortcut.action.appId];
      if (icon) {
        return (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={icon.source}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          </View>
        );
      }
      const BrandIcon = BRAND_ICONS[shortcut.action.appId];
      if (BrandIcon) return <BrandIcon size={iconSize} color="#FFFFFF" />;
    }

    if (shortcut.action.kind === 'key') {
      const keyName = shortcut.icon;
      const LucideIcon = KEY_ICONS[keyName];
      if (LucideIcon) return <LucideIcon size={iconSize} strokeWidth={1.5} color="#FFFFFF" />;
    }

    if (shortcut.action.kind === 'macro') {
      const LucideIcon = KEY_ICONS[shortcut.icon];
      if (LucideIcon) return <LucideIcon size={iconSize} strokeWidth={1.5} color="#FFFFFF" />;
    }

    return (
      <Text style={{ fontWeight: '600', fontSize: 15, color: '#FFFFFF' }}>
        {initialsFallback(label)}
      </Text>
    );
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View>
        {isCurrent ? (
          <Glow color="#22D3EE" size={size + 24} x={-12} y={-12} opacity={0.18} />
        ) : null}
        <AnimatedPressable
          onPressIn={pressIn}
          onPressOut={pressOut}
          onPress={() => {
            if (onPress) {
              haptic('light');
              onPress();
            }
          }}
          onLongPress={
            onLongPress
              ? () => {
                  haptic('heavy');
                  onLongPress();
                }
              : undefined
          }
          delayLongPress={800}
          accessibilityRole="button"
          accessibilityLabel={
            missing ? `Remove ${label}` : `${editMode ? 'Edit' : 'Open'} ${label}`
          }
          hitSlop={8}
          style={[
            animStyle,
            {
              borderRadius: radius.lg,
              borderWidth: 1,
              backgroundColor: tileBg,
              alignItems: 'center',
              justifyContent: 'center',
              padding: innerPad,
              overflow: 'hidden',
            },
          ]}
        >
          {renderIcon()}

          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: radius.lg,
                backgroundColor: 'rgba(10,10,18,0.42)',
              },
              flashStyle,
            ]}
          />

          {isCurrent && (
            <View
              style={{
                position: 'absolute',
                top: 4,
                left: 4,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#22D3EE',
              }}
            />
          )}

          {editMode && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${label}`}
              onPress={onRemove}
              hitSlop={16}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 32,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MinusCircle size={20} color="#FF453A" />
            </Pressable>
          )}
        </AnimatedPressable>
      </View>

      {showLabel && (
        <Text
          style={{
            marginTop: space[1],
            fontSize: 11,
            color: '#B7BDCB',
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {missing ? label : shortcut?.label}
        </Text>
      )}
    </View>
  );
}
