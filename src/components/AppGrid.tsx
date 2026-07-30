import { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Plus, Check } from 'lucide-react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import { AppTile } from './AppTile';
import { useLayoutStore } from '@/stores/layout';
import { TV_APPS } from '@/protocol/deeplinks';
import { launchApp } from '@/services/apps';

interface AppGridProps {
  edit?: boolean;
}

export function AppGrid({ edit: editProp }: AppGridProps) {
  const pinned = useLayoutStore((s) => s.pinned);
  const setPinned = useLayoutStore((s) => s.setPinned);
  const pin = useLayoutStore((s) => s.pin);
  const unpin = useLayoutStore((s) => s.unpin);
  const [editLocal, setEditLocal] = useState(false);

  const edit = editProp ?? editLocal;

  const catalogApps = TV_APPS.filter((a) => !pinned.includes(a.id));

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
        data={pinned}
        keyExtractor={(id) => id}
        numColumns={4}
        activationDistance={edit ? 0 : 9999}
        onDragEnd={({ data }) => setPinned(data)}
        renderItem={({ item, drag, isActive }: RenderItemParams<string>) => (
          <View style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}>
            <AppTile
              appId={item}
              editMode={edit}
              showLabel
              onUnpin={() => unpin(item)}
              onPress={() => {
                if (!edit) launchApp(item);
              }}
              onLongPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                if (!edit) setEditLocal(true);
                drag();
              }}
            />
          </View>
        )}
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
                        onPress={() => pin(app.id)}
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
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 15,
                            color: '#FFFFFF',
                          }}
                        >
                          {app.initials}
                        </Text>
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: '#00E5FF',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Plus size={12} color="#000000" />
                        </View>
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
