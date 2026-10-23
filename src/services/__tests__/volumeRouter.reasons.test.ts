import { irSend, volumeCommand } from '../volumeRouter';
import { getActiveClient } from '../session';
import { useSettingsStore } from '@/stores/settings';
import { useCapabilitiesStore } from '@/stores/capabilities';
import { IrBlaster } from '@/modules/expo-ir-blaster';
import { KEYS } from '@/protocol/keycodes';

jest.mock('../session', () => ({
  getClient: jest.fn(),
  getActiveClient: jest.fn(),
}));

jest.mock('@/modules/expo-ir-blaster', () => ({
  IrBlaster: {
    hasIrEmitter: jest.fn(),
    getCarrierFrequencyRanges: jest.fn(),
    transmit: jest.fn(),
  },
}));

const mockKeyPress = jest.fn();

beforeEach(() => {
  (getActiveClient as jest.Mock).mockReturnValue({ keyPress: mockKeyPress });
  mockKeyPress.mockClear();
  (IrBlaster.transmit as jest.Mock).mockReset().mockResolvedValue(undefined);
  (IrBlaster.hasIrEmitter as jest.Mock).mockReset().mockResolvedValue(true);
  (IrBlaster.getCarrierFrequencyRanges as jest.Mock)
    .mockReset()
    .mockResolvedValue([{ min: 30000, max: 60000 }]);
  useSettingsStore.setState({ volumeTarget: 'tv-os', irProfileId: null, irAvailable: false });
  useCapabilitiesStore.setState({ irAvailable: false });
});

describe('irSend failure reasons', () => {
  it("reason 'no-profile' when no profile selected", async () => {
    useSettingsStore.setState({ irProfileId: null });
    await expect(irSend('power')).resolves.toEqual({ ok: false, reason: 'no-profile' });
  });

  it("reason 'no-command' when command missing from profile", async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    const r = await irSend('coatCheck' as never);
    expect(r).toEqual({ ok: false, reason: 'no-command', detail: 'coatCheck' });
  });

  it("reason 'no-emitter' when phone lacks IR hardware", async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    (IrBlaster.hasIrEmitter as jest.Mock).mockResolvedValue(false);
    await expect(irSend('power')).resolves.toEqual({ ok: false, reason: 'no-emitter' });
  });

  it("reason 'freq-unsupported' when carrier out of range", async () => {
    useSettingsStore.setState({ irProfileId: 'sony-tv-sirc12' });
    (IrBlaster.getCarrierFrequencyRanges as jest.Mock).mockResolvedValue([
      { min: 30000, max: 38000 },
    ]);
    const r = await irSend('power');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe('freq-unsupported');
  });

  it("reason 'transmit-failed' with native detail", async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    (IrBlaster.transmit as jest.Mock).mockRejectedValue(new Error('HW fault'));
    const r = await irSend('power');
    expect(r).toEqual({ ok: false, reason: 'transmit-failed', detail: 'HW fault' });
  });

  it('ok:true transmits on the happy path', async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    await expect(irSend('power')).resolves.toEqual({ ok: true });
  });
});

describe('volumeCommand IP fallback', () => {
  it('falls back to IP when IR fails even with capabilities flag set', async () => {
    useSettingsStore.setState({ volumeTarget: 'ir', irProfileId: null });
    useCapabilitiesStore.setState({ irAvailable: true });
    await volumeCommand('volUp');
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.volUp);
  });

  it('routes to IR when capabilities flag set and transmit succeeds', async () => {
    useSettingsStore.setState({ volumeTarget: 'ir', irProfileId: 'samsung-tv-nec' });
    useCapabilitiesStore.setState({ irAvailable: true });
    await volumeCommand('volDown');
    expect(IrBlaster.transmit).toHaveBeenCalled();
    expect(mockKeyPress).not.toHaveBeenCalled();
  });

  it('falls back to IP when neither capabilities nor legacy flag set', async () => {
    useSettingsStore.setState({ volumeTarget: 'ir', irProfileId: 'samsung-tv-nec' });
    await volumeCommand('mute');
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.mute);
  });

  it('legacy settings irAvailable still routes to IR (backwards compat)', async () => {
    useSettingsStore.setState({
      volumeTarget: 'ir',
      irProfileId: 'samsung-tv-nec',
      irAvailable: true,
    });
    await volumeCommand('volUp');
    expect(IrBlaster.transmit).toHaveBeenCalled();
  });

  it('no client and failed IR is a silent no-op', async () => {
    (getActiveClient as jest.Mock).mockReturnValue(null);
    useSettingsStore.setState({ volumeTarget: 'tv-os' });
    await expect(volumeCommand('volUp')).resolves.toBeUndefined();
  });
});
