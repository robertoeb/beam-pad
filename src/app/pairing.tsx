import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckCircle2, XCircle } from 'lucide-react-native';
import { PairingProtocol } from '@/protocol/PairingProtocol';
import { PinInput } from '@/components/PinInput';
import { TroubleshootSheet } from '@/components/TroubleshootSheet';
import { useDevicesStore } from '@/stores/devices';
import type { ConnectError } from '@/protocol/errors';
import { PAIRING_PORT } from '@/protocol/ports';

const STEP_COPY: Record<string, string> = {
  probing: 'Contacting TV…',
  connecting: 'Contacting TV…',
  request: 'Contacting TV…',
  option: 'Contacting TV…',
  configuration: 'Contacting TV…',
  awaiting_code: 'Enter the 6-character code shown on your TV',
  secret: 'Verifying code…',
  done: '',
  failed: '',
};

export default function PairingScreen() {
  const { host, name } = useLocalSearchParams();
  const h = (host as string) ?? '';
  const n = (name as string) ?? 'ATV';
  const [step, setStep] = useState<
    | 'probing'
    | 'connecting'
    | 'request'
    | 'option'
    | 'configuration'
    | 'awaiting_code'
    | 'secret'
    | 'done'
    | 'failed'
  >('probing');
  const [connectError, setConnectError] = useState<ConnectError | undefined>();
  const [proto, setProto] = useState<PairingProtocol | null>(null);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  const addPaired = useDevicesStore((s) => s.addPaired);
  const setActive = useDevicesStore((s) => s.setActive);

  useEffect(() => {
    const cb = {
      onStep: (s: string, err?: ConnectError) => {
        setStep(s as any);
        if (err) setConnectError(err);
        if (s === 'failed') setShowTroubleshoot(true);
      },
    };
    const p = new PairingProtocol(h, cb);
    setProto(p);
    p.start();
  }, [h]);

  const handleCodeSubmit = useCallback(
    (code: string) => {
      proto?.submitCode(code);
    },
    [proto],
  );

  useEffect(() => {
    if (step === 'done' && proto) {
      const result = proto.getResult();
      const device = {
        id: h,
        name: n,
        host: h,
        port: PAIRING_PORT,
        certPem: result?.certPem ?? '',
        keyPem: result?.keyPem ?? '',
      };
      addPaired(device);
      setActive(h);
      router.back();
    }
  }, [step, proto, h, n, addPaired, setActive]);

  const handleRetry = useCallback(() => {
    setConnectError(undefined);
    setShowTroubleshoot(false);
    setStep('probing');
    const cb = {
      onStep: (s: string, err?: ConnectError) => {
        setStep(s as any);
        if (err) setConnectError(err);
        if (s === 'failed') setShowTroubleshoot(true);
      },
    };
    const p = new PairingProtocol(h, cb);
    setProto(p);
    p.start();
  }, [h]);

  const handleRepair = useCallback(() => {
    handleRetry();
  }, [handleRetry]);

  const isWorking = [
    'probing',
    'connecting',
    'request',
    'option',
    'configuration',
    'secret',
  ].includes(step);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-6 px-8">
        {isWorking && (
          <View className="items-center gap-4">
            <ActivityIndicator size="large" color="#00E5FF" />
            <Text className="text-center font-medium text-[15px] text-text-secondary">
              {STEP_COPY[step]}
            </Text>
          </View>
        )}

        {step === 'awaiting_code' && (
          <View className="items-center gap-6">
            <Text className="text-center font-medium text-[15px] text-text-secondary">
              {STEP_COPY.awaiting_code}
            </Text>
            <PinInput length={6} onComplete={handleCodeSubmit} />
          </View>
        )}

        {step === 'done' && (
          <View className="items-center gap-4">
            <CheckCircle2 size={56} color="#00E5FF" strokeWidth={1.5} />
            <Text className="font-semibold text-xl text-text-primary">Paired Successfully</Text>
            <Text className="font-medium text-sm text-text-secondary">{n} is ready to use</Text>
          </View>
        )}

        {step === 'failed' && (
          <View className="items-center gap-4">
            <XCircle size={56} color="#FF3B30" strokeWidth={1.5} />
            <Text className="font-semibold text-xl text-text-primary">Pairing Failed</Text>
            <Text className="px-4 text-center font-medium text-sm text-text-secondary">
              {connectError?.message ?? 'The TV rejected pairing. Try again from its remote settings.'}
            </Text>
            <Pressable
              onPress={() => setShowTroubleshoot(true)}
              className="mt-4 rounded-lg bg-accent-cyan/10 px-6 py-3"
            >
              <Text className="font-medium text-sm text-accent-cyan">Troubleshoot</Text>
            </Pressable>
          </View>
        )}
      </View>

      <TroubleshootSheet
        open={showTroubleshoot}
        onClose={() => setShowTroubleshoot(false)}
        error={connectError}
        host={h}
        port={PAIRING_PORT}
        onRetry={connectError?.retryable ? handleRetry : undefined}
        onRepair={
          connectError?.code === 'CERT_REVOKED' || connectError?.code === 'PAIRING_REJECTED'
            ? handleRepair
            : undefined
        }
      />
    </SafeAreaView>
  );
}
