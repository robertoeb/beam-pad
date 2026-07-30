import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, PenLine, LayoutGrid, Plus } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';

import { ShortcutTile } from '@/components/ShortcutTile';
import { ShortcutEditorSheet } from '@/components/ShortcutEditorSheet';
import { useLayoutStore } from '@/stores/layout';
import { shortcutRegistry } from '@/shortcuts/registry';
import { fireShortcut } from '@/services/shortcuts';
import { TV_APPS } from '@/protocol/deeplinks';
import { KEYS } from '@/protocol/keycodes';
import { space, radius } from '@/theme/tokens';
import type { ShortcutId, UserShortcut } from '@/shortcuts/types';
import { appShortcutId, keyShortcutId } from '@/shortcuts/types';

export default function ShortcutsScreen() {
  const params = useLocalSearchParams<{ edit?: string }>();
  const shortcuts = useLayoutStore((s) => s.shortcuts);
  const removeShortcut = useLayoutStore((s) => s.removeShortcut);
  const setShortcuts = useLayoutStore((s) => s.setShortcuts);
  const addShortcut = useLayoutStore((s) => s.addShortcut);
  const [edit, setEdit] = useState(params.edit === '1');
  const [editorOpen, setEditorOpen] = useState(false);

  const pinnedIds = new Set(shortcuts);

  const catalogApps = TV_APPS.filter((a) => !pinnedIds.has(appShortcutId(a.id)));
  const keyEntries = Object.entries(KEYS).filter(
    ([k]) => k !== 'digits' && !pinnedIds.has(keyShortcutId(k)),
  );

  const handleAddApp = (appId: string) => {
    addShortcut(appShortcutId(appId));
  };

  const handleAddKey = (keyName: string) => {
    addShortcut(keyShortcutId(keyName));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-5 pt-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
            <Text className="ml-2 font-semibold text-base text-white">Shortcuts</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={edit ? 'Done editing' : 'Edit shortcuts'}
            onPress={() => setEdit((v) => !v)}
          >
            {edit ? (
              <Text className="font-semibold text-sm text-[#00E5FF]">Done</Text>
            ) : (
              <PenLine size={20} color="#A1A1AA" />
            )}
          </Pressable>
        </View>

        {shortcuts.length === 0 && !edit ? (
          <View className="flex-1 items-center justify-center">
            <LayoutGrid size={48} color="#52525B" />
            <Text className="mt-4 text-sm text-[#52525B]">No shortcuts yet</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add default shortcuts"
              onPress={() => {
                const defaults = ['app:netflix', 'app:youtube', 'app:prime', 'app:disney'];
                setShortcuts(defaults);
              }}
              style={{
                marginTop: space[4],
                padding: space[3],
                borderRadius: radius.md,
                backgroundColor: '#00E5FF',
              }}
            >
              <Text style={{ color: '#000', fontWeight: '700' }}>Add the 4 defaults</Text>
            </Pressable>
          </View>
        ) : (
          <DraggableFlatList
            data={shortcuts}
            keyExtractor={(id) => id}
            numColumns={4}
            activationDistance={edit ? 0 : 9999}
            onDragEnd={({ data }) => setShortcuts(data)}
            renderItem={({ item, drag }: RenderItemParams<string>) => {
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
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
                      Apps
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                      {catalogApps.map((app) => (
                        <Pressable
                          key={app.id}
                          accessibilityRole="button"
                          accessibilityLabel={`Add ${app.name}`}
                          onPress={() => handleAddApp(app.id)}
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
                      ))}
                    </View>
                  </>
                )}

                {keyEntries.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#A1A1AA',
                        marginTop: 24,
                        marginBottom: 12,
                      }}
                    >
                      Keys
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {keyEntries.map(([keyName]) => (
                        <Pressable
                          key={keyName}
                          accessibilityRole="button"
                          accessibilityLabel={`Add ${keyName}`}
                          onPress={() => handleAddKey(keyName)}
                          style={{
                            padding: space[2],
                            borderRadius: radius.sm,
                            backgroundColor: '#15161A',
                          }}
                        >
                          <Text style={{ color: '#A1A1AA', fontSize: 12 }}>{keyName}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </>
                )}

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Create custom shortcut"
                  onPress={() => setEditorOpen(true)}
                  style={{
                    marginTop: 24,
                    padding: space[3],
                    borderRadius: radius.md,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderStyle: 'dashed',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#A1A1AA', fontWeight: '600' }}>+ Create shortcut</Text>
                </Pressable>
              </View>
            }
          />
        )}
      </View>

      <ShortcutEditorSheet
        visible={editorOpen}
        onClose={() => setEditorOpen(false)}
        onCreated={(shortcut) => addShortcut(shortcut.id)}
      />
    </SafeAreaView>
  );
}
