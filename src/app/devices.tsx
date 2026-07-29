import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WifiOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { startDiscovery, stopDiscovery } from '@/services/discovery';
import { useDevicesStore } from '@/stores/devices';

export default function DevicesScreen() {
  const foundRaw = useDevicesStore((s) => s.found);
  const found = useMemo(() => Object.values(foundRaw), [foundRaw]);
  const removeFound = useDevicesStore((s) => s.removeFound);
  const [manualHost, setManualHost] = useState('');
  const [manualPort, setManualPort] = useState('6466');

  useEffect(() => {
    startDiscovery();
    return () => { stopDiscovery(); };
  }, []);

  const handlePair = useCallback(
    (name: string, host: string, port: number) => {
      removeFound(host);
      router.push({ pathname: '/pairing' as any, params: { host, port, name } });
    },
    [removeFound],
  );

  const handleManualEntry = useCallback(() => {
    if (manualHost.trim()) {
      Keyboard.dismiss();
      handlePair('Manual Entry', manualHost.trim(), parseInt(manualPort, 10) || 6466);
    }
  }, [manualHost, manualPort, handlePair]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof found)[0] }) => (
      <View className="flex-row items-center px-4 py-3">
        <View className="flex-1">
          <Text className="font-medium text-[15px] text-text-primary">{item?.name}</Text>
          <Text className="text-xs text-text-muted">
            {item?.host}:{item?.port}
          </Text>
        </View>
        <Pressable
          onPress={() => item && handlePair(item.name, item.host, item.port)}
          className="ml-3 px-4 py-2 rounded-lg bg-accent-cyan/10"
        >
          <Text className="font-medium text-sm text-accent-cyan">Pair</Text>
        </Pressable>
      </View>
    ),
    [handlePair],
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Text className="font-semibold text-xl text-text-primary px-4 py-4">
        Devices
      </Text>

      {found.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-3">
          <WifiOff size={40} color="#52525B" />
          <Text className="text-text-muted text-center px-8">
            Looking for TVs on your Wi-Fi…
          </Text>
        </View>
      ) : (
        <FlatList
          data={found}
          keyExtractor={(item) => item?.host ?? ''}
          renderItem={renderItem}
          className="border-b border-surface-border"
        />
      )}

      <View className="flex-row gap-2 px-4 py-4">
        <TextInput
          placeholder="TV IP address"
          placeholderTextColor="#52525B"
          value={manualHost}
          onChangeText={setManualHost}
          keyboardType="url"
          autoCapitalize="none"
          className="flex-1 px-3 py-2 rounded-lg bg-surface border border-surface-border text-text-primary text-[15px]"
        />
        <TextInput
          placeholder="Port"
          placeholderTextColor="#52525B"
          value={manualPort}
          onChangeText={setManualPort}
          keyboardType="numeric"
          className="w-20 px-3 py-2 rounded-lg bg-surface border border-surface-border text-text-primary text-[15px] text-center"
        />
        <Pressable onPress={handleManualEntry} className="px-4 py-2 rounded-lg bg-accent-cyan/10">
          <Text className="font-medium text-sm text-accent-cyan">Pair</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
