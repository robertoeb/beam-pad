import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { Title } from '@/theme/typography';
import { space } from '@/theme/tokens';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  backLabel?: string;
  onBack?: () => void;
  trailing?: ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  back = false,
  backLabel = 'Back',
  onBack,
  trailing,
}: ScreenHeaderProps) {
  const handleBack = onBack ?? (() => router.back());

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 48,
        marginBottom: space[4],
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3], flex: 1 }}>
        {back && (
          <Pressable
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel={backLabel}
            hitSlop={12}
            style={{
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <ArrowLeft size={20} color="#F5F6FA" />
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          <Title numberOfLines={1}>{title}</Title>
          {subtitle ? (
            <Title
              numberOfLines={1}
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: '#747B8A',
                fontFamily: 'Inter-Regular',
              }}
            >
              {subtitle}
            </Title>
          ) : null}
        </View>
      </View>
      {trailing && <View>{trailing}</View>}
    </View>
  );
}
