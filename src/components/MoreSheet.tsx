import { View, Text, Pressable, ScrollView } from 'react-native';
import {
  Mic,
  Cast,
  SkipBack,
  Rewind,
  Play,
  Pause,
  FastForward,
  SkipForward,
  Square,
  MonitorSmartphone,
  ListVideo,
  Info,
  Menu,
  Hash,
} from 'lucide-react-native';
import { Sheet } from './Sheet';
import { RemoteButton } from './RemoteButton';
import { KEYS } from '@/protocol/keycodes';
import { key } from '@/lib/key';
import { useLayoutStore } from '@/stores/layout';
import { showToast } from './Toast';
import { useState } from 'react';

export function MoreSheet() {
  const open = useLayoutStore((s) => s.moreSheetOpen);
  const setMoreSheet = useLayoutStore((s) => s.setMoreSheet);
  const [playing, setPlaying] = useState(false);

  const close = () => setMoreSheet(false);

  return (
    <Sheet open={open} onClose={close} testID="more-sheet">
      <ScrollView style={{ maxHeight: 500 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-5">
          <View className="mb-4 flex-row gap-3">
            <Pressable
              onPress={() => showToast('Voice coming soon')}
              className="h-16 w-16 items-center justify-center rounded-2xl border border-surface-border bg-surface"
              accessibilityLabel="Voice"
              accessibilityRole="button"
            >
              <Mic size={22} strokeWidth={1.5} color="#FFFFFF" />
            </Pressable>
            <Pressable
              onPress={() => showToast('Cast coming soon')}
              className="h-16 w-16 items-center justify-center rounded-2xl border border-surface-border bg-surface"
              accessibilityLabel="Cast"
              accessibilityRole="button"
            >
              <Cast size={22} strokeWidth={1.5} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
            Media
          </Text>
          <View className="mb-5 flex-row items-center justify-center gap-3">
            <RemoteButton
              round
              size={44}
              icon={SkipBack}
              accessibilityLabel="Previous"
              onPress={() => key(KEYS.prev)}
            />
            <RemoteButton
              round
              size={44}
              icon={Rewind}
              accessibilityLabel="Rewind"
              onPress={() => key(KEYS.rewind)}
            />
            <RemoteButton
              round
              size={56}
              icon={playing ? Pause : Play}
              accessibilityLabel={playing ? 'Pause' : 'Play'}
              onPress={() => {
                setPlaying((p) => !p);
                key(KEYS.playPause);
              }}
            />
            <RemoteButton
              round
              size={44}
              icon={FastForward}
              accessibilityLabel="Fast forward"
              onPress={() => key(KEYS.fastForward)}
            />
            <RemoteButton
              round
              size={44}
              icon={SkipForward}
              accessibilityLabel="Next"
              onPress={() => key(KEYS.next)}
            />
            <RemoteButton
              round
              size={44}
              icon={Square}
              accessibilityLabel="Stop"
              onPress={() => key(KEYS.stop)}
            />
          </View>

          <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
            Numpad
          </Text>
          <View className="mb-5 flex-row flex-wrap justify-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
              <RemoteButton
                key={digit}
                size={44}
                icon={Hash}
                label={String(digit)}
                accessibilityLabel={`Digit ${digit}`}
                onPress={() => key(KEYS.digits[digit]!)}
              />
            ))}
            <RemoteButton
              size={44}
              icon={Hash}
              label="CH-"
              accessibilityLabel="Channel down"
              onPress={() => key(KEYS.chDown)}
            />
            <RemoteButton
              size={44}
              icon={Hash}
              label="CH+"
              accessibilityLabel="Channel up"
              onPress={() => key(KEYS.chUp)}
            />
          </View>

          <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
            Functions
          </Text>
          <View className="mb-5 flex-row justify-center gap-3">
            <RemoteButton
              size={56}
              icon={MonitorSmartphone}
              label="Source"
              accessibilityLabel="Source"
              onPress={() => key(KEYS.tvInput)}
            />
            <RemoteButton
              size={56}
              icon={ListVideo}
              label="Guide"
              accessibilityLabel="Guide"
              onPress={() => key(KEYS.guide)}
            />
            <RemoteButton
              size={56}
              icon={Info}
              label="Info"
              accessibilityLabel="Info"
              onPress={() => key(KEYS.info)}
            />
            <RemoteButton
              size={56}
              icon={Menu}
              label="Menu"
              accessibilityLabel="Menu"
              onPress={() => key(KEYS.menu)}
            />
          </View>

          <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
            Color
          </Text>
          <View className="flex-row justify-center gap-4">
            {[
              { color: '#FF3B30', k: KEYS.red, label: 'Red' },
              { color: '#34C759', k: KEYS.green, label: 'Green' },
              { color: '#FFCC00', k: KEYS.yellow, label: 'Yellow' },
              { color: '#007AFF', k: KEYS.blue, label: 'Blue' },
            ].map(({ color, k, label }) => (
              <Pressable
                key={label}
                onPress={() => key(k)}
                accessibilityLabel={label}
                accessibilityRole="button"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: color,
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </Sheet>
  );
}
