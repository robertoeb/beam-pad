import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Label } from '@/theme/typography';
import {radius, tokens} from '@/theme/tokens';
import type { LucideIcon } from 'lucide-react-native';

interface SettingRowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  children?: ReactNode;
  icon?: LucideIcon;
  stack?: boolean;
  testID?: string;
}

export function SettingRow({
  label,
  value,
  onPress,
  children,
  icon: Icon,
  stack = false,
  testID,
}: SettingRowProps) {
  const content = (
    <View
      style={{
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        backgroundColor: 'rgba(19,19,30,0.8)',
        paddingHorizontal: 16,
        paddingVertical: stack ? 14 : 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {Icon && (
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              backgroundColor: 'rgba(139,140,248,0.1)',
              borderWidth: 1,
              borderColor: 'rgba(139,140,248,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={17} strokeWidth={1.6} color={tokens.colors.accent.violet} />
          </View>
        )}
        <Label style={{ color: tokens.colors.text.primary, flexShrink: 1, flex: 1 }}>{label}</Label>
        {!stack &&
          (children ?? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              {value ? <Label style={{ color: tokens.colors.text.secondary }}>{value}</Label> : null}
              {onPress ? <ChevronRight size={16} color={tokens.colors.text.secondary} /> : null}
            </View>
          ))}
      </View>
      {stack && children ? <View style={{ marginTop: 14 }}>{children}</View> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        testID={testID}
        style={{ marginBottom: 8 }}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={{ marginBottom: 8 }}>{content}</View>;
}
