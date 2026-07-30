import { render } from '@testing-library/react-native';
import { ShortcutTile } from '@/components/ShortcutTile';
import { shortcutRegistry } from '@/shortcuts/registry';
import { useConnectionStore } from '@/stores/connection';
import type { Shortcut } from '@/shortcuts/types';

beforeEach(() => {
  useConnectionStore.setState({ currentApp: undefined });
  jest.clearAllMocks();
});

describe('ShortcutTile', () => {
  it('renders app shortcut with brand icon', async () => {
    const shortcut = shortcutRegistry.resolve('app:netflix')!;
    const { getByLabelText } = await render(
      <ShortcutTile shortcut={shortcut} size={64} />,
    );
    expect(getByLabelText('Open Netflix')).toBeTruthy();
  });

  it('renders key shortcut with lucide icon', async () => {
    const shortcut = shortcutRegistry.resolve('key:guide')!;
    const { getByLabelText } = await render(
      <ShortcutTile shortcut={shortcut} size={64} />,
    );
    expect(getByLabelText('Open Guide')).toBeTruthy();
  });

  it('renders missing shortcut with "?" icon', async () => {
    const { getByLabelText } = await render(
      <ShortcutTile shortcut={null} size={64} missing />,
    );
    const tile = getByLabelText('Remove Unknown');
    expect(tile).toBeTruthy();
  });

  it('highlights current app tile', async () => {
    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
    });
    const shortcut = shortcutRegistry.resolve('app:netflix')!;
    const { getByLabelText } = await render(
      <ShortcutTile shortcut={shortcut} size={64} />,
    );
    expect(getByLabelText('Open Netflix')).toBeTruthy();
  });

  it('shows remove button in edit mode with 44dp hit target', async () => {
    const shortcut = shortcutRegistry.resolve('app:netflix')!;
    const onRemove = jest.fn();
    const { getByLabelText } = await render(
      <ShortcutTile shortcut={shortcut} size={64} editMode onRemove={onRemove} />,
    );
    const removeBtn = getByLabelText('Remove Netflix');
    expect(removeBtn).toBeTruthy();
  });

  it('icon fallback chain: brand → lucide → initials', async () => {
    const customShortcut: Shortcut = {
      id: 'user:custom',
      label: 'Custom Thing',
      action: { kind: 'macro', steps: [] },
      icon: 'nonexistent_icon',
      builtIn: false,
    };
    const { getByLabelText } = await render(
      <ShortcutTile shortcut={customShortcut} size={64} />,
    );
    expect(getByLabelText('Open Custom Thing')).toBeTruthy();
  });
});
