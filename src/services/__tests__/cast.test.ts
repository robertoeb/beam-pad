import { initCastListeners, castMedia, castPlayPause, castStop } from '../cast';
import CastContext, { CastState, MediaPlayerState } from 'react-native-google-cast';

function getMockInternals() {
  const mod = require('react-native-google-cast');
  return {
    mockSession: mod._mockSession,
    mockClient: mod._mockRemoteMediaClient,
    mockSessionManager: mod._mockSessionManager,
    castStateListeners: mod._castStateListeners,
    sessionStartedListeners: mod._sessionStartedListeners,
    sessionEndedListeners: mod._sessionEndedListeners,
    mediaStatusListeners: mod._mediaStatusListeners,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  const m = getMockInternals();
  m.castStateListeners.length = 0;
  m.sessionStartedListeners.length = 0;
  m.sessionEndedListeners.length = 0;
  m.mediaStatusListeners.length = 0;
  m.mockSessionManager.getCurrentCastSession.mockResolvedValue(null);
  m.mockSession.getCastDevice.mockResolvedValue({ friendlyName: 'Test TV', deviceId: 'dev-1' });
});

describe('cast service', () => {
  describe('initCastListeners', () => {
    it('registers cast state, session started, and session ended listeners', () => {
      initCastListeners();
      expect(CastContext.onCastStateChanged).toHaveBeenCalled();
      const m = getMockInternals();
      expect(m.mockSessionManager.onSessionStarted).toHaveBeenCalled();
      expect(m.mockSessionManager.onSessionEnded).toHaveBeenCalled();
    });

    it('sets connected=true when cast state changes to CONNECTED', () => {
      const { useCastStore } = require('@/stores/cast');
      initCastListeners();
      const m = getMockInternals();
      m.castStateListeners.forEach((l: (s: string) => void) => l(CastState.CONNECTED));
      expect(useCastStore.getState().connected).toBe(true);
    });

    it('sets deviceName when session starts', async () => {
      const { useCastStore } = require('@/stores/cast');
      initCastListeners();
      const m = getMockInternals();
      m.sessionStartedListeners.forEach((l: (s: any) => void) => l(m.mockSession));
      await Promise.resolve();
      await Promise.resolve();
      expect(useCastStore.getState().deviceName).toBe('Test TV');
    });

    it('resets state when session ends', () => {
      const { useCastStore } = require('@/stores/cast');
      useCastStore.getState().set({ connected: true, deviceName: 'TV', mediaStatus: 'playing' });
      initCastListeners();
      const m = getMockInternals();
      m.sessionEndedListeners.forEach((l: (s: any) => void) => l(m.mockSession));
      const state = useCastStore.getState();
      expect(state.connected).toBe(false);
      expect(state.deviceName).toBeUndefined();
      expect(state.mediaStatus).toBe('idle');
    });

    it('updates mediaStatus from media status listener', () => {
      const { useCastStore } = require('@/stores/cast');
      initCastListeners();
      const m = getMockInternals();
      m.sessionStartedListeners.forEach((l: (s: any) => void) => l(m.mockSession));
      expect(m.mockClient.onMediaStatusUpdated).toHaveBeenCalled();
      m.mediaStatusListeners.forEach((l: (s: any) => void) =>
        l({
          playerState: MediaPlayerState.PLAYING,
          mediaInfo: { metadata: { type: 'movie', title: 'Test Movie' } },
        }),
      );
      expect(useCastStore.getState().mediaStatus).toBe('playing');
      expect(useCastStore.getState().mediaTitle).toBe('Test Movie');
    });
  });

  describe('castMedia', () => {
    it('opens cast dialog when no session', async () => {
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(null);
      await castMedia({ url: 'https://example.com/video.mp4', title: 'Test' });
      expect(CastContext.showCastDialog).toHaveBeenCalled();
      expect(m.mockClient.loadMedia).not.toHaveBeenCalled();
    });

    it('calls loadMedia with correct payload when session exists', async () => {
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(m.mockSession);
      await castMedia({
        url: 'https://example.com/video.mp4',
        title: 'Big Buck Bunny',
        contentType: 'video/mp4',
        imageUrl: 'https://example.com/poster.jpg',
      });
      expect(m.mockClient.loadMedia).toHaveBeenCalledWith({
        mediaInfo: {
          contentUrl: 'https://example.com/video.mp4',
          contentType: 'video/mp4',
          metadata: {
            type: 'movie',
            title: 'Big Buck Bunny',
            images: [{ url: 'https://example.com/poster.jpg' }],
          },
        },
        autoplay: true,
      });
    });

    it('defaults contentType to video/mp4', async () => {
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(m.mockSession);
      await castMedia({ url: 'https://example.com/video.mp4', title: 'Test' });
      expect(m.mockClient.loadMedia).toHaveBeenCalledWith(
        expect.objectContaining({
          mediaInfo: expect.objectContaining({ contentType: 'video/mp4' }),
        }),
      );
    });

    it('sets mediaStatus to playing after loadMedia', async () => {
      const { useCastStore } = require('@/stores/cast');
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(m.mockSession);
      await castMedia({ url: 'https://example.com/v.mp4', title: 'My Video' });
      expect(useCastStore.getState().mediaStatus).toBe('playing');
      expect(useCastStore.getState().mediaTitle).toBe('My Video');
    });
  });

  describe('castPlayPause', () => {
    it('pauses when playerState is playing', async () => {
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(m.mockSession);
      m.mockClient.getMediaStatus.mockResolvedValue({
        playerState: MediaPlayerState.PLAYING,
      });
      await castPlayPause();
      expect(m.mockClient.pause).toHaveBeenCalled();
      expect(m.mockClient.play).not.toHaveBeenCalled();
    });

    it('plays when playerState is paused', async () => {
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(m.mockSession);
      m.mockClient.getMediaStatus.mockResolvedValue({
        playerState: MediaPlayerState.PAUSED,
      });
      await castPlayPause();
      expect(m.mockClient.play).toHaveBeenCalled();
      expect(m.mockClient.pause).not.toHaveBeenCalled();
    });

    it('plays when no media status', async () => {
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(m.mockSession);
      m.mockClient.getMediaStatus.mockResolvedValue(null);
      await castPlayPause();
      expect(m.mockClient.play).toHaveBeenCalled();
    });

    it('does nothing when no session', async () => {
      const m = getMockInternals();
      m.mockSessionManager.getCurrentCastSession.mockResolvedValue(null);
      await castPlayPause();
      expect(m.mockClient.play).not.toHaveBeenCalled();
      expect(m.mockClient.pause).not.toHaveBeenCalled();
    });
  });

  describe('castStop', () => {
    it('ends the current session with stopCasting=true', async () => {
      const m = getMockInternals();
      await castStop();
      expect(m.mockSessionManager.endCurrentSession).toHaveBeenCalledWith(true);
    });
  });
});
