import CastContext, {
  CastState as GCastState,
  MediaPlayerState,
  type MediaStatus,
  type RemoteMediaClient,
} from 'react-native-google-cast';
import { useCastStore } from '@/stores/cast';

let _unsubCastState: { remove: () => void } | null = null;
let _unsubSessionStarted: { remove: () => void } | null = null;
let _unsubSessionEnded: { remove: () => void } | null = null;
let _unsubMediaStatus: { remove: () => void } | null = null;

export function initCastListeners() {
  _unsubCastState?.remove();
  _unsubSessionStarted?.remove();
  _unsubSessionEnded?.remove();

  _unsubCastState = CastContext.onCastStateChanged((state) => {
    useCastStore.getState().set({ connected: state === GCastState.CONNECTED });
  });

  _unsubSessionStarted = CastContext.getSessionManager().onSessionStarted((session) => {
    session.getCastDevice().then((d) => {
      useCastStore.getState().set({ deviceName: d?.friendlyName });
    });

    _unsubMediaStatus?.remove();
    _unsubMediaStatus = session.client.onMediaStatusUpdated((status: MediaStatus | null) => {
      if (!status) return;
      const playerState = status.playerState;
      let mapped: 'idle' | 'buffering' | 'playing' | 'paused' = 'idle';
      if (playerState === MediaPlayerState.PLAYING) mapped = 'playing';
      else if (playerState === MediaPlayerState.PAUSED) mapped = 'paused';
      else if (
        playerState === MediaPlayerState.BUFFERING ||
        playerState === MediaPlayerState.LOADING
      )
        mapped = 'buffering';
      const title =
        status.mediaInfo?.metadata && 'title' in status.mediaInfo.metadata
          ? (status.mediaInfo.metadata as { title?: string }).title
          : undefined;
      useCastStore.getState().set({ mediaStatus: mapped, mediaTitle: title });
    });
  });

  _unsubSessionEnded = CastContext.getSessionManager().onSessionEnded(() => {
    _unsubMediaStatus?.remove();
    _unsubMediaStatus = null;
    useCastStore.getState().set({
      connected: false,
      deviceName: undefined,
      mediaStatus: 'idle',
      mediaTitle: undefined,
    });
  });
}

export function showCastDialog() {
  CastContext.showCastDialog();
}

export async function castMedia(opts: {
  url: string;
  title: string;
  contentType?: string;
  imageUrl?: string;
}) {
  const session = await CastContext.getSessionManager().getCurrentCastSession();
  const client: RemoteMediaClient | null = session?.client ?? null;
  if (!client) {
    showCastDialog();
    return;
  }
  await client.loadMedia({
    mediaInfo: {
      contentUrl: opts.url,
      contentType: opts.contentType ?? 'video/mp4',
      metadata: {
        type: 'movie' as const,
        title: opts.title,
        images: opts.imageUrl ? [{ url: opts.imageUrl }] : [],
      },
    },
    autoplay: true,
  });
  useCastStore.getState().set({ mediaStatus: 'playing', mediaTitle: opts.title });
}

export async function castPlayPause() {
  const session = await CastContext.getSessionManager().getCurrentCastSession();
  const client = session?.client;
  if (!client) return;
  const status = await client.getMediaStatus();
  if (status?.playerState === MediaPlayerState.PLAYING) {
    await client.pause();
    useCastStore.getState().set({ mediaStatus: 'paused' });
  } else {
    await client.play();
    useCastStore.getState().set({ mediaStatus: 'playing' });
  }
}

export async function castStop() {
  await CastContext.getSessionManager().endCurrentSession(true);
}
