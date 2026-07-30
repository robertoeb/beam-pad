import { View, Text, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useLayoutStore } from '@/stores/layout';

const APP_LABELS: Record<string, string> = {
  netflix: 'Nfx',
  youtube: 'YT',
  prime: 'Pri',
  disney: 'Dis',
  hulu: 'Hul',
  hbo: 'HBO',
  spotify: 'Spo',
  apple: 'TV+',
};

export function PinnedAppsRow() {
  const pinned = useLayoutStore((s) => s.pinned);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'center',
      }}
    >
      {pinned.map((id) => (
        <Pressable
          key={id}
          accessibilityRole="button"
          accessibilityLabel={`Open ${APP_LABELS[id] ?? id}`}
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: '#0C0C0E',
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
            {APP_LABELS[id] ?? id.slice(0, 3).charAt(0).toUpperCase() + id.slice(1, 3)}
          </Text>
        </Pressable>
      ))}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add app"
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
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
    </View>
  );
}
