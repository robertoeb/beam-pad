/**
 * @deprecated Import from '@/services/session' instead.
 *
 * Thin re-export kept so existing importers keep working. All session
 * logic lives in `./session`; this module must stay logic-free.
 */
export {
  session,
  getClient,
  getActiveClient,
  connect,
  disconnect,
  switchTo,
  reset,
  CONNECT_BUDGET_MS,
} from './session';
export type { SwitchResult } from './session';
