import CastContext, {
  CastState as GCastState,
  MediaPlayerState,
  type MediaStatus,
  type RemoteMediaClient,
} from 'react-native-google-cast';
import { useCastStore } from '@/stores/cast';

const castSubs: {
  castState: { remove: () => void } | null;
  sessionStarted: { remove: () => void } | null;
  sessionEnded: { remove: () => void } | null;
  mediaStatus: { remove: () => void } | null;
} = { castState: null, sessionStarted: null, sessionEnded: null, mediaStatus: null };

export function initCastListeners() {
  castSubs.castState?.remove();
  castSubs.sessionStarted?.remove();
  castSubs.sessionEnded?.remove();

  castSubs.castState = CastContext.onCastStateChanged((state) => {
    useCastStore.getState().set({ connected: state === GCastState.CONNECTED });
  });

  castSubs.sessionStarted = CastContext.getSessionManager().onSessionStarted((session) => {
    session.getCastDevice().then((d) => {
      useCastStore.getState().set({ deviceName: d?.friendlyName });
    });

    castSubs.mediaStatus?.remove();
    castSubs.mediaStatus = session.client.onMediaStatusUpdated((status: MediaStatus | null) => {
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

  castSubs.sessionEnded = CastContext.getSessionManager().onSessionEnded(() => {
    castSubs.mediaStatus?.remove();
    castSubs.mediaStatus = null;
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
