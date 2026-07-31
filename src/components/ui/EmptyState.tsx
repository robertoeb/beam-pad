import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Label } from '@/theme/typography';
import { space, radius } from '@/theme/tokens';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
  testID?: string;
}

export function EmptyState({ icon, title, body, actionLabel, onAction, testID }: EmptyStateProps) {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space[8] }}
      testID={testID}
    >
      <View
        style={{
          width: 88,
          height: 88,
          borderRadius: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: space[5],
          backgroundColor: 'rgba(139,140,248,0.08)',
          borderWidth: 1,
          borderColor: 'rgba(139,140,248,0.25)',
        }}
      >
        {icon}
      </View>
      <Label style={{ textAlign: 'center', fontSize: 16, marginBottom: body ? space[2] : 0 }}>
        {title}
      </Label>
      {body && (
        <Label
          style={{
            textAlign: 'center',
            color: '#B7BDCB',
            marginBottom: actionLabel ? space[5] : 0,
          }}
        >
          {body}
        </Label>
      )}
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={{
            marginTop: space[4],
            paddingVertical: space[3],
            paddingHorizontal: space[6],
            borderRadius: radius.md,
            backgroundColor: '#22D3EE',
          }}
        >
          <Label style={{ color: '#000000', fontWeight: '600' }}>{actionLabel}</Label>
        </Pressable>
      )}
    </View>
  );
}
