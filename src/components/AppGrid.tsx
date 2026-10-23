import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Plus, Check } from 'lucide-react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { haptic } from '@/lib/haptics';

import { ShortcutTile } from './ShortcutTile';
import { useLayoutStore } from '@/stores/layout';
import { shortcutRegistry } from '@/shortcuts/registry';
import { fireShortcut } from '@/services/shortcuts';
import { TV_APPS } from '@/protocol/deeplinks';
import type { ShortcutId } from '@/shortcuts/types';
import { appShortcutId } from '@/shortcuts/types';

interface AppGridProps {
  edit?: boolean;
}

export function AppGrid({ edit: editProp }: AppGridProps) {
  const shortcuts = useLayoutStore((s) => s.shortcuts);
  const setShortcuts = useLayoutStore((s) => s.setShortcuts);
  const addShortcut = useLayoutStore((s) => s.addShortcut);
  const removeShortcut = useLayoutStore((s) => s.removeShortcut);
  const [editLocal, setEditLocal] = useState(false);

  const edit = editProp ?? editLocal;

  const pinnedAppIds = new Set(
    shortcuts.filter((id) => id.startsWith('app:')).map((id) => id.split(':')[1]),
  );

  const catalogApps = TV_APPS.filter((a) => !pinnedAppIds.has(a.id));

  const exitEdit = () => setEditLocal(false);

  return (
    <View style={{ flex: 1 }}>
      {edit && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Done editing"
            onPress={exitEdit}
          >
            <Check size={20} color="#00E5FF" />
          </Pressable>
        </View>
      )}

      <DraggableFlatList
        data={shortcuts}
        keyExtractor={(id) => id}
        numColumns={4}
        activationDistance={edit ? 0 : 9999}
        onDragEnd={({ data }) => setShortcuts(data)}
        renderItem={({ item, drag }: RenderItemParams<ShortcutId>) => {
          const shortcut = shortcutRegistry.resolve(item);
          return (
            <View style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}>
              <ShortcutTile
                shortcut={shortcut}
                size={64}
                missing={!shortcut}
                editMode={edit}
                showLabel
                onRemove={() => removeShortcut(item)}
                onPress={() => {
                  if (!edit) fireShortcut(item);
                }}
                onLongPress={() => {
                  haptic('medium');
                  if (!edit) setEditLocal(true);
                  drag();
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={
          <View style={{ paddingTop: 24, paddingHorizontal: 16 }}>
            {catalogApps.length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#A1A1AA',
                    marginBottom: 12,
                  }}
                >
                  More Apps
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  {catalogApps.map((app) => (
                    <View key={app.id} style={{ alignItems: 'center' }}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Pin ${app.name}`}
                        onPress={() => addShortcut(appShortcutId(app.id))}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: 'rgba(255,255,255,0.08)',
                          backgroundColor: `${app.color}24`,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={20} color="#00E5FF" />
                      </Pressable>
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
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        }
      />
    </View>
  );
}
