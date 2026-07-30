import { remote } from '@/proto/bundle';

export const Key = remote.RemoteKeyCode;
export const Direction = remote.RemoteDirection;

export const KEYS = {
  power: Key.KEYCODE_POWER,
  home: Key.KEYCODE_HOME,
  back: Key.KEYCODE_BACK,
  menu: Key.KEYCODE_MENU,
  search: Key.KEYCODE_SEARCH,
  settings: Key.KEYCODE_SETTINGS,
  up: Key.KEYCODE_DPAD_UP,
  down: Key.KEYCODE_DPAD_DOWN,
  left: Key.KEYCODE_DPAD_LEFT,
  right: Key.KEYCODE_DPAD_RIGHT,
  ok: Key.KEYCODE_DPAD_CENTER,
  volUp: Key.KEYCODE_VOLUME_UP,
  volDown: Key.KEYCODE_VOLUME_DOWN,
  mute: Key.KEYCODE_VOLUME_MUTE,
  playPause: Key.KEYCODE_MEDIA_PLAY_PAUSE,
  stop: Key.KEYCODE_MEDIA_STOP,
  next: Key.KEYCODE_MEDIA_NEXT,
  prev: Key.KEYCODE_MEDIA_PREVIOUS,
  rewind: Key.KEYCODE_MEDIA_REWIND,
  fastForward: Key.KEYCODE_MEDIA_FAST_FORWARD,
  info: Key.KEYCODE_INFO,
  guide: Key.KEYCODE_GUIDE,
  tvInput: Key.KEYCODE_TV_INPUT,
  chUp: Key.KEYCODE_CHANNEL_UP,
  chDown: Key.KEYCODE_CHANNEL_DOWN,
  red: Key.KEYCODE_PROG_RED,
  green: Key.KEYCODE_PROG_GREEN,
  yellow: Key.KEYCODE_PROG_YELLOW,
  blue: Key.KEYCODE_PROG_BLUE,
  digits: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16] as const,
} as const;
