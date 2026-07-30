import { TextInput, View, Text, Pressable } from 'react-native';
import { Sheet } from './Sheet';
import { useImeStore } from '@/stores/ime';
import { commitImeText, dismissIme } from '@/services/ime';

export function ImeSheet() {
  const visible = useImeStore((s) => s.visible);
  const label = useImeStore((s) => s.label);
  const value = useImeStore((s) => s.value);

  const handleDone = () => {
    dismissIme();
  };

  return (
    <Sheet open={visible} onClose={dismissIme} testID="ime-sheet">
      <View className="px-5 pb-6">
        <Text
          className="mb-3 text-[17px] font-semibold text-text-primary"
          style={{ fontFamily: 'Inter-SemiBold' }}
        >
          {label || 'Text Input'}
        </Text>
        <TextInput
          testID="ime-input"
          value={value}
          onChangeText={commitImeText}
          autoFocus
          selectionColor="#00E5FF"
          placeholder="Start typing..."
          placeholderTextColor="#52525B"
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 17,
            color: '#FFFFFF',
            backgroundColor: '#15161A',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            paddingHorizontal: 14,
            paddingVertical: 12,
            marginBottom: 16,
          }}
        />
        <Text className="mb-4 text-center text-[12px] text-text-muted">
          Typing on your TV
        </Text>
        <Pressable
          onPress={handleDone}
          className="items-center rounded-xl bg-accent-cyan py-3"
          accessibilityLabel="Done"
          accessibilityRole="button"
          testID="ime-done"
        >
          <Text
            className="text-[15px] font-semibold text-black"
            style={{ fontFamily: 'Inter-SemiBold' }}
          >
            Done
          </Text>
        </Pressable>
      </View>
    </Sheet>
  );
}
