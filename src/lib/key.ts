import { remote } from './remote';

export function key(code: number): boolean {
  return remote.key(code);
}
