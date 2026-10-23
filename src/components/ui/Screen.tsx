import { ReactNode } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuroraBackground } from '@/components/AuroraBackground';
import {space, tokens} from '@/theme/tokens';

interface ScreenProps extends ViewProps {
  children: ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  scroll?: boolean;
  testID?: string;
  /** Horizontal gutter; defaults to the comfortable density. Screens inside
   * the remote flow pass metrics.gutter so density scales the margins. */
  gutter?: number;
}

export function Screen({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  scroll = false,
  testID,
  gutter = space[5],
  ...rest
}: ScreenProps) {
  const body = (
    <View style={{ flex: 1, paddingHorizontal: gutter }} {...rest}>
      {children}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.background }} testID={testID}>
      <AuroraBackground />
      <SafeAreaView edges={edges} style={{ flex: 1 }}>
        <StatusBar style="light" />
        {scroll ? <ScrollView style={{ flex: 1 }}>{body}</ScrollView> : body}
      </SafeAreaView>
    </View>
  );
}
