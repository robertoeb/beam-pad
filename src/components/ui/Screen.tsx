import { ReactNode } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Gradient, Glow, SCREEN_GRADIENT } from '@/theme/gradient';
import { space } from '@/theme/tokens';

interface ScreenProps extends ViewProps {
  children: ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  scroll?: boolean;
  testID?: string;
}

export function Screen({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  scroll = false,
  testID,
  ...rest
}: ScreenProps) {
  const body = (
    <View style={{ flex: 1, paddingHorizontal: space[5] }} {...rest}>
      {children}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A12' }} testID={testID}>
      <Gradient colors={SCREEN_GRADIENT} />
      <Glow color="#6D5DF6" size={420} x={-160} y={-140} opacity={0.16} />
      <Glow color="#22D3EE" size={380} x={-120} y={520} opacity={0.1} />
      <SafeAreaView edges={edges} style={{ flex: 1 }}>
        <StatusBar style="light" />
        {scroll ? <ScrollView style={{ flex: 1 }}>{body}</ScrollView> : body}
      </SafeAreaView>
    </View>
  );
}
