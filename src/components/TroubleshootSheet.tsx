import { tokens } from '@/theme/tokens';
import { useCallback } from 'react';
import { Pressable, ScrollView, View, Clipboard } from 'react-native';
import { Sheet } from './Sheet';
import { Title, Label } from '@/theme/typography';
import type { ConnectError } from '@/protocol/errors';

interface TroubleshootSheetProps {
  open: boolean;
  onClose: () => void;
  error?: ConnectError;
  host?: string;
  port?: number;
  onRetry?: () => void;
  onRepair?: () => void;
}

export function TroubleshootSheet({
  open,
  onClose,
  error,
  host,
  port,
  onRetry,
  onRepair,
}: TroubleshootSheetProps) {
  const handleCopyDiagnostics = useCallback(() => {
    if (!error) return;
    const lines = [
      `code: ${error.code}`,
      `message: ${error.message}`,
      host ? `host: ${host}` : '',
      port ? `port: ${port}` : '',
      error.detail ? `detail: ${error.detail}` : '',
      `appVersion: 1.0.0`,
    ].filter(Boolean);
    Clipboard.setString(lines.join('\n'));
  }, [error, host, port]);

  const showRepair = error?.code === 'CERT_REVOKED' || error?.code === 'PAIRING_REJECTED';

  return (
    <Sheet open={open} onClose={onClose} testID="troubleshoot-sheet">
      <ScrollView
        style={{ flexShrink: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, gap: 12 }}
      >
        <Title>{error?.message ?? 'Connection error'}</Title>

        {error?.steps && error.steps.length > 0 && (
          <View style={{ gap: 10, marginTop: 4 }}>
            {error.steps.map((step, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: 'rgba(34,211,238,0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 1,
                  }}
                >
                  <Title style={{ fontSize: 11, color: tokens.colors.accent.cyan, fontFamily: 'Inter-Medium' }}>
                    {i + 1}
                  </Title>
                </View>
                <Label style={{ flex: 1, color: tokens.colors.text.secondary, fontSize: 14 }}>{step}</Label>
              </View>
            ))}
          </View>
        )}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingTop: 8 }}>
          {error?.retryable && onRetry && (
            <Pressable
              onPress={onRetry}
              style={{
                borderRadius: 14,
                backgroundColor: 'rgba(34,211,238,0.12)',
                borderWidth: 1,
                borderColor: 'rgba(34,211,238,0.35)',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              testID="troubleshoot-retry"
            >
              <Label style={{ color: tokens.colors.accent.cyan }}>Retry</Label>
            </Pressable>
          )}

          {showRepair && onRepair && (
            <Pressable
              onPress={onRepair}
              style={{
                borderRadius: 14,
                backgroundColor: 'rgba(34,211,238,0.12)',
                borderWidth: 1,
                borderColor: 'rgba(34,211,238,0.35)',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              testID="troubleshoot-repair"
            >
              <Label style={{ color: tokens.colors.accent.cyan }}>Re-pair</Label>
            </Pressable>
          )}

          <Pressable
            onPress={handleCopyDiagnostics}
            style={{
              borderRadius: 14,
              backgroundColor: tokens.colors.surface.elevated,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            testID="troubleshoot-copy"
          >
            <Label style={{ color: tokens.colors.text.secondary }}>Copy diagnostics</Label>
          </Pressable>
        </View>
      </ScrollView>
    </Sheet>
  );
}
