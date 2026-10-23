import { remote } from '@/lib/remote';

export function launchApp(id: string): boolean {
  return remote.launch(id);
}
