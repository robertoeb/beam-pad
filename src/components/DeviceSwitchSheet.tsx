import { tokens } from '@/theme/tokens';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, FlatList, Modal, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Tv, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useDevicesStore } from '@/stores/devices';
import { switchTo } from '@/services/sessionManager';
import { showToast } from '@/stores/toast';
import { Label, Title } from '@/theme/typography';

interface DeviceSwitchSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function DeviceSwitchSheet({ visible, onClose }: DeviceSwitchSheetProps) {
  const translateY = useRef(new Animated.Value(600)).current;
  const pairedRaw = useDevicesStore((s) => s.paired);
  const paired = useMemo(() => Object.values(pairedRaw), [pairedRaw]);
  const activeDeviceId = useDevicesStore((s) => s.activeDeviceId);

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        damping: 18,
        stiffness: 220,
        mass: 0.9,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 600,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  // The session's onState callback is the sole writer of the connection
  // machine — never force states from here (it used to show ACTIVE while the
  // socket was still handshaking). Close on success; stay open with the
  // classified error on failure so the user can retry or pick another TV.
  const handleSwitch = useCallback(
    async (id: string) => {
      const result = await switchTo(id);
      if (result.ok) {
        onClose();
      } else {
        showToast(result.error?.message ?? 'Could not connect to TV');
      }
    },
    [onClose],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof paired)[0] }) => {
      const isActive = item.id === activeDeviceId;
      return (
        <Pressable
          onPress={() => handleSwitch(item.id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginHorizontal: 16,
            marginBottom: 8,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: isActive ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.07)',
            backgroundColor: isActive ? 'rgba(34,211,238,0.08)' : tokens.colors.surface.DEFAULT,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: isActive ? 'rgba(34,211,238,0.14)' : 'rgba(255,255,255,0.06)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tv size={18} color={isActive ? tokens.colors.accent.cyan : tokens.colors.text.secondary} />
          </View>
          <View style={{ flex: 1 }}>
            <Label style={{ color: tokens.colors.text.primary }}>{item.name}</Label>
            <Label style={{ color: tokens.colors.text.soft, fontSize: 11 }}>{item.host}</Label>
          </View>
          {isActive ? <Check size={18} color={tokens.colors.accent.cyan} /> : null}
        </Pressable>
      );
    },
    [activeDeviceId, handleSwitch],
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(5,5,10,0.7)' }} onPress={onClose}>
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View style={{ transform: [{ translateY }] }}>
            <View
              style={{
                borderRadius: 28,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.09)',
                backgroundColor: tokens.colors.surface.sheet,
                paddingTop: 12,
                marginHorizontal: 8,
                marginBottom: 8,
              }}
            >
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <View
                  style={{
                    width: 44,
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.16)',
                  }}
                />
              </View>
              <Title style={{ paddingHorizontal: 20, paddingBottom: 12 }}>Switch Device</Title>
              {paired.length === 0 ? (
                <View style={{ paddingVertical: 28 }}>
                  <Label style={{ textAlign: 'center', color: tokens.colors.text.muted }}>No paired devices</Label>
                </View>
              ) : (
                <FlatList
                  data={paired}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                  scrollEnabled={false}
                  contentContainerStyle={{ paddingBottom: 8 }}
                />
              )}
              <Pressable
                onPress={() => {
                  onClose();
                  router.push({ pathname: '/devices' as any });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderTopWidth: 1,
                  borderTopColor: 'rgba(255,255,255,0.07)',
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    backgroundColor: 'rgba(139,140,248,0.14)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Plus size={18} color={tokens.colors.accent.violet} />
                </View>
                <Label style={{ color: tokens.colors.accent.violet, fontSize: 15 }}>Add Device</Label>
              </Pressable>
            </View>
          </Animated.View>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
}
