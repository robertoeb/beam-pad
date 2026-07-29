import { useState, useRef, useCallback, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';

interface PinInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export function PinInput({ length = 6, onComplete }: PinInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [digits, setDigits] = useState<string[]>([]);

  const handleChange = useCallback(
    (text: string) => {
      const filtered = text.replace(/[^0-9A-Fa-f]/g, '');
      const newDigits = filtered.split('').slice(0, length);
      setDigits(newDigits);
      if (newDigits.length === length) {
        onComplete(newDigits.join('').toUpperCase());
      }
    },
    [length, onComplete],
  );

  const boxes = useMemo(
    () =>
      Array.from({ length }, (_, i) => (
        <View
          key={i}
          className={`h-14 w-12 items-center justify-center rounded-lg border ${
            i < digits.length ? 'border-accent-cyan bg-surface-elevated' : 'border-surface-border bg-surface'
          }`}
        >
          <Text className="text-[40px] font-semibold text-text-primary">
            {digits[i] ?? ''}
          </Text>
        </View>
      )),
    [digits, length],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      className="flex-1 items-center justify-center gap-6"
    >
      <View className="flex-row gap-2">{boxes}</View>
      <TextInput
        ref={inputRef}
        value={digits.join('')}
        onChangeText={handleChange}
        keyboardType="ascii-capable"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        textContentType="none"
        className="absolute opacity-0 w-1 h-1"
        autoFocus
        returnKeyType="done"
        blurOnSubmit
      />
    </KeyboardAvoidingView>
  );
}
