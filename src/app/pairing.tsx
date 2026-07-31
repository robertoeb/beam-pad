import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckCircle2, XCircle } from 'lucide-react-native';
import { PairingProtocol } from '@/protocol/PairingProtocol';
import { PinInput } from '@/components/PinInput';
import { TroubleshootSheet } from '@/components/TroubleshootSheet';
import { useDevicesStore } from '@/stores/devices';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label, Title } from '@/theme/typography';
import { space, radius } from '@/theme/tokens';
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
    <Screen>
      <ScreenHeader title="Pairing" back />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: space[6],
          paddingHorizontal: space[8],
        }}
      >
        {isWorking && (
          <View style={{ alignItems: 'center', gap: space[4] }}>
            <View
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(139,140,248,0.1)',
                borderWidth: 1,
                borderColor: 'rgba(139,140,248,0.25)',
              }}
            >
              <ActivityIndicator size="large" color="#8B8CF8" />
            </View>
            <Label style={{ textAlign: 'center', color: '#B7BDCB' }}>{STEP_COPY[step]}</Label>
          </View>
        )}

        {step === 'awaiting_code' && (
          <View
            style={{
              alignItems: 'center',
              gap: space[6],
              width: '100%',
              borderRadius: radius.xl,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.07)',
              backgroundColor: 'rgba(19,19,30,0.8)',
              paddingVertical: space[8],
              paddingHorizontal: space[6],
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: 'rgba(34,211,238,0.1)',
                borderWidth: 1,
                borderColor: 'rgba(34,211,238,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Gradient
                colors={BRAND_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                opacity={0.25}
              />
              <Title style={{ fontSize: 20, color: '#22D3EE' }}>{n[0]?.toUpperCase() ?? 'T'}</Title>
            </View>
            <Label style={{ textAlign: 'center', color: '#B7BDCB' }}>
              {STEP_COPY.awaiting_code}
            </Label>
            <PinInput length={6} onComplete={handleCodeSubmit} />
          </View>
        )}

        {step === 'done' && (
          <View style={{ alignItems: 'center', gap: space[4] }}>
            <CheckCircle2 size={56} color="#22D3EE" strokeWidth={1.5} />
            <Title>Paired Successfully</Title>
            <Label style={{ color: '#B7BDCB' }}>{n} is ready to use</Label>
          </View>
        )}

        {step === 'failed' && (
          <ErrorState
            icon={<XCircle size={56} color="#FF453A" strokeWidth={1.5} />}
            title="Pairing Failed"
            body={
              connectError?.message ??
              'The TV rejected pairing. Try again from its remote settings.'
            }
            secondaryLabel="Troubleshoot"
            onSecondary={() => setShowTroubleshoot(true)}
            retryLabel={connectError?.retryable ? 'Retry' : undefined}
            onRetry={connectError?.retryable ? handleRetry : undefined}
          />
        )}
      </View>

      {step === 'failed' && !connectError?.retryable && (
        <View style={{ paddingHorizontal: space[5], paddingBottom: space[6] }}>
          <Button label="Try again" onPress={handleRetry} fullWidth variant="secondary" />
        </View>
      )}

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
    </Screen>
  );
}
