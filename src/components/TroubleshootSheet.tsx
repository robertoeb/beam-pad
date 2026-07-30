import { useCallback } from 'react';
import { Pressable, ScrollView, Text, View, Clipboard } from 'react-native';
import { Sheet } from './Sheet';
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

  const showRepair =
    error?.code === 'CERT_REVOKED' || error?.code === 'PAIRING_REJECTED';

  return (
    <Sheet open={open} onClose={onClose} testID="troubleshoot-sheet">
      <ScrollView className="px-6 pb-8" contentContainerClassName="gap-4">
        <Text className="font-semibold text-xl text-text-primary">
          {error?.message ?? 'Connection error'}
        </Text>

        {error?.steps && error.steps.length > 0 && (
          <View className="gap-2">
            {error.steps.map((step, i) => (
              <View key={i} className="flex-row items-start gap-2">
                <Text className="mt-0.5 text-sm text-accent-cyan">•</Text>
                <Text className="flex-1 text-sm text-text-secondary">{step}</Text>
              </View>
            ))}
          </View>
        )}

        <View className="flex-row flex-wrap gap-3 pt-2">
          {error?.retryable && onRetry && (
            <Pressable
              onPress={onRetry}
              className="rounded-lg bg-accent-cyan/10 px-5 py-2.5"
              testID="troubleshoot-retry"
            >
              <Text className="font-medium text-sm text-accent-cyan">Retry</Text>
            </Pressable>
          )}

          {showRepair && onRepair && (
            <Pressable
              onPress={onRepair}
              className="rounded-lg bg-accent-cyan/10 px-5 py-2.5"
              testID="troubleshoot-repair"
            >
              <Text className="font-medium text-sm text-accent-cyan">Re-pair</Text>
            </Pressable>
          )}

          <Pressable
            onPress={handleCopyDiagnostics}
            className="rounded-lg bg-surface-elevated px-5 py-2.5"
            testID="troubleshoot-copy"
          >
            <Text className="font-medium text-sm text-text-secondary">Copy diagnostics</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Sheet>
  );
}
