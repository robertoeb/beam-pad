import { getActiveClient } from './sessionManager';
import { getApp } from '@/protocol/deeplinks';
import { showToast } from '@/components/Toast';

export function launchApp(id: string): boolean {
  const app = getApp(id);
  const client = getActiveClient();
  if (!app) return false;
  if (!client) {
    showToast('No TV connected - pick a device');
    return false;
  }
  client.launchApp(app.deepLink);
  return true;
}
