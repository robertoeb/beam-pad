<div align="center">

# 📡 BeamPad

**The minimalist smart remote for Android TV & Google TV.**
True-black OLED design. One-handed. Instant.

[![CI](https://github.com/beampad/beampad/actions/workflows/ci.yml/badge.svg)](https://github.com/beampad/beampad/actions/workflows/ci.yml)
![Platform](https://img.shields.io/badge/platform-Android-3DDC84?logo=android&logoColor=white)
![Stack](https://img.shields.io/badge/Expo%20%C2%B7%20RN%20%C2%B7%20TS-000000?logo=expo)
![License](https://img.shields.io/badge/license-MIT-52525B)

</div>

---

## ✨ What it does

BeamPad turns your Android phone into a fast, beautiful remote for every Android TV / Google TV in your home — over Wi-Fi, using the same **Android TV Remote Protocol v2** as Google's own remote.

| | |
|---|---|
| 🎛️ **Minimal remote UI** | True-black interface with a D-pad, pinned apps, and a volume rail — nothing you don't need in a dark room |
| 🏠 **Multi-device** | Auto-discovers TVs over mDNS, switches rooms in under 1.5 s — no re-pairing |
| ⏻ **Real power button** | Tap = sleep/wake. Hold = the TV's native power menu (in-protocol long press, no ADB hacks) |
| 🔊 **Hybrid volume** | Route volume to the TV's OS over Wi-Fi **or** blast IR straight to your TV/AVR hardware (NEC/RC5/RC6/SIRC, 20-brand profile DB) |
| 🚀 **App launcher** | Pin Netflix, YouTube, Prime… launch with one tap via deep links; drag to reorder |
| ⌨️ **Live keyboard** | TV focuses a search box → your phone's keyboard pops up automatically |
| 🎤 **Voice search** | Hold to talk — 16 kHz PCM streams straight to the TV's Assistant |

## 🧱 Tech stack

| Layer | Choice |
|---|---|
| Framework | React Native + **Expo** (Prebuild / CNG, latest SDK) — Android only |
| Styling | **NativeWind v4** (Tailwind), custom OLED token set |
| State | **Zustand** + **react-native-mmkv** persistence |
| Protocol | TypeScript + **protobufjs** (static bundle) — pairing, keys, IME, voice, telemetry |
| Native modules | 3 thin Kotlin **Expo Modules**: TLS socket/certs/mic · NSD discovery · IR blaster |
| Motion | Reanimated v4 · expo-haptics |
| Testing | Jest (jest-expo) · @testing-library/react-native · fake-socket harness · golden vectors |

## 🚀 Getting started

**Prerequisites:** Node ≥ 20 · JDK 17 · Android Studio (SDK 34+) · a physical Android device or emulator (API 26+) · an Android TV on the same Wi-Fi for full testing

```bash
npm install
npx expo prebuild          # generates android/ (gitignored, regenerated on demand)
npm run android            # builds & installs the dev client
```

> BeamPad uses native modules (MMKV, TLS sockets, IR) — it **cannot run in Expo Go**. Always use the dev client.

### Everyday commands

| Command | Purpose |
|---|---|
| `npm run android` | Build & launch on device |
| `npm test` | Unit + component tests |
| `npm test -- --coverage` | Tests with coverage gates (CI mode) |
| `npm run typecheck` | Strict TypeScript check |
| `npm run gen:proto` | Regenerate the protobuf bundle from `src/proto/*.proto` |
| `scripts/verify-task.sh` | Full local gate: typecheck → tests → coverage thresholds |

## 🗂️ Project structure

```
src/
├── app/            # expo-router screens (remote, pairing, devices, apps, settings)
├── components/     # RemoteButton, DPad, VolumeRail, AppGrid, sheets…
├── protocol/       # RemoteClient, PairingProtocol, framing — pure TS, 90%+ tested
├── services/       # sessionManager, discovery, power, volumeRouter, voice, ime
├── stores/         # Zustand stores (MMKV-persisted)
├── ir/             # NEC/NECx/RC5/RC6/SIRC encoders + brand profile DB
└── __mocks__/      # hermetic Jest mocks for all native modules
modules/            # expo-atv-socket · expo-atv-discovery · expo-ir-blaster (Kotlin)
```

## ✅ Testing philosophy

- **Coverage gates in CI** — protocol ≥ 90 % lines/branches, services & stores ≥ 80 %
- **Golden vectors** — wire formats (pairing, key injects, IR frames) frozen byte-exact in tests
- **Hermetic** — every native module mocked; the socket mock doubles as an integration harness that replays real protobuf frames
- **Fake timers** — reconnect backoff, hold-repeat, and the 800 ms long-press are all time-travel tested

## 🔌 How the remote protocol works (short version)

1. **Discover** — mDNS `_androidtvremote2._tcp` finds TVs on the LAN
2. **Pair (6467/TLS)** — 4-step protobuf handshake; the TV shows a 6-char code; a SHA-256 secret binds both certificates
3. **Command (6466/TLS)** — length-prefixed protobuf frames: key injects (short / long-press), app deep-link launches, IME text sync, voice PCM streaming, and server-pushed telemetry (power, volume, current app)

## 🗺️ Roadmap

- [x] Architecture, design system & engineering plan
- [ ] Core remote (discovery → pairing → command channel → UI)
- [ ] Power hold + hybrid IR/IP volume
- [ ] App launcher grid
- [ ] IME keyboard + voice search
- [ ] Google Cast (stretch)

> 📐 **Note for contributors:** the full architecture doc, design guide, and per-task engineering tickets are intentionally **kept out of this repository** (local planning docs). This README is the canonical public overview.

## 📄 License

MIT — see [LICENSE](LICENSE).

<div align="center">
Built for dark rooms and lost remotes. 🛋️
</div>
