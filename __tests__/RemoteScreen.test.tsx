import { render } from '@testing-library/react-native';
import Index from '@/app/index';
import { getClient } from '@/services/session';
import { useLayoutStore } from '@/stores/layout';

jest.mock('@/services/session', () => ({
  getClient: jest.fn(),
  getActiveClient: jest.fn(),
}));

beforeEach(() => {
  (getClient as jest.Mock).mockReturnValue(null);
  useLayoutStore.setState({ moreSheetOpen: false });
});

describe('Remote Screen — 4-element default layout', () => {
  it('renders without crashing', async () => {
    const { toJSON } = await render(<Index />);
    expect(toJSON()).toBeTruthy();
  });

  it('snapshot test guards against visual regressions', async () => {
    const { toJSON } = await render(<Index />);
    expect(toJSON()).toMatchSnapshot();
  });
});
