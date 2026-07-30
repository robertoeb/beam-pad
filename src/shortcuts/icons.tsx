import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { LucideIcon } from 'lucide-react-native';
import {
  ListVideo,
  MonitorSmartphone,
  Info,
  Menu,
  Hash,
  Play,
  StopCircle,
  SkipForward,
  SkipBack,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Power,
  House,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Search,
  Settings,
  CircleDot,
  Square,
  Palette,
  Radio,
  Tv,
  Music,
  Film,
  Gamepad2,
  Globe,
  MoreHorizontal,
  HelpCircle,
} from 'lucide-react-native';

type BrandIconProps = { size: number; color: string };

const NetflixIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 2h2v20H5V2zm12 0h2v20h-2V2zM5 2l14 20h-2L5 2z" fill={color} />
  </Svg>
);

const YouTubeIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77A26.15 26.15 0 0 0 2 12a26.15 26.15 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77A26.15 26.15 0 0 0 22 12a26.15 26.15 0 0 0-.42-4.81z"
      fill={color}
    />
    <Path d="M10 15l5-3-5-3v6z" fill="#000" />
  </Svg>
);

const PrimeIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12h4l2-6 4 12 2-6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DisneyIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={color} />
    <Path d="M8 10c0-2 1.5-3 4-3s4 1 4 3-1.5 3-4 3-4-1-4-3z" fill="#fff" />
  </Svg>
);

const MaxIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6h3v12H3V6zm5 0h2l3 8 3-8h2v12h-3V10l-3 8-3-8v10H8V6z" fill={color} />
  </Svg>
);

const HuluIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6h3v12H3V6zm5 0h3v12H8V6zm5 0h3v12h-3V6zm5 0h3v12h-3V6z" fill={color} />
  </Svg>
);

const PeacockIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" fill={color} />
    <Circle cx="12" cy="12" r="4" fill="#fff" />
  </Svg>
);

const ParamountIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L2 20h20L12 2z" fill={color} />
    <Path d="M12 8l-4 8h8l-4-8z" fill="#fff" />
  </Svg>
);

const AppleTvIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M16.5 9.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" fill={color} />
    <Path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const TwitchIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 3h16v12l-4 4h-3l-3 3v-3H4V3z" fill={color} />
    <Path d="M10 8h2v5h-2V8zm4 0h2v5h-2V8z" fill="#fff" />
  </Svg>
);

const SpotifyIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path d="M7 10c3-1 7-1 10 1M7 13c2.5-.8 5.5-.8 8 .5M7 16c2-.5 4.5-.5 6.5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const PlexIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 4h3l5 8-5 8H6l5-8-5-8z" fill={color} />
    <Path d="M12 4h3l5 8-5 8h-3l5-8-5-8z" fill={color} opacity="0.6" />
  </Svg>
);

const JellyfinIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Circle cx="12" cy="12" r="3" fill={color} />
  </Svg>
);

const PlutoIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" fill={color} />
    <Path d="M9 9h6v6H9z" fill="#fff" />
  </Svg>
);

const TubiIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 6h4v8H4V6zm6 0h4v8h-4V6zm6 0h4v8h-4V6zM4 16h16v2H4v-2z" fill={color} />
  </Svg>
);

const CrunchyIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={color} />
    <Path d="M12 6l-6 10h12L12 6z" fill="#fff" />
  </Svg>
);

const StremioIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10 8l6 4-6 4V8z" fill={color} />
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const KodiIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} />
    <Path d="M8 8l8 4-8 4V8z" fill="#fff" />
  </Svg>
);

const VlcIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 4l6 16 6-16H6z" fill={color} />
    <Circle cx="12" cy="20" r="2" fill={color} />
  </Svg>
);

const SettingsAppIcon = ({ size, color }: BrandIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" fill={color} />
    <Path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export type BrandIconComponent = React.FC<BrandIconProps>;

export const BRAND_ICONS: Record<string, BrandIconComponent> = {
  netflix: NetflixIcon,
  youtube: YouTubeIcon,
  prime: PrimeIcon,
  disney: DisneyIcon,
  max: MaxIcon,
  hulu: HuluIcon,
  peacock: PeacockIcon,
  paramount: ParamountIcon,
  appletv: AppleTvIcon,
  twitch: TwitchIcon,
  spotify: SpotifyIcon,
  plex: PlexIcon,
  jellyfin: JellyfinIcon,
  pluto: PlutoIcon,
  tubi: TubiIcon,
  crunchy: CrunchyIcon,
  stremio: StremioIcon,
  kodi: KodiIcon,
  vlc: VlcIcon,
  settings: SettingsAppIcon,
};

export const KEY_ICONS: Record<string, LucideIcon> = {
  guide: ListVideo,
  tvInput: MonitorSmartphone,
  info: Info,
  menu: Menu,
  chUp: Hash,
  chDown: Hash,
  playPause: Play,
  stop: StopCircle,
  next: SkipForward,
  prev: SkipBack,
  rewind: Rewind,
  fastForward: FastForward,
  volUp: Volume2,
  volDown: Volume2,
  mute: VolumeX,
  power: Power,
  home: House,
  back: ArrowLeft,
  up: ChevronUp,
  down: ChevronDown,
  left: ArrowLeft,
  right: ArrowLeft,
  ok: CircleDot,
  search: Search,
  settings: Settings,
  red: Palette,
  green: Palette,
  yellow: Palette,
  blue: Palette,
};

export function iconFor(
  brandKey: string,
  size: number,
  color: string,
): React.ReactElement | null {
  const Brand = BRAND_ICONS[brandKey];
  if (Brand) return <Brand size={size} color={color} />;
  return null;
}

export function initialsFallback(label: string): string {
  return label
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export {
  ListVideo,
  MonitorSmartphone,
  Info,
  Menu,
  Hash,
  Play,
  StopCircle,
  SkipForward,
  SkipBack,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Power,
  House,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Search,
  Settings,
  CircleDot,
  Square,
  Palette,
  Radio,
  Tv,
  Music,
  Film,
  Gamepad2,
  Globe,
  MoreHorizontal,
  HelpCircle,
};
