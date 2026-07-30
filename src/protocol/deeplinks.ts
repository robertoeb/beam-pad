export interface TvApp {
  id: string;
  name: string;
  deepLink: string;
  packageName: string;
  color: string;
  initials: string;
  verifiedAt?: string;
}

export const TV_APPS: TvApp[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    deepLink: 'https://www.netflix.com/title.*',
    packageName: 'com.netflix.ninja',
    color: '#E50914',
    initials: 'Nf',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    deepLink: 'https://www.youtube.com',
    packageName: 'com.google.android.youtube.tv',
    color: '#FF0000',
    initials: 'YT',
  },
  {
    id: 'prime',
    name: 'Prime Video',
    deepLink: 'https://app.primevideo.com',
    packageName: 'com.amazon.amazonvideo.livingroom',
    color: '#00A8E1',
    initials: 'Pv',
  },
  {
    id: 'disney',
    name: 'Disney+',
    deepLink: 'https://www.disneyplus.com',
    packageName: 'com.disney.disneyplus',
    color: '#113CCF',
    initials: 'D+',
  },
  {
    id: 'max',
    name: 'Max',
    deepLink: 'https://play.max.com',
    packageName: 'com.wbd.stream',
    color: '#002BE7',
    initials: 'Mx',
  },
  {
    id: 'hulu',
    name: 'Hulu',
    deepLink: 'https://www.hulu.com',
    packageName: 'com.hulu.livingroomplus',
    color: '#1CE783',
    initials: 'Hu',
  },
  {
    id: 'peacock',
    name: 'Peacock',
    deepLink: 'https://www.peacocktv.com',
    packageName: 'com.peacocktv.peacockandroid',
    color: '#000000',
    initials: 'Pc',
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    deepLink: 'https://www.paramountplus.com',
    packageName: 'com.cbs.app',
    color: '#0064FF',
    initials: 'P+',
  },
  {
    id: 'appletv',
    name: 'Apple TV',
    deepLink: 'https://tv.apple.com',
    packageName: 'com.apple.atve.androidtv.appletv',
    color: '#A1A1AA',
    initials: '\uF8FFtv',
  },
  {
    id: 'twitch',
    name: 'Twitch',
    deepLink: 'https://www.twitch.tv',
    packageName: 'tv.twitch.android.app',
    color: '#9146FF',
    initials: 'Tw',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    deepLink: 'spotify:',
    packageName: 'com.spotify.tv.android',
    color: '#1DB954',
    initials: 'Sp',
  },
  {
    id: 'plex',
    name: 'Plex',
    deepLink: 'https://app.plex.tv',
    packageName: 'com.plexapp.android',
    color: '#E5A00D',
    initials: 'Px',
  },
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    deepLink: 'jellyfin://',
    packageName: 'org.jellyfin.androidtv',
    color: '#00A4DC',
    initials: 'Jf',
  },
  {
    id: 'pluto',
    name: 'Pluto TV',
    deepLink: 'https://pluto.tv',
    packageName: 'tv.pluto.android',
    color: '#FF7C00',
    initials: 'Pl',
  },
  {
    id: 'tubi',
    name: 'Tubi',
    deepLink: 'https://tubitv.com',
    packageName: 'com.tubitv',
    color: '#FA382F',
    initials: 'Tu',
  },
  {
    id: 'crunchy',
    name: 'Crunchyroll',
    deepLink: 'https://www.crunchyroll.com',
    packageName: 'com.crunchyroll.crunchyroid',
    color: '#F47521',
    initials: 'Cr',
  },
  {
    id: 'stremio',
    name: 'Stremio',
    deepLink: 'stremio://',
    packageName: 'com.stremio.one',
    color: '#7B5BF5',
    initials: 'St',
  },
  {
    id: 'kodi',
    name: 'Kodi',
    deepLink: 'kodi://',
    packageName: 'org.xbmc.kodi',
    color: '#17B2E7',
    initials: 'Kd',
  },
  {
    id: 'vlc',
    name: 'VLC',
    deepLink: 'vlc://',
    packageName: 'org.videolan.vlc',
    color: '#FF8800',
    initials: 'VLC',
  },
  {
    id: 'settings',
    name: 'TV Settings',
    deepLink: 'android.settings.SETTINGS',
    packageName: 'com.android.tv.settings',
    color: '#52525B',
    initials: '\u2699',
  },
];

export const getApp = (id: string) => TV_APPS.find((a) => a.id === id);
export const byPackage = (pkg: string) => TV_APPS.find((a) => a.packageName === pkg);
