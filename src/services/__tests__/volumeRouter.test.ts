import { volumeCommand, irSend } from '../volumeRouter';
import { getActiveClient } from '../sessionManager';
import { useSettingsStore } from '@/stores/settings';
import { IrBlaster } from '@/modules/expo-ir-blaster';
import { KEYS } from '@/protocol/keycodes';

jest.mock('../sessionManager', () => ({
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
  (IrBlaster.transmit as jest.Mock).mockClear();
  (IrBlaster.getCarrierFrequencyRanges as jest.Mock).mockResolvedValue([
    { min: 30000, max: 60000 },
  ]);
  useSettingsStore.setState({
    volumeTarget: 'tv-os',
    irProfileId: null,
    irAvailable: false,
  });
});

describe('volumeRouter', () => {
  describe('volumeCommand', () => {
    it('TV target routes to IP keyPress', async () => {
      useSettingsStore.setState({ volumeTarget: 'tv-os' });
      await volumeCommand('volUp');
      expect(mockKeyPress).toHaveBeenCalledWith(KEYS.volUp);
      expect(IrBlaster.transmit).not.toHaveBeenCalled();
    });

    it('IR target with emitter and profile routes to IR', async () => {
      useSettingsStore.setState({
        volumeTarget: 'ir',
        irAvailable: true,
        irProfileId: 'samsung-tv-nec',
      });
      await volumeCommand('volUp');
      expect(IrBlaster.transmit).toHaveBeenCalled();
      expect(mockKeyPress).not.toHaveBeenCalled();
    });

    it('IR target without emitter falls back to IP', async () => {
      useSettingsStore.setState({
        volumeTarget: 'ir',
        irAvailable: false,
        irProfileId: 'samsung-tv-nec',
      });
      await volumeCommand('volUp');
      expect(mockKeyPress).toHaveBeenCalledWith(KEYS.volUp);
      expect(IrBlaster.transmit).not.toHaveBeenCalled();
    });

    it('IR target with no profile falls back to IP', async () => {
      useSettingsStore.setState({
        volumeTarget: 'ir',
        irAvailable: true,
        irProfileId: null,
      });
      await volumeCommand('volUp');
      expect(mockKeyPress).toHaveBeenCalledWith(KEYS.volUp);
    });

    it('volDown routes correctly', async () => {
      useSettingsStore.setState({ volumeTarget: 'tv-os' });
      await volumeCommand('volDown');
      expect(mockKeyPress).toHaveBeenCalledWith(KEYS.volDown);
    });

    it('mute routes correctly', async () => {
      useSettingsStore.setState({ volumeTarget: 'tv-os' });
      await volumeCommand('mute');
      expect(mockKeyPress).toHaveBeenCalledWith(KEYS.mute);
    });
  });

  describe('irSend', () => {
    it('returns false when no profile selected', async () => {
      useSettingsStore.setState({ irProfileId: null });
      const result = await irSend('power');
      expect(result).toBe(false);
    });

    it('returns false when carrier frequency not supported', async () => {
      useSettingsStore.setState({ irProfileId: 'sony-tv-sirc12' });
      (IrBlaster.getCarrierFrequencyRanges as jest.Mock).mockResolvedValue([
        { min: 30000, max: 38000 },
      ]);
      const result = await irSend('power');
      expect(result).toBe(false);
      expect(IrBlaster.transmit).not.toHaveBeenCalled();
    });

    it('transmits when profile and carrier range match', async () => {
      useSettingsStore.setState({ irProfileId: 'samsung-tv-nec' });
      const result = await irSend('power');
      expect(result).toBe(true);
      expect(IrBlaster.transmit).toHaveBeenCalledWith(38028, expect.any(Array));
    });
  });
});
