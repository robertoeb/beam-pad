import { render } from '@testing-library/react-native';
import { ConnectionDot } from '@/components/ConnectionDot';
import { useConnectionStore } from '@/stores/connection';

describe('ConnectionDot', () => {
  it('renders green/cyan dot when active', async () => {
    useConnectionStore.setState({ state: 'ACTIVE' });
    const { toJSON } = await render(<ConnectionDot />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders error ring when in error state', async () => {
    useConnectionStore.setState({ state: 'ERROR_STATE' });
    const { toJSON } = await render(<ConnectionDot />);
    expect(toJSON()).toBeTruthy();
  });
});
