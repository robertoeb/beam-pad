import { ImageSourcePropType } from 'react-native';

export interface AppIconAsset {
  source: ImageSourcePropType;
  background: string;
  /** true = full-bleed app icon that fills the whole tile (Play Store icons) */
  cover?: boolean;
}

const cover = (source: ImageSourcePropType, background: string): AppIconAsset => ({
  source,
  background,
  cover: true,
});

export const BRAND_LOGOS: Record<string, AppIconAsset> = {
  // Full-bleed app icons sourced from Google Play, trimmed to their artwork.
  // The background is the app's brand color and only shows through any remaining transparency.
  netflix: cover(require('../../assets/app-logos/netflix.png'), '#E50914'),
  youtube: cover(require('../../assets/app-logos/youtube.png'), '#FF0000'),
  prime: cover(require('../../assets/app-logos/prime.png'), '#00A8E1'),
  disney: cover(require('../../assets/app-logos/disney.png'), '#113CCF'),
  max: cover(require('../../assets/app-logos/max.png'), '#002BE7'),
  hulu: cover(require('../../assets/app-logos/hulu.png'), '#1CE783'),
  spotify: cover(require('../../assets/app-logos/spotify.png'), '#1DB954'),
  twitch: cover(require('../../assets/app-logos/twitch.png'), '#9146FF'),
  peacock: cover(require('../../assets/app-logos/peacock.png'), '#15151F'),
  paramount: cover(require('../../assets/app-logos/paramount.png'), '#0064FF'),
  appletv: cover(require('../../assets/app-logos/appletv.png'), '#15151F'),
  plex: cover(require('../../assets/app-logos/plex.png'), '#E5A00D'),
  jellyfin: cover(require('../../assets/app-logos/jellyfin.png'), '#00A4DC'),
  pluto: cover(require('../../assets/app-logos/pluto.png'), '#FF7C00'),
  tubi: cover(require('../../assets/app-logos/tubi.png'), '#FA382F'),
  crunchy: cover(require('../../assets/app-logos/crunchy.png'), '#F47521'),
  stremio: cover(require('../../assets/app-logos/stremio.png'), '#7B5BF5'),
  kodi: cover(require('../../assets/app-logos/kodi.png'), '#17B2E7'),
  vlc: cover(require('../../assets/app-logos/vlc.png'), '#FF8800'),
};
