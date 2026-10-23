import { tokens } from '@/theme/tokens';
import { View } from 'react-native';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, CircleDot } from 'lucide-react-native';
import { RemoteButton } from './RemoteButton';
import { Glow } from '@/theme/gradient';
import { KEYS } from '@/protocol/keycodes';
import { key } from '@/lib/key';

interface DPadProps {
  diameter?: number;
}

export function DPad({ diameter = 228 }: DPadProps) {
  const btnSize = diameter >= 240 ? 72 : 56;
  const offset = (diameter - btnSize) / 2;

  return (
    <View style={{ width: diameter, height: diameter, alignSelf: 'center' }}>
      <Glow
        color={tokens.colors.accent.cyan}
        size={diameter * 0.62}
        x={diameter * 0.19}
        y={diameter * 0.19}
        opacity={0.1}
      />
      <View style={{ position: 'absolute', top: 0, left: offset }}>
        <RemoteButton
          round
          repeat
          size={btnSize}
          icon={ChevronUp}
          accessibilityLabel="Up"
          testID="dpad-up"
          onPress={() => key(KEYS.up)}
        />
      </View>
      <View style={{ position: 'absolute', left: 0, top: offset }}>
        <RemoteButton
          round
          repeat
          size={btnSize}
          icon={ChevronLeft}
          accessibilityLabel="Left"
          testID="dpad-left"
          onPress={() => key(KEYS.left)}
        />
      </View>
      <View style={{ position: 'absolute', left: offset, top: offset }}>
        <RemoteButton
          round
          size={btnSize}
          icon={CircleDot}
          accessibilityLabel="OK"
          testID="dpad-ok"
          onPress={() => key(KEYS.ok)}
        />
      </View>
      <View style={{ position: 'absolute', right: 0, top: offset }}>
        <RemoteButton
          round
          repeat
          size={btnSize}
          icon={ChevronRight}
          accessibilityLabel="Right"
          testID="dpad-right"
          onPress={() => key(KEYS.right)}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 0, left: offset }}>
        <RemoteButton
          round
          repeat
          size={btnSize}
          icon={ChevronDown}
          accessibilityLabel="Down"
          testID="dpad-down"
          onPress={() => key(KEYS.down)}
        />
      </View>
    </View>
  );
}
