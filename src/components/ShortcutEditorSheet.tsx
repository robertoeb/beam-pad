import { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { X, Plus, Trash2, Play, GripVertical } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { Sheet } from './Sheet';
import { shortcutRegistry } from '@/shortcuts/registry';
import { KEYS } from '@/protocol/keycodes';
import { TV_APPS } from '@/protocol/deeplinks';
import { executeMacro } from '@/services/shortcuts';
import type { MacroStep, UserShortcut } from '@/shortcuts/types';
import { userShortcutId } from '@/shortcuts/types';
import { space, radius } from '@/theme/tokens';

interface ShortcutEditorSheetProps {
  visible: boolean;
  onClose: () => void;
  onCreated?: (shortcut: UserShortcut) => void;
}

type ActionType = 'key' | 'macro';

let _counter = 0;
function nextId(): string {
  _counter++;
  return `user_${Date.now()}_${_counter}`;
}

export function ShortcutEditorSheet({ visible, onClose, onCreated }: ShortcutEditorSheetProps) {
  const [label, setLabel] = useState('');
  const [actionType, setActionType] = useState<ActionType>('key');
  const [selectedKey, setSelectedKey] = useState('guide');
  const [macroSteps, setMacroSteps] = useState<MacroStep[]>([]);

  const reset = () => {
    setLabel('');
    setActionType('key');
    setSelectedKey('guide');
    setMacroSteps([]);
  };

  const addStep = (step: MacroStep) => {
    setMacroSteps((prev) => [...prev, step]);
  };

  const removeStep = (index: number) => {
    setMacroSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!label.trim()) return;

    const id = userShortcutId(nextId());
    const shortcut: UserShortcut = {
      id,
      label: label.trim(),
      icon: actionType === 'key' ? selectedKey : 'playPause',
      builtIn: false,
      action:
        actionType === 'key'
          ? { kind: 'key', keyCode: KEYS[selectedKey as keyof typeof KEYS] as number }
          : { kind: 'macro', steps: macroSteps },
    };

    shortcutRegistry.addUserShortcut(shortcut);
    onCreated?.(shortcut);
    reset();
    onClose();
  };

  const handleTest = async () => {
    if (macroSteps.length === 0) return;
    await executeMacro(macroSteps);
  };

  const keyEntries = Object.entries(KEYS).filter(([k]) => k !== 'digits');

  return (
    <Sheet open={visible} onClose={onClose}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: space[4] }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#A1A1AA', marginBottom: space[2] }}>
          Label
        </Text>
        <TextInput
          value={label}
          onChangeText={setLabel}
          placeholder="Shortcut name"
          placeholderTextColor="#52525B"
          style={{
            backgroundColor: '#15161A',
            borderRadius: radius.md,
            padding: space[3],
            color: '#FFFFFF',
            fontSize: 15,
            marginBottom: space[4],
          }}
        />

        <Text style={{ fontSize: 13, fontWeight: '600', color: '#A1A1AA', marginBottom: space[2] }}>
          Action Type
        </Text>
        <View style={{ flexDirection: 'row', gap: space[2], marginBottom: space[4] }}>
          <Pressable
            onPress={() => setActionType('key')}
            style={{
              flex: 1,
              padding: space[3],
              borderRadius: radius.md,
              backgroundColor: actionType === 'key' ? '#00E5FF' : '#15161A',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: actionType === 'key' ? '#000' : '#A1A1AA', fontWeight: '600' }}>
              Single Key
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActionType('macro')}
            style={{
              flex: 1,
              padding: space[3],
              borderRadius: radius.md,
              backgroundColor: actionType === 'macro' ? '#00E5FF' : '#15161A',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: actionType === 'macro' ? '#000' : '#A1A1AA', fontWeight: '600' }}>
              Macro
            </Text>
          </Pressable>
        </View>

        {actionType === 'key' && (
          <>
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#A1A1AA', marginBottom: space[2] }}>
              Key
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2], marginBottom: space[4] }}>
              {keyEntries.map(([keyName]) => (
                <Pressable
                  key={keyName}
                  onPress={() => setSelectedKey(keyName)}
                  style={{
                    padding: space[2],
                    borderRadius: radius.sm,
                    backgroundColor: selectedKey === keyName ? '#00E5FF' : '#15161A',
                  }}
                >
                  <Text style={{ color: selectedKey === keyName ? '#000' : '#A1A1AA', fontSize: 12 }}>
                    {keyName}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {actionType === 'macro' && (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: space[2] }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#A1A1AA' }}>
                Steps ({macroSteps.length})
              </Text>
              <Pressable onPress={handleTest} disabled={macroSteps.length === 0}>
                <Play size={18} color={macroSteps.length > 0 ? '#00E5FF' : '#52525B'} />
              </Pressable>
            </View>

            {macroSteps.map((step, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#15161A',
                  borderRadius: radius.sm,
                  padding: space[2],
                  marginBottom: space[2],
                }}
              >
                <GripVertical size={14} color="#52525B" />
                <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 13, marginLeft: space[2] }}>
                  {step.type === 'key'
                    ? `Key: ${Object.entries(KEYS).find(([, v]) => v === step.keyCode)?.[0] ?? '?'}`
                    : step.type === 'app'
                      ? `App: ${step.appId}`
                      : `Wait: ${step.ms}ms`}
                </Text>
                <Pressable onPress={() => removeStep(i)}>
                  <Trash2 size={14} color="#FF3B30" />
                </Pressable>
              </View>
            ))}

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#A1A1AA', marginTop: space[3], marginBottom: space[2] }}>
              Add Step
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
              {keyEntries.slice(0, 10).map(([keyName, keyCode]) => (
                <Pressable
                  key={keyName}
                  onPress={() => addStep({ type: 'key', keyCode: keyCode as number })}
                  style={{
                    padding: space[2],
                    borderRadius: radius.sm,
                    backgroundColor: '#15161A',
                  }}
                >
                  <Text style={{ color: '#A1A1AA', fontSize: 11 }}>+ {keyName}</Text>
                </Pressable>
              ))}
              <Pressable
                onPress={() => addStep({ type: 'wait', ms: 500 })}
                style={{
                  padding: space[2],
                  borderRadius: radius.sm,
                  backgroundColor: '#15161A',
                }}
              >
                <Text style={{ color: '#A1A1AA', fontSize: 11 }}>+ Wait 500ms</Text>
              </Pressable>
            </View>
          </>
        )}

        <Pressable
          onPress={handleCreate}
          disabled={!label.trim()}
          style={{
            marginTop: space[5],
            padding: space[3],
            borderRadius: radius.md,
            backgroundColor: label.trim() ? '#00E5FF' : '#52525B',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#000', fontWeight: '700', fontSize: 15 }}>Create</Text>
        </Pressable>
      </ScrollView>
    </Sheet>
  );
}
