import { View, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';

import { AppTile } from './AppTile';
import { useLayoutStore } from '@/stores/layout';
import { useRemoteMetrics } from '@/lib/useRemoteMetrics';
import { launchApp } from '@/services/apps';
import { space, radius } from '@/theme/tokens';

const MAX_VISIBLE = 5;

export function PinnedAppsRow() {
  const pinned = useLayoutStore((s) => s.pinned);
  const visible = pinned.slice(0, MAX_VISIBLE);
  const metrics = useRemoteMetrics();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: space[2],
        alignSelf: 'center',
      }}
    >
      {visible.map((id) => (
        <AppTile
          key={id}
          appId={id}
          onPress={() => launchApp(id)}
          onLongPress={() => router.push('/apps?edit=1' as any)}
        />
      ))}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add app"
        onPress={() => router.push('/apps' as any)}
        style={{
          width: metrics.tile,
          height: metrics.tile,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          borderStyle: 'dashed',
        }}
      >
        <Plus size={20} strokeWidth={1.5} color="#52525B" />
      </Pressable>
    </View>
  );
}
