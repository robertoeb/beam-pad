import { View, FlatList, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';

import { AppTile } from './AppTile';
import { useLayoutStore } from '@/stores/layout';
import { launchApp } from '@/services/apps';

const MAX_VISIBLE = 5;

export function PinnedAppsRow() {
  const pinned = useLayoutStore((s) => s.pinned);
  const visible = pinned.slice(0, MAX_VISIBLE);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
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
          width: 64,
          height: 64,
          borderRadius: 16,
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
