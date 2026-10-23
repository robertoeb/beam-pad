import { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { PenLine, LayoutGrid, Plus } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { haptic } from '@/lib/haptics';

import { ShortcutTile } from '@/components/ShortcutTile';
import { AppIcon } from '@/components/AppIcon';
import { ReorderableGrid } from '@/components/ReorderableGrid';
import { useLayoutStore } from '@/stores/layout';
import { useSettingsStore } from '@/stores/settings';
import { shortcutRegistry } from '@/shortcuts/registry';
import { fireShortcut } from '@/services/shortcuts';
import { TV_APPS, type TvApp } from '@/protocol/deeplinks';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Label, Micro } from '@/theme/typography';
import {radius, space, tokens} from '@/theme/tokens';
import { appShortcutId } from '@/shortcuts/types';

function CatalogAppTile({
  app,
  showLabel,
  onPress,
}: {
  app: TvApp;
  showLabel: boolean;
  onPress: () => void;
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Add ${app.name}`}
      >
        <AppIcon appId={app.id} name={app.name} color={app.color} size={64} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 22,
            height: 22,
            borderBottomLeftRadius: radius.lg,
            backgroundColor: 'rgba(10,10,18,0.78)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Plus size={14} color={tokens.colors.accent.cyan} strokeWidth={2} />
        </View>
      </Pressable>
      {showLabel && (
        <Micro
          style={{ marginTop: 4, color: tokens.colors.text.secondary, textAlign: 'center' }}
          numberOfLines={1}
        >
          {app.name}
        </Micro>
      )}
    </View>
  );
}

export default function ShortcutsScreen() {
  const params = useLocalSearchParams<{ edit?: string }>();
  const shortcuts = useLayoutStore((s) => s.shortcuts);
  const removeShortcut = useLayoutStore((s) => s.removeShortcut);
  const setShortcuts = useLayoutStore((s) => s.setShortcuts);
  const addShortcut = useLayoutStore((s) => s.addShortcut);
  const showLabels = useSettingsStore((s) => s.showShortcutLabels);
  const [edit, setEdit] = useState(params.edit === '1');

  const pinnedIds = new Set(shortcuts);

  const catalogApps = TV_APPS.filter((a) => !pinnedIds.has(appShortcutId(a.id)));

  const handleAddApp = (appId: string) => {
    addShortcut(appShortcutId(appId));
  };

  return (
    <Screen>
      <ScreenHeader
        title="Shortcuts"
        subtitle={edit ? 'Drag to reorder' : 'Your pinned apps'}
        back
        backLabel="Go back"
        onBack={() => router.back()}
        trailing={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={edit ? 'Done editing' : 'Edit shortcuts'}
            onPress={() => setEdit((v) => !v)}
            style={{
              height: 40,
              paddingHorizontal: edit ? 18 : 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: edit ? 'transparent' : 'rgba(255,255,255,0.08)',
              backgroundColor: edit ? tokens.colors.accent.cyan : 'rgba(255,255,255,0.06)',
            }}
          >
            {edit ? (
              <Label style={{ color: tokens.colors.background, fontWeight: '600' }}>Done</Label>
            ) : (
              <PenLine size={18} strokeWidth={1.6} color={tokens.colors.text.secondary} />
            )}
          </Pressable>
        }
      />

      {shortcuts.length === 0 && !edit ? (
        <EmptyState
          icon={<LayoutGrid size={48} color={tokens.colors.accent.violet} />}
          title="No shortcuts yet"
          body="Pin your favorite apps for one-tap access."
          actionLabel="Add default shortcuts"
          onAction={() => {
            const defaults = ['app:netflix', 'app:youtube', 'app:prime', 'app:disney'];
            setShortcuts(defaults);
          }}
        />
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {shortcuts.length > 0 && (
            <ReorderableGrid
              data={shortcuts}
              onChange={setShortcuts}
              editable={edit}
              columns={4}
              renderItem={(id, _index, isActive) => {
                const shortcut = shortcutRegistry.resolve(id);
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      opacity: isActive ? 0.85 : 1,
                      transform: [{ scale: isActive ? 1.06 : 1 }],
                    }}
                  >
                    <ShortcutTile
                      shortcut={shortcut}
                      size={64}
                      missing={!shortcut}
                      editMode={edit}
                      showLabel={showLabels}
                      onRemove={() => removeShortcut(id)}
                      onPress={() => {
                        if (!edit) fireShortcut(id);
                      }}
                      onLongPress={
                        edit
                          ? () => haptic('medium')
                          : undefined
                      }
                    />
                  </View>
                );
              }}
            />
          )}

          {catalogApps.length > 0 && (
            <View style={{ paddingTop: 24, paddingBottom: 32 }}>
              <Micro style={{ color: tokens.colors.text.muted, marginBottom: 12 }}>
                {edit ? 'More apps - tap to add' : 'Apps'}
              </Micro>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[3] }}>
                {catalogApps.map((app) => (
                  <CatalogAppTile
                    key={app.id}
                    app={app}
                    showLabel={showLabels}
                    onPress={() => handleAddApp(app.id)}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </Screen>
  );
}
