import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, FlatList, Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Tv } from 'lucide-react-native';
import { router } from 'expo-router';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';
import { switchTo } from '@/services/sessionManager';

interface DeviceSwitchSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function DeviceSwitchSheet({ visible, onClose }: DeviceSwitchSheetProps) {
  const translateY = useRef(new Animated.Value(600)).current;
  const pairedRaw = useDevicesStore((s) => s.paired);
  const paired = useMemo(() => Object.values(pairedRaw), [pairedRaw]);
  const activeDeviceId = useDevicesStore((s) => s.activeDeviceId);
  const setState = useConnectionStore((s) => s.setState);

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

  const handleSwitch = useCallback(
    async (id: string) => {
      setState('CONNECTING');
      const result = await switchTo(id);
      if (result.ok) {
        setState('ACTIVE');
      } else {
        setState('ERROR_STATE');
      }
      onClose();
    },
    [setState, onClose],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof paired)[0] }) => {
      const isActive = item.id === activeDeviceId;
      return (
        <Pressable
          onPress={() => handleSwitch(item.id)}
          className="flex-row items-center gap-3 px-4 py-3"
        >
          <View
            className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-accent-cyan' : 'bg-text-muted'}`}
          />
          <Tv size={20} color={isActive ? '#00E5FF' : '#A1A1AA'} />
          <View className="flex-1">
            <Text className="font-medium text-[15px] text-text-primary">{item.name}</Text>
            <Text className="text-xs text-text-muted">{item.host}</Text>
          </View>
        </Pressable>
      );
    },
    [activeDeviceId, handleSwitch],
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/60" onPress={onClose}>
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View
            style={{ transform: [{ translateY }] }}
            className="mx-4 rounded-[24px] border border-surface-border bg-surface"
          >
            <Text className="px-4 pb-2 pt-4 font-semibold text-lg text-text-primary">
              Switch Device
            </Text>
            {paired.length === 0 ? (
              <View className="px-4 py-8">
                <Text className="text-center text-text-muted">No paired devices</Text>
              </View>
            ) : (
              <FlatList
                data={paired}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
              />
            )}
            <Pressable
              onPress={() => {
                onClose();
                router.push({ pathname: '/devices' as any });
              }}
              className="flex-row items-center gap-2 border-t border-surface-border px-4 py-3"
            >
              <Plus size={18} color="#00E5FF" />
              <Text className="font-medium text-[15px] text-accent-cyan">Add Device</Text>
            </Pressable>
          </Animated.View>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
}
