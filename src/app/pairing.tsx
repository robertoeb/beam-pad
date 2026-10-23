import { useCallback, useEffect, useRef, useState } from 'react';
import { PanResponder, Pressable, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, Info, Monitor, ShieldCheck, Tv } from 'lucide-react-native';
import { cancelPairing as cancelPairingService, getPairingResult, startPairing as startPairingService, submitPairingCode } from '@/services/pairing';
import { PinInput } from '@/components/PinInput';
import { TroubleshootSheet } from '@/components/TroubleshootSheet';
import { useDevicesStore } from '@/stores/devices';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label, Micro, Title } from '@/theme/typography';
import { space, radius } from '@/theme/tokens';
import type { ConnectError } from '@/protocol/errors';
import { COMMAND_PORT, PAIRING_PORT } from '@/protocol/ports';

const STEP_COPY: Record<string, string> = {
  probing: 'Contacting TV…',
  connecting: 'Contacting TV…',
  request: 'Contacting TV…',
  option: 'Contacting TV…',
  configuration: 'Contacting TV…',
  awaiting_code: '',
  secret: 'Verifying code…',
  done: '',
  failed: '',
  cancelled: '',
};

type PairStep =
  | 'probing'
  | 'connecting'
  | 'request'
  | 'option'
  | 'configuration'
  | 'awaiting_code'
  | 'secret'
  | 'done'
  | 'failed'
  | 'cancelled';

export default function PairingScreen() {
  const { host, name, port } = useLocalSearchParams();
  const h = (host as string) ?? '';
  const n = (name as string) ?? 'ATV';
  // Command-channel port: devices discovered over mDNS report the *pairing*
  // service port, so default to the command port and only honor an explicit
  // param. Persisting the pairing port here used to send every post-pair
  // connect to the wrong service (6467 instead of 6466).
  const cmdPort = Number(port) || COMMAND_PORT;
  const [step, setStep] = useState<PairStep>('probing');
  const [connectError, setConnectError] = useState<ConnectError | undefined>();
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const leftScreenRef = useRef(false);

  const addPaired = useDevicesStore((s) => s.addPaired);
  const setActive = useDevicesStore((s) => s.setActive);

  const goBack = useCallback(() => {
    if (leftScreenRef.current) return;
    leftScreenRef.current = true;
    router.back();
  }, []);

  const cancelPairing = useCallback(() => {
    cancelPairingService();
    goBack();
  }, [goBack]);

  // Swipe down anywhere on the screen to back out and pick another device.
  const swipeStartY = useRef(0);
  const swipeResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, g) =>
        g.dy > 24 && Math.abs(g.dy) > Math.abs(g.dx) * 1.5,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_e, g) => {
        if (!swipeStartY.current) swipeStartY.current = g.y0;
      },
      onPanResponderRelease: (_e, g) => {
        swipeStartY.current = 0;
        if (g.dy > 96 && !leftScreenRef.current) {
          cancelPairing();
        }
      },
      onPanResponderTerminate: () => {
        swipeStartY.current = 0;
      },
    }),
  ).current;

  const handleProtoStep = useCallback((s: string, err?: ConnectError) => {
    setStep(s as PairStep);
    if (err) setConnectError(err);
    if (s === 'failed') setShowTroubleshoot(true);
  }, []);

  const startPairing = useCallback(() => {
    setConnectError(undefined);
    setShowTroubleshoot(false);
    setStep('probing');
    startPairingService(h, handleProtoStep);
  }, [h, handleProtoStep]);

  useEffect(() => {
    startPairing();
    return () => {
      leftScreenRef.current = true;
      cancelPairingService();
    };
  }, [startPairing]);

  const handleCodeSubmit = useCallback((code: string) => {
    submitPairingCode(code);
  }, []);

  useEffect(() => {
    if (step === 'done') {
      const result = getPairingResult();
      // Never persist a device that can never connect (empty PEMs).
      if (!result?.certPem || !result?.keyPem) return;
      const device = {
        id: h,
        name: n,
        host: h,
        port: cmdPort,
        certPem: result.certPem,
        keyPem: result.keyPem,
      };
      addPaired(device);
      setActive(h);
      goBack();
    }
  }, [step, h, n, cmdPort, addPaired, setActive, goBack]);

  useEffect(() => {
    if (step === 'cancelled') {
      goBack();
    }
  }, [step, goBack]);

  const handleRetry = useCallback(() => {
    startPairing();
  }, [startPairing]);

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
      <ScreenHeader title="Pairing" back onBack={cancelPairing} />

      <View
        {...swipeResponder.panHandlers}
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
              <Spinner size={34} color="#8B8CF8" strokeWidth={2} />
            </View>
            <Label style={{ textAlign: 'center', color: '#B7BDCB' }}>
              {STEP_COPY[step] || 'Contacting TV…'}
            </Label>
          </View>
        )}

        {step === 'awaiting_code' && (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              gap: space[6],
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
                width: 64,
                height: 64,
                borderRadius: 32,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'rgba(34,211,238,0.35)',
              }}
            >
              <Gradient
                colors={BRAND_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                opacity={0.25}
              />
              <Tv size={28} color="#22D3EE" strokeWidth={1.6} />
            </View>

            <View style={{ alignItems: 'center', gap: space[2] }}>
              <Title style={{ fontSize: 22 }}>Enter the code on your TV</Title>
              <Label style={{ textAlign: 'center', color: '#B7BDCB' }}>
                {STEP_COPY.awaiting_code || `The 6-character code for ${n} is on your screen`}
              </Label>
            </View>

            <PinInput length={6} onComplete={handleCodeSubmit} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: space[2],
                paddingHorizontal: space[3],
                paddingVertical: space[2],
                borderRadius: radius.pill,
                backgroundColor: 'rgba(34,211,238,0.08)',
                borderWidth: 1,
                borderColor: 'rgba(34,211,238,0.15)',
              }}
            >
              <ShieldCheck size={14} color="#22D3EE" strokeWidth={1.8} />
              <Micro style={{ color: '#9AA0B4', letterSpacing: 0.6 }}>
                SECURE · TV DISPLAYS A 6-CHARACTER CODE
              </Micro>
            </View>
          </View>
        )}

        {step === 'done' && (
          <View style={{ alignItems: 'center', gap: space[4] }}>
            <View
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(52,211,153,0.12)',
                borderWidth: 1,
                borderColor: 'rgba(52,211,153,0.3)',
              }}
            >
              <Check size={40} color="#34D399" strokeWidth={2.2} />
            </View>
            <Title>Paired Successfully</Title>
            <Label style={{ color: '#B7BDCB' }}>{n} is ready to use</Label>
          </View>
        )}

        {step === 'failed' && (
          <ErrorState
            icon={<Monitor size={56} color="#FF453A" strokeWidth={1.5} />}
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

      {step === 'awaiting_code' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: space[6],
            paddingTop: space[2],
          }}
        >
          <Pressable
            onPress={() => setShowTroubleshoot(true)}
            hitSlop={16}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: space[1],
              minHeight: 44,
              justifyContent: 'center',
              paddingHorizontal: space[4],
            }}
          >
            <Info size={13} color="#747B8A" strokeWidth={1.8} />
            <Label style={{ color: '#9AA0B4', fontSize: 13 }}>
              No code? Check the troubleshooting tips
            </Label>
          </Pressable>
        </View>
      )}

      {isWorking && (
        <Label
          style={{
            textAlign: 'center',
            color: '#9AA0B4',
            fontSize: 12,
            paddingBottom: space[5],
          }}
        >
          Swipe down to cancel
        </Label>
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
