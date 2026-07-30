export type PreflightResult =
  | { ok: true }
  | { ok: false; code: 'WIFI_OFF' | 'HOST_UNREACHABLE'; detail?: string };

export async function preflight(host: string, _timeoutMs = 300): Promise<PreflightResult> {
  try {
    await Promise.race([
      fetch(`http://${host}:6466/`, { method: 'HEAD', mode: 'no-cors' })
        .then(() => true)
        .catch(() => true),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(true), _timeoutMs)),
    ]);
    return { ok: true };
  } catch {
    return { ok: false, code: 'HOST_UNREACHABLE', detail: `preflight failed for ${host}` };
  }
}
