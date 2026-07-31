import { Pressable, ScrollView, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';

import { ShortcutTile } from './ShortcutTile';
import { useLayoutStore } from '@/stores/layout';
import { useSettingsStore } from '@/stores/settings';
import { shortcutRegistry } from '@/shortcuts/registry';
import { fireShortcut } from '@/services/shortcuts';
import { space, radius } from '@/theme/tokens';

export function ShortcutRow() {
  const shortcuts = useLayoutStore((s) => s.shortcuts);
  const showLabels = useSettingsStore((s) => s.showShortcutLabels);

  const tileSize = 56;

  return (
    <View style={{ height: showLabels ? 84 : 64, justifyContent: 'center' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: space[2],
          paddingHorizontal: space[4],
        }}
      >
        {shortcuts.map((id) => {
          const shortcut = shortcutRegistry.resolve(id);
          return (
            <ShortcutTile
              key={id}
              shortcut={shortcut}
              size={tileSize}
              missing={!shortcut}
              showLabel={showLabels}
              onPress={() => fireShortcut(id)}
              onLongPress={() => router.push('/shortcuts?edit=1' as any)}
            />
          );
        })}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add shortcut"
          onPress={() => router.push('/shortcuts' as any)}
          style={{
            width: tileSize,
            height: tileSize,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.14)',
            backgroundColor: 'rgba(255,255,255,0.02)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Plus size={20} strokeWidth={1.5} color="#B7BDCB" />
        </Pressable>
      </ScrollView>
    </View>
  );
}
