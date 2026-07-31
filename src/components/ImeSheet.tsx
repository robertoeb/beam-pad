import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { Sheet } from './Sheet';
import { useImeStore } from '@/stores/ime';
import { commitImeText, dismissIme } from '@/services/ime';
import { Button } from '@/components/ui/Button';
import { Title } from '@/theme/typography';
import { space } from '@/theme/tokens';

export function ImeSheet() {
  const visible = useImeStore((s) => s.visible);
  const label = useImeStore((s) => s.label);
  const value = useImeStore((s) => s.value);
  const inputRef = useRef<TextInput>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) =>
      setKeyboardHeight(e.endCoordinates.height),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const handleDone = () => {
    dismissIme();
  };

  return (
    <Sheet open={visible} onClose={dismissIme} testID="ime-sheet" bottomInset={keyboardHeight}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={{ paddingHorizontal: space[5], paddingBottom: space[6] }}>
          <Title style={{ marginBottom: 12 }}>{label || 'Text Input'}</Title>
          <TextInput
            ref={inputRef}
            testID="ime-input"
            value={value}
            onChangeText={commitImeText}
            selectionColor="#22D3EE"
            placeholder="Start typing..."
            placeholderTextColor="#747B8A"
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 17,
              color: '#FFFFFF',
              backgroundColor: '#15151F',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.09)',
              paddingHorizontal: 14,
              paddingVertical: 14,
              marginBottom: 16,
            }}
          />
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View
              style={{
                borderRadius: 999,
                backgroundColor: 'rgba(34,211,238,0.08)',
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <Title style={{ fontSize: 11, color: '#22D3EE', fontFamily: 'Inter-Medium' }}>
                Typing on your TV
              </Title>
            </View>
          </View>
          <Button label="Done" onPress={handleDone} fullWidth testID="ime-done" />
        </View>
      </KeyboardAvoidingView>
    </Sheet>
  );
}
