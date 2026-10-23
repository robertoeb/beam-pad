import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, Pressable, RefreshControl, ScrollView, TextInput, View } from 'react-native';
import { Radar, RefreshCcw, Search, Tv, Signal } from 'lucide-react-native';
import { router } from 'expo-router';
import { startDiscovery, stopDiscovery } from '@/services/discovery';
import { useDevicesStore } from '@/stores/devices';
import { COMMAND_PORT } from '@/protocol/ports';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Label } from '@/theme/typography';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { space, radius } from '@/theme/tokens';

const SCAN_WINDOW_MS = 15_000;

export default function DevicesScreen() {
  const foundRaw = useDevicesStore((s) => s.found);
  const scanning = useDevicesStore((s) => s.scanning);
  const found = useMemo(() => Object.values(foundRaw), [foundRaw]);
  const [manualHost, setManualHost] = useState('');
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pairTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const beginScan = useCallback((clear: boolean) => {
    startDiscovery({ clear });
    if (scanTimer.current) clearTimeout(scanTimer.current);
    scanTimer.current = setTimeout(() => {
      useDevicesStore.getState().setScanning(false);
    }, SCAN_WINDOW_MS);
  }, []);

  const handleRescan = useCallback(() => {
    beginScan(false);
  }, [beginScan]);

  useEffect(() => {
    beginScan(true);
    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
      if (pairTimer.current) clearTimeout(pairTimer.current);
      stopDiscovery();
    };
  }, [beginScan]);

  const handlePair = useCallback(
    (name: string, host: string, port: number) => {
      // Navigate first, then clean up the found list. Removing the device before
      // pushing would briefly render the empty state (list flash).
      router.push({ pathname: '/pairing' as any, params: { host, port, name } });
      if (pairTimer.current) clearTimeout(pairTimer.current);
      pairTimer.current = setTimeout(() => useDevicesStore.getState().removeFound(host), 0);
    },
    [],
  );

  const handleManualEntry = useCallback(() => {
    if (manualHost.trim()) {
      Keyboard.dismiss();
      handlePair('Manual Entry', manualHost.trim(), COMMAND_PORT);
    }
  }, [manualHost, handlePair]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof found)[0] }) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.07)',
          backgroundColor: 'rgba(19,19,30,0.8)',
          paddingHorizontal: space[4],
          paddingVertical: 14,
          marginBottom: space[2],
          gap: 12,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 14,
            backgroundColor: 'rgba(139,140,248,0.1)',
            borderWidth: 1,
            borderColor: 'rgba(139,140,248,0.22)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tv size={19} strokeWidth={1.6} color="#8B8CF8" />
        </View>
        <View style={{ flex: 1 }}>
          <Label style={{ color: '#F5F6FA' }}>{item?.name}</Label>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 1 }}>
            <Signal size={10} color="#747B8A" />
            <Label style={{ color: '#747B8A', fontSize: 11 }}>
              {item?.host}:{item?.port}
            </Label>
          </View>
        </View>
        <Pressable
          onPress={() => item && handlePair(item.name, item.host, item.port)}
          style={{
            borderRadius: radius.md,
            backgroundColor: 'rgba(34,211,238,0.12)',
            borderWidth: 1,
            borderColor: 'rgba(34,211,238,0.35)',
            paddingHorizontal: 18,
            paddingVertical: 9,
            overflow: 'hidden',
          }}
        >
          <Gradient
            colors={BRAND_GRADIENT}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            opacity={0.06}
          />
          <Label style={{ color: '#22D3EE' }}>Pair</Label>
        </Pressable>
      </View>
    ),
    [handlePair],
  );

  return (
    <Screen>
      <ScreenHeader title="Devices" subtitle="Find a TV on your network" back />

      {found.length === 0 ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          alwaysBounceVertical={!scanning}
          refreshControl={
            scanning ? undefined : (
              <RefreshControl
                refreshing={scanning}
                onRefresh={handleRescan}
                tintColor="#8B8CF8"
                colors={['#8B8CF8']}
              />
            )
          }
        >
          <EmptyState
            icon={
              scanning ? (
                <Radar size={40} color="#8B8CF8" strokeWidth={1.6} />
              ) : (
                <Search size={40} color="#8B8CF8" strokeWidth={1.6} />
              )
            }
            title={scanning ? 'Scanning for TVs…' : 'No TVs found'}
            body={
              scanning
                ? 'Looking for Android TVs on your network…'
                : 'Make sure your TV is awake and on the same Wi-Fi, then try again.'
            }
            actionLabel={scanning ? undefined : 'Scan again'}
            actionIcon={RefreshCcw}
            loading={scanning}
            onAction={scanning ? undefined : handleRescan}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={found}
          keyExtractor={(item) => item?.host ?? ''}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: space[4] }}
          alwaysBounceVertical
          refreshControl={
            <RefreshControl
              refreshing={scanning}
              onRefresh={handleRescan}
              tintColor="#8B8CF8"
              colors={['#8B8CF8']}
            />
          }
        />
      )}

      {(!scanning || found.length > 0) && (
        <View
          style={{
            flexDirection: 'row',
            gap: space[2],
            paddingTop: space[3],
          }}
        >
          <TextInput
            placeholder="TV IP address"
            placeholderTextColor="#747B8A"
            value={manualHost}
            onChangeText={setManualHost}
            keyboardType="url"
            autoCapitalize="none"
            style={{
              flex: 1,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.09)',
              backgroundColor: 'rgba(19,19,30,0.8)',
              paddingHorizontal: 14,
              paddingVertical: 12,
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'Inter-Medium',
            }}
          />
          <Pressable
            onPress={handleManualEntry}
            style={{
              borderRadius: radius.lg,
              backgroundColor: 'rgba(34,211,238,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(34,211,238,0.35)',
              paddingHorizontal: 18,
              paddingVertical: 12,
              overflow: 'hidden',
            }}
          >
            <Gradient
              colors={BRAND_GRADIENT}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              opacity={0.06}
            />
            <Label style={{ color: '#22D3EE' }}>Pair</Label>
          </Pressable>
        </View>
      )}
    </Screen>
  );
}
