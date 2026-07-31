import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Label } from '@/theme/typography';
import { space, radius } from '@/theme/tokens';

interface ErrorStateProps {
  icon?: ReactNode;
  title: string;
  body?: string;
  retryLabel?: string;
  onRetry?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  testID?: string;
}

export function ErrorState({
  icon,
  title,
  body,
  retryLabel,
  onRetry,
  secondaryLabel,
  onSecondary,
  testID,
}: ErrorStateProps) {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space[8] }}
      testID={testID}
    >
      {icon && (
        <View
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: space[5],
            backgroundColor: 'rgba(255,69,58,0.08)',
            borderWidth: 1,
            borderColor: 'rgba(255,69,58,0.25)',
          }}
        >
          {icon}
        </View>
      )}
      <Label style={{ textAlign: 'center', fontSize: 16, marginBottom: body ? space[2] : 0 }}>
        {title}
      </Label>
      {body && (
        <Label
          style={{
            textAlign: 'center',
            color: '#B7BDCB',
            marginBottom: retryLabel || secondaryLabel ? space[5] : 0,
          }}
        >
          {body}
        </Label>
      )}
      {(retryLabel || secondaryLabel) && (
        <View style={{ flexDirection: 'row', gap: space[3], marginTop: space[4] }}>
          {retryLabel && onRetry && (
            <Pressable
              onPress={onRetry}
              accessibilityRole="button"
              accessibilityLabel={retryLabel}
              style={{
                paddingVertical: space[3],
                paddingHorizontal: space[5],
                borderRadius: radius.md,
                backgroundColor: 'rgba(34,211,238,0.14)',
                borderWidth: 1,
                borderColor: 'rgba(34,211,238,0.35)',
              }}
            >
              <Label style={{ color: '#22D3EE' }}>{retryLabel}</Label>
            </Pressable>
          )}
          {secondaryLabel && onSecondary && (
            <Pressable
              onPress={onSecondary}
              accessibilityRole="button"
              accessibilityLabel={secondaryLabel}
              style={{
                paddingVertical: space[3],
                paddingHorizontal: space[5],
                borderRadius: radius.md,
                backgroundColor: '#1A1A2A',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <Label style={{ color: '#B7BDCB' }}>{secondaryLabel}</Label>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
