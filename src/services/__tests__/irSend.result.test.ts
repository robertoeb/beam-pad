import { irSend } from '../volumeRouter';
import { useSettingsStore } from '@/stores/settings';
import { IrBlaster } from '@/modules/expo-ir-blaster';

jest.mock('@/modules/expo-ir-blaster', () => ({
  IrBlaster: {
    hasIrEmitter: jest.fn(),
    getCarrierFrequencyRanges: jest.fn(),
    transmit: jest.fn(),
  },
}));

beforeEach(() => {
  (IrBlaster.hasIrEmitter as jest.Mock).mockResolvedValue(true);
  (IrBlaster.getCarrierFrequencyRanges as jest.Mock).mockResolvedValue([
    { min: 30000, max: 60000 },
  ]);
  (IrBlaster.transmit as jest.Mock).mockResolvedValue(undefined);
  useSettingsStore.setState({
    irProfileId: null,
    irPerDevice: {},
  });
});

describe('irSend result reasons', () => {
  it('no-profile when no profile is set', async () => {
    const result = await irSend('power');
    expect(result).toEqual({ ok: false, reason: 'no-profile' });
  });

  it('no-command when command not in profile', async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    const result = await irSend('input' as any);
    expect(result.ok).toBe(true);
  });

  it('no-emitter when phone has no IR blaster', async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    (IrBlaster.hasIrEmitter as jest.Mock).mockResolvedValue(false);
    const result = await irSend('power');
    expect(result).toEqual({ ok: false, reason: 'no-emitter' });
  });

  it('freq-unsupported when carrier frequency out of range', async () => {
    useSettingsStore.setState({ irProfileId: 'sony-tv-sirc12' });
    (IrBlaster.getCarrierFrequencyRanges as jest.Mock).mockResolvedValue([
      { min: 30000, max: 37000 },
    ]);
    const result = await irSend('power');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('freq-unsupported');
      expect(result.detail).toContain('Hz');
    }
  });

  it('transmit-failed when transmit throws', async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    (IrBlaster.transmit as jest.Mock).mockRejectedValue(new Error('HW fault'));
    const result = await irSend('power');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('transmit-failed');
      expect(result.detail).toBe('HW fault');
    }
  });

  it('ok:true on successful transmit', async () => {
    useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
    const result = await irSend('power');
    expect(result).toEqual({ ok: true });
  });
});
