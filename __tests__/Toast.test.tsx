import { render, act } from '@testing-library/react-native';
import { ToastHost, showToast } from '@/components/Toast';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('ToastHost', () => {
  it('displays toast message when showToast is called and hides after 2s', async () => {
    const { getByText } = await render(<ToastHost />);

    await act(async () => {
      showToast('TV Connected');
      jest.advanceTimersByTime(10);
    });

    expect(getByText('TV Connected')).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(2100);
    });
  });
});
