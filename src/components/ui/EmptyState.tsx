import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Label } from '@/theme/typography';
import { space, radius } from '@/theme/tokens';
import type { LucideIcon } from 'lucide-react-native';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
  loading?: boolean;
  testID?: string;
}

export function EmptyState({
  icon,
  title,
  body,
  actionLabel,
  onAction,
  actionIcon: ActionIcon,
  loading = false,
  testID,
}: EmptyStateProps) {
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
          borderColor: loading ? 'rgba(139,140,248,0.4)' : 'rgba(139,140,248,0.25)',
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
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: space[2],
            marginTop: space[5],
            paddingHorizontal: space[6],
            paddingVertical: space[3],
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.12)',
            backgroundColor: '#1A1A2A',
            opacity: pressed ? 0.75 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          })}
        >
          {ActionIcon ? <ActionIcon size={16} strokeWidth={2} color="#22D3EE" /> : null}
          <Label style={{ color: '#22D3EE', fontSize: 15, fontWeight: '600' }}>{actionLabel}</Label>
        </Pressable>
      )}
    </View>
  );
}
