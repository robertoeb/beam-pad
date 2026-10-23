<div align="center">

# 📡 BeamPad

**The minimalist smart remote for Android TV & Google TV.**
True-black OLED design. One-handed. Instant.

[![CI](https://github.com/robertoeb/beam-pad/actions/workflows/ci.yml/badge.svg)](https://github.com/robertoeb/beam-pad/actions/workflows/ci.yml)
![Platform](https://img.shields.io/badge/platform-Android-3DDC84?logo=android&logoColor=white)
![Stack](https://img.shields.io/badge/Expo%20%C2%B7%20RN%20%C2%B7%20TS-000000?logo=expo)
![License](https://img.shields.io/badge/license-MIT-52525B)

</div>

---

## ✨ What it does

BeamPad turns your Android phone into a fast, beautiful remote for every Android TV / Google TV in your home — over Wi-Fi, using the same **Android TV Remote Protocol v2** as Google's own remote. No cloud account, no data leaves your LAN.

|                          |                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 🎛️ **Minimal remote UI** | True-black interface with a D-pad or touchpad, pinned shortcuts, and a volume rail — nothing you don't need in a dark room      |
| 🏠 **Multi-device**      | Auto-discovers TVs over mDNS and switches rooms in under 1.5 s — no re-pairing                                                  |
| ⏻ **Real power button**  | Tap = sleep/wake. Hold = the TV's native power menu (in-protocol long press, no ADB hacks)                                      |
| 🔊 **Hybrid volume**     | Volume goes to the TV's OS over Wi-Fi **or** blasts IR straight to your TV/AVR hardware (NEC/RC5/RC6/SIRC, 20-brand profile DB) |
| 🚀 **App launcher**      | Pin Netflix, YouTube, Prime… launch with one tap via deep links; drag to reorder; custom macros and key shortcuts               |
| ⌨️ **Live keyboard**     | The TV focuses a search box → your phone's keyboard pops up automatically                                                       |
| 🎤 **Voice search**      | Hold to talk — 16 kHz PCM streams straight to the TV's Assistant                                                                |
| 📺 **Google Cast**       | Browse, cast, and control playback without leaving the remote                                                                   |

> 🖼️ **Screenshots:** coming soon — dark-room shots of the remote, pairing flow, app grid, and IR studio.

## 🧱 Tech stack

| Layer          | Choice                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- |
| Framework      | React Native + **Expo** (Prebuild / CNG, latest SDK) — Android only                     |
| Styling        | **NativeWind v4** (Tailwind), custom OLED token set                                     |
| State          | **Zustand** + **react-native-mmkv** persistence                                         |
| Protocol       | TypeScript + **protobufjs** (static bundle) — pairing, keys, IME, voice, telemetry      |
| Native modules | 3 thin Kotlin **Expo Modules**: TLS socket/certs/mic · NSD discovery · IR blaster       |
| Motion         | Reanimated v4 · expo-haptics                                                            |
| Testing        | Jest (jest-expo) · @testing-library/react-native · fake-socket harness · golden vectors |

## 🚀 Getting started

**Prerequisites:** Node ≥ 22 · JDK 17 · Android Studio (SDK 34+) · a physical Android device or emulator (API 26+) · an Android TV on the same Wi-Fi for full testing.

```bash
npm install
npx expo prebuild          # generates android/ (gitignored, regenerated on demand)
npm run android            # builds & installs the dev client
```

> BeamPad uses native modules (MMKV, TLS sockets, IR) — it **cannot run in Expo Go**. Always use the dev client.
>
> After any dependency upgrade (`expo install`, SDK bumps), rebuild the dev
> client from clean — otherwise the new JS bundle talks to the old native
> binary and crashes in `Worklets`/`reanimated` init:
>
> ```bash
> npx expo prebuild --platform android --clean
> npm run android
> ```

### Everyday commands

| Command             | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `npm run android`   | Build & launch on device                            |
| `npm test`          | Unit + component tests (481 tests, ~6 s)            |
| `npm run test:cov`  | Tests with enforced coverage thresholds             |
| `npm run lint`      | ESLint, zero warnings allowed                       |
| `npm run typecheck` | Strict TypeScript check                             |
| `npm run gen:proto` | Regenerate the protobuf bundle from `src/proto/*.proto` |

## 📲 Pairing your TV

1. Open BeamPad on your phone — nearby TVs appear automatically (mDNS `_androidtvremote2._tcp`).
2. Tap **Pair** next to your TV (or enter its IP manually).
3. Your TV shows a 6-character code — type it into the phone.
4. Done. The phone's certificate is stored per device; switching TVs later needs no re-pairing.

**Tips:** both devices must be on the same Wi-Fi (guest isolation / AP isolation blocks discovery). If pairing is rejected, remove old pairings in the TV's *Settings → Remotes & Accessories* and retry.

## 🗂️ Project structure

```
src/
├── app/            # expo-router screens (remote, pairing, devices, apps, settings)
├── components/     # RemoteButton, DPad, VolumeControl, AppGrid, sheets…
├── protocol/       # RemoteClient, PairingProtocol, framing — pure TS, heavily tested
├── services/       # session facade, discovery, power, volumeRouter, voice, ime, apps
├── stores/         # Zustand stores (MMKV-persisted) + runtime capabilities
├── ir/             # NEC/NECx/RC5/RC6/SIRC encoders + brand profile DB
├── shortcuts/      # shortcut registry, macros, brand icons
└── test/           # factories + fake-socket harness shared by suites
modules/            # expo-atv-socket · expo-atv-discovery · expo-ir-blaster (Kotlin)
```

## ✅ Testing philosophy

- **Coverage gates in CI** — enforced per-directory thresholds (protocol ~92 %, services ~90 %, stores ~95 %); the build fails if coverage drops
- **Golden vectors** — wire formats (pairing, key injects, IR frames) frozen byte-exact in tests
- **Hermetic** — every native module mocked; the socket harness replays real protobuf frames, including 1.5-frame splits and error injection
- **Fake timers** — reconnect backoff (500 ms → 8 s cap), hold-repeat, and the 800 ms long-press are all time-travel tested

## 🔌 How the remote protocol works (short version)

1. **Discover** — mDNS `_androidtvremote2._tcp` finds TVs on the LAN
2. **Pair (6467/TLS)** — protobuf handshake; the TV shows a 6-char code; a SHA-256 secret binds both certificates
3. **Command (6466/TLS)** — length-prefixed protobuf frames: key injects (short / long-press), app deep-link launches, IME text sync, voice PCM streaming, and server-pushed telemetry (power, volume, current app)

## 🔒 Privacy & permissions

- Everything stays on your LAN. There is no account, no analytics, no cloud.
- Android permissions requested: `INTERNET`, network/Wi-Fi state (discovery), `RECORD_AUDIO` (only while holding voice search), `VIBRATE` (haptics), `TRANSMIT_IR` (IR blaster models only).

## 🤝 Contributing

Issues and PRs welcome. Please run the full gate before pushing:

```bash
npm run lint && npm run typecheck && npm run test:ci
```

## 📦 Releases

Releases are tag-driven. Push `vMAJOR.MINOR.PATCH` (e.g. `v1.2.0`):

1. `APP_VERSION` / `VERSION_CODE` derive from the tag (`M*10000+m*100+p`).
2. `.github/workflows/release.yml` prebuilds fresh, assembles a signed AAB (needs `ANDROID_KEYSTORE_B64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD` repo secrets; unsigned artifact otherwise), and attaches it to a GitHub Release.
3. `preview` builds (sideload APK) run via manual workflow dispatch.
4. No OTA updates by design (native socket/discovery/IR modules can't ship over the air) — every release is a full binary.

## 🧪 Release QA gate (1.0 and beyond)

Order matters — cheap deterministic gates first, hardware last. Anything red blocks the tag:

1. `npm run typecheck`, `npm run lint` (`--max-warnings 0`).
2. `npm run test:ci` — no threshold may be lowered to green a release.
3. Manual hardware matrix on 2 TVs × IR-emitter/no-emitter phones: discovery/lost, pairing accept/reject/cancel, volume network+IR, IME round-trip, 30 s voice stream, Cast play/disconnect, rapid A→B→A device switch, upgrade over real persisted data.
4. Maestro flows in `maestro/` (pair → keys, volume, IME) run on demand against the lab TV — needs a physical device, not wired into CI.

## 📄 License

MIT — see [LICENSE](LICENSE).

<div align="center">
Built for dark rooms and lost remotes. 🛋️
</div>
