import { render } from '@testing-library/react-native';
import { BRAND_ICONS, KEY_ICONS, iconFor, initialsFallback } from '../icons';

describe('shortcut icons coverage', () => {
  it('renders every brand icon', async () => {
    for (const Icon of Object.values(BRAND_ICONS)) {
      const { toJSON, unmount } = await render(<Icon size={24} color="#fff" />);
      expect(toJSON()).toBeTruthy();
      await unmount();
    }
    expect(Object.keys(BRAND_ICONS).length).toBeGreaterThan(10);
  });

  it('renders every key icon', async () => {
    for (const Icon of Object.values(KEY_ICONS)) {
      const { toJSON, unmount } = await render(<Icon size={24} color="#fff" />);
      expect(toJSON()).toBeTruthy();
      await unmount();
    }
  });

  it('iconFor resolves brands, falls back to key icons and null', async () => {
    expect(iconFor('netflix', 24, '#fff')).not.toBeNull();
    const { toJSON } = await render(<>{iconFor('netflix', 24, '#fff')}</>);
    expect(toJSON()).toBeTruthy();
    expect(iconFor('unknown-brand-xyz', 24, '#fff')).toBeNull();
  });

  it('initialsFallback derives initials', () => {
    expect(initialsFallback('Netflix')).toBe('N');
    expect(initialsFallback('You Tube')).toBe('YT');
    expect(initialsFallback('')).toBe('');
  });
});
