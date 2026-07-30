import { View, Pressable, LayoutChangeEvent } from 'react-native';
import { Plus, MoreHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

import { ShortcutTile } from './ShortcutTile';
import { useLayoutStore } from '@/stores/layout';
import { shortcutRegistry } from '@/shortcuts/registry';
import { fireShortcut } from '@/services/shortcuts';
import { space, radius } from '@/theme/tokens';

export function ShortcutRow() {
  const shortcuts = useLayoutStore((s) => s.shortcuts);
  const [frameWidth, setFrameWidth] = useState(390);

  const gutter = space[4];
  const gap = space[2];
  const tileSize = 56;
  const addTileWidth = tileSize;

  const availableWidth = frameWidth - 2 * gutter;
  const fit = Math.floor((availableWidth + gap) / (tileSize + gap));
  const slotsForShortcuts = fit - 1;

  const visibleShortcuts = shortcuts.slice(0, slotsForShortcuts);
  const remaining = shortcuts.length - visibleShortcuts.length;

  const onLayout = (e: LayoutChangeEvent) => {
    setFrameWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap,
        alignSelf: 'center',
        paddingHorizontal: gutter,
      }}
    >
      {visibleShortcuts.map((id) => {
        const shortcut = shortcutRegistry.resolve(id);
        return (
          <ShortcutTile
            key={id}
            shortcut={shortcut}
            size={tileSize}
            missing={!shortcut}
            onPress={() => fireShortcut(id)}
            onLongPress={() => router.push('/shortcuts?edit=1' as any)}
          />
        );
      })}

      {remaining > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${remaining} more shortcuts`}
          onPress={() => router.push('/shortcuts' as any)}
          style={{
            width: tileSize,
            height: tileSize,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MoreHorizontal size={20} strokeWidth={1.5} color="#52525B" />
        </Pressable>
      )}

      {remaining === 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add shortcut"
          onPress={() => router.push('/shortcuts' as any)}
          style={{
            width: tileSize,
            height: tileSize,
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
      )}
    </View>
  );
}
