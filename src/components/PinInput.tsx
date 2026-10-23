import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import type { TextInputInstance } from 'react-native';
import { haptic } from '@/lib/haptics';
import { Label } from '@/theme/typography';
import {radius, space, tokens} from '@/theme/tokens';

interface PinInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

const BOX_SIZE = 46;
const BOX_HEIGHT = 58;

export function PinInput({ length = 6, onComplete }: PinInputProps) {
  const inputRef = useRef<TextInputInstance | null>(null);
  const [digits, setDigits] = useState<string[]>([]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const t = setTimeout(focusInput, 120);
    return () => clearTimeout(t);
  }, [focusInput]);

  const handleChange = useCallback(
    (text: string) => {
      const filtered = text.replace(/[^0-9A-Fa-f]/g, '');
      const next = filtered.split('').slice(0, length);
      setDigits((prev) => {
        if (next.length > prev.length) {
          haptic('light');
        }
        return next;
      });
      if (next.length === length) {
        onComplete(next.join('').toUpperCase());
      }
    },
    [length, onComplete],
  );

  const boxes = useMemo(
    () =>
      Array.from({ length }, (_, i) => {
        const filled = i < digits.length;
        const active = i === digits.length && digits.length < length;
        return (
          <View
            key={i}
            style={[
              styles.box,
              filled ? styles.boxFilled : undefined,
              active ? styles.boxActive : undefined,
            ]}
          >
            <Label style={[styles.boxText, filled ? styles.boxTextFilled : undefined]}>
              {digits[i] ?? ''}
            </Label>
            {active ? <View style={styles.caret} /> : null}
          </View>
        );
      }),
    [digits, length],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.wrapper}
    >
      <View style={styles.row}>
        <View style={styles.boxes} pointerEvents="none" accessible={false}>
          {boxes}
        </View>
        <TextInput
          ref={inputRef}
          value={digits.join('')}
          onChangeText={handleChange}
          keyboardType="ascii-capable"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          textContentType="none"
          returnKeyType="done"
          blurOnSubmit={false}
          showSoftInputOnFocus
          importantForAutofill="no"
          cursorColor="transparent"
          caretHidden
          testID="pin-input"
          accessibilityLabel="6-character pairing code"
          accessibilityValue={{ now: digits.length, max: length, text: `${digits.length} of ${length} digits entered` }}
          style={styles.hiddenInput}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxes: {
    flexDirection: 'row',
    gap: space[2],
  },
  box: {
    width: BOX_SIZE,
    height: BOX_HEIGHT,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(19,19,30,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderColor: 'rgba(34,211,238,0.6)',
    backgroundColor: 'rgba(34,211,238,0.07)',
  },
  boxFilled: {
    borderColor: 'rgba(34,211,238,0.45)',
    backgroundColor: 'rgba(34,211,238,0.14)',
  },
  boxText: {
    fontSize: 28,
    lineHeight: 34,
    color: tokens.colors.text.primary,
    fontFamily: 'Inter-SemiBold',
  },
  boxTextFilled: {
    color: tokens.colors.accent.cyan,
  },
  caret: {
    position: 'absolute',
    bottom: 10,
    width: 6,
    height: 2,
    borderRadius: 1,
    backgroundColor: tokens.colors.accent.cyan,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: 'transparent',
    backgroundColor: 'transparent',
    fontSize: 1,
    opacity: 1,
  },
});
