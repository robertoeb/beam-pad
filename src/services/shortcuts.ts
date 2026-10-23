import { getActiveClient } from './session';
import { getApp } from '@/protocol/deeplinks';
import { showToast } from '@/components/Toast';
import { shortcutRegistry } from '@/shortcuts/registry';
import type { MacroStep, ShortcutId } from '@/shortcuts/types';

const WAIT_MIN = 50;
const WAIT_MAX = 3000;

function clampWait(ms: number): number {
  if (ms < WAIT_MIN) return WAIT_MIN;
  if (ms > WAIT_MAX) return WAIT_MAX;
  return ms;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executeStep(step: MacroStep): Promise<boolean> {
  const client = getActiveClient();
  if (!client) return false;

  switch (step.type) {
    case 'key':
      client.keyPress(step.keyCode);
      return true;
    case 'app': {
      const app = getApp(step.appId);
      if (!app) return false;
      client.launchApp(app.deepLink);
      return true;
    }
    case 'wait':
      await delay(clampWait(step.ms));
      return true;
  }
}

export async function executeMacro(steps: MacroStep[]): Promise<boolean> {
  for (const step of steps) {
    const client = getActiveClient();
    if (!client) {
      showToast('Macro aborted - TV disconnected');
      return false;
    }
    const ok = await executeStep(step);
    if (!ok) {
      showToast('Macro step failed');
      return false;
    }
  }
  return true;
}

export function fireShortcut(id: ShortcutId): boolean {
  const shortcut = shortcutRegistry.resolve(id);
  if (!shortcut) return false;

  const client = getActiveClient();
  if (!client) {
    showToast('No TV connected - pick a device');
    return false;
  }

  switch (shortcut.action.kind) {
    case 'app': {
      const app = getApp(shortcut.action.appId);
      if (!app) return false;
      client.launchApp(app.deepLink);
      return true;
    }
    case 'key':
      client.keyPress(shortcut.action.keyCode);
      return true;
    case 'macro':
      executeMacro(shortcut.action.steps);
      return true;
    case 'ir':
      return false;
  }
}

export { clampWait };
