import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { radius } from '@/theme/tokens';

interface CardProps extends ViewProps {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true, style, ...rest }: CardProps) {
  return (
    <View
      style={[
        {
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.07)',
          backgroundColor: 'rgba(19,19,30,0.8)',
          overflow: 'hidden',
        },
        padded && { padding: 16 },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
