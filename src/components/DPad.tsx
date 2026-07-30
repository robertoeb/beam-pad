import { View } from 'react-native';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, CircleDot } from 'lucide-react-native';
import { RemoteButton } from './RemoteButton';
import { KEYS } from '@/protocol/keycodes';
import { key } from '@/lib/key';

export function DPad() {
  return (
    <View
      style={{ width: 228, height: 228, alignSelf: 'center' }}
      className="items-center justify-center"
    >
      <View style={{ position: 'absolute', top: 0 }}>
        <RemoteButton
          round
          repeat
          size={72}
          icon={ChevronUp}
          accessibilityLabel="Up"
          testID="dpad-up"
          onPress={() => key(KEYS.up)}
        />
      </View>
      <View style={{ position: 'absolute', left: 0, top: 78 }}>
        <RemoteButton
          round
          repeat
          size={72}
          icon={ChevronLeft}
          accessibilityLabel="Left"
          testID="dpad-left"
          onPress={() => key(KEYS.left)}
        />
      </View>
      <RemoteButton
        round
        size={72}
        icon={CircleDot}
        accessibilityLabel="OK"
        testID="dpad-ok"
        onPress={() => key(KEYS.ok)}
      />
      <View style={{ position: 'absolute', right: 0, top: 78 }}>
        <RemoteButton
          round
          repeat
          size={72}
          icon={ChevronRight}
          accessibilityLabel="Right"
          testID="dpad-right"
          onPress={() => key(KEYS.right)}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <RemoteButton
          round
          repeat
          size={72}
          icon={ChevronDown}
          accessibilityLabel="Down"
          testID="dpad-down"
          onPress={() => key(KEYS.down)}
        />
      </View>
    </View>
  );
}
