import type { RemoteClient } from '@/protocol/RemoteClient';
import { getClient } from '@/services/session';
import { getApp } from '@/protocol/deeplinks';
import { showToast } from '@/components/Toast';
import { voiceStart, voiceStop } from '@/services/voice';

const NO_TV_MESSAGE = 'No TV connected - pick a device';

function notifyNoTv(): void {
  // Debounce lives in the Toast store (ToastHost); always report here.
  showToast(NO_TV_MESSAGE);
}

/**
 * Single command entry point for sending commands to the active TV.
 * All "no TV connected" feedback funnels through the shared toast policy.
 */
export const remote = {
  key(code: number): boolean {
    const client = getClient();
    if (!client) {
      notifyNoTv();
      return false;
    }
    client.keyPress(code);
    return true;
  },

  longPress(code: number): { end(): void } {
    const client = getClient();
    if (!client) {
      notifyNoTv();
      return { end() {} };
    }
    client.keyLongStart(code);
    return {
      end() {
        getClient()?.keyLongEnd(code);
      },
    };
  },

  launch(appId: string): boolean {
    const app = getApp(appId);
    if (!app) return false;
    const client = getClient();
    if (!client) {
      notifyNoTv();
      return false;
    }
    client.launchApp(app.deepLink);
    return true;
  },

  ime(batch: Parameters<RemoteClient['imeBatchEdit']>[0]): void {
    getClient()?.imeBatchEdit(batch);
  },

  voice: {
    start(): Promise<number | false> {
      return voiceStart();
    },
    stop(): void {
      voiceStop();
    },
  },
};
