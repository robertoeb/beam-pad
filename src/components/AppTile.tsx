import { Pressable, Text, View } from 'react-native';
import { MinusCircle } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useConnectionStore } from '@/stores/connection';
import { getApp } from '@/protocol/deeplinks';

interface AppTileProps {
  appId: string;
  editMode?: boolean;
  onUnpin?: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
  showLabel?: boolean;
}

export function AppTile({
  appId,
  editMode = false,
  onUnpin,
  onPress,
  onLongPress,
  showLabel = false,
}: AppTileProps) {
  const app = getApp(appId);
  const currentApp = useConnectionStore((s) => s.currentApp);
  const isCurrent = currentApp?.packageName === app?.packageName;
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (editMode) {
      const angle = 1.5;
      rotation.value = withRepeat(withTiming(angle, { duration: 120 }), -1, true);
    } else {
      rotation.value = withTiming(0, { duration: 120 });
    }
  }, [editMode, rotation]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (!app) return null;

  const bgTint = `${app.color}24`;

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.View style={animStyle}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${editMode ? 'Edit' : 'Open'} ${app.name}`}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            borderWidth: isCurrent ? 1 : 1,
            borderColor: isCurrent ? '#00E5FF' : 'rgba(255,255,255,0.08)',
            backgroundColor: bgTint,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: 15,
              color: '#FFFFFF',
            }}
          >
            {app.initials}
          </Text>

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
              accessibilityLabel={`Unpin ${app.name}`}
              onPress={onUnpin}
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
              }}
            >
              <MinusCircle size={18} color="#FF3B30" />
            </Pressable>
          )}
        </Pressable>
      </Animated.View>

      {showLabel && (
        <Text
          style={{
            marginTop: 4,
            fontSize: 11,
            color: '#A1A1AA',
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {app.name}
        </Text>
      )}
    </View>
  );
}
