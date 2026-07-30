import { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MinusCircle } from 'lucide-react-native';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { useConnectionStore } from '@/stores/connection';
import { shortcutRegistry } from '@/shortcuts/registry';
import { BRAND_ICONS, KEY_ICONS, initialsFallback } from '@/shortcuts/icons';
import { SPRING } from '@/lib/spring';
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
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fired = useRef(false);

  const isCurrent =
    shortcut?.action.kind === 'app' &&
    currentApp?.packageName === shortcutRegistry.getApp(shortcut.action.appId)?.packageName;

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
    backgroundColor:
      flash.value > 0 ? `rgba(0,229,255,${0.2 * flash.value})` : 'transparent',
  }));

  const pressIn = () => {
    fired.current = false;
    scale.value = withSpring(0.95, SPRING);
    flash.value = withTiming(1, { duration: 90 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (onLongPress) {
      holdTimer.current = setTimeout(() => {
        fired.current = true;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        onLongPress();
      }, 800);
    }
  };

  const pressOut = () => {
    scale.value = withSpring(1, SPRING);
    flash.value = withTiming(0, { duration: 140 });
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
    if (!fired.current) onPress?.();
  };

  const iconSize = Math.round(size * 0.42);
  const innerPad = space[3];
  const label = shortcut?.label ?? 'Unknown';
  const tint = shortcut?.tint ?? '#52525B';
  const bgTint = missing ? 'rgba(82,82,91,0.15)' : `${tint}24`;

  const renderIcon = () => {
    if (missing || !shortcut) {
      return (
        <Text style={{ fontWeight: '600', fontSize: 15, color: '#52525B' }}>?</Text>
      );
    }

    if (shortcut.action.kind === 'app') {
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
      <Animated.View>
        <AnimatedPressable
          onPressIn={pressIn}
          onPressOut={pressOut}
          accessibilityRole="button"
          accessibilityLabel={missing ? `Remove ${label}` : `${editMode ? 'Edit' : 'Open'} ${label}`}
          hitSlop={8}
          style={[
            animStyle,
            {
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: isCurrent ? '#00E5FF' : 'rgba(255,255,255,0.08)',
              backgroundColor: bgTint,
              alignItems: 'center',
              justifyContent: 'center',
              padding: innerPad,
            },
          ]}
        >
          {renderIcon()}

          {isCurrent && (
            <View
              style={{
                position: 'absolute',
                top: 4,
                left: 4,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#00E5FF',
              }}
            />
          )}

          {editMode && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${label}`}
              onPress={onRemove}
              hitSlop={12}
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MinusCircle size={20} color="#FF3B30" />
            </Pressable>
          )}
        </AnimatedPressable>
      </Animated.View>

      {showLabel && (
        <Text
          style={{
            marginTop: space[1],
            fontSize: 11,
            color: '#A1A1AA',
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
