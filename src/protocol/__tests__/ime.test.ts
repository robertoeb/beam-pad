import { useImeStore } from '@/stores/ime';
import { commitImeText, imeSession } from '@/services/ime';

const mockImeBatchEdit = jest.fn();

jest.mock('@/services/session', () => ({
  getClient: jest.fn(() => ({ imeBatchEdit: mockImeBatchEdit })),
  getActiveClient: jest.fn(() => ({ imeBatchEdit: mockImeBatchEdit })),
}));

beforeEach(() => {
  mockImeBatchEdit.mockClear();
  imeSession.reset();
  useImeStore.setState({
    visible: true,
    fieldCounter: 5,
    label: 'Search',
    value: '',
    start: 0,
    end: 0,
  });
});

describe('IME diff algorithm', () => {
  it('append: "ca" → "cat"', () => {
    useImeStore.getState().setValue('ca');
    commitImeText('cat');
    expect(mockImeBatchEdit).toHaveBeenCalledTimes(1);
    const batch = mockImeBatchEdit.mock.calls[0][0];
    expect(batch.fieldCounter).toBe(5);
    expect(batch.imeCounter).toBe(1);
    expect(batch.editInfo).toEqual([
      { insert: 1, textFieldStatus: { start: 2, end: 2, value: 't' } },
    ]);
  });

  it('delete: "cats" → "cat"', () => {
    useImeStore.getState().setValue('cats');
    commitImeText('cat');
    expect(mockImeBatchEdit).toHaveBeenCalledTimes(1);
    const batch = mockImeBatchEdit.mock.calls[0][0];
    expect(batch.editInfo).toEqual([
      { insert: 0, textFieldStatus: { start: 3, end: 4, value: '' } },
    ]);
  });

  it('mixed: "car" → "cat"', () => {
    useImeStore.getState().setValue('car');
    commitImeText('cat');
    expect(mockImeBatchEdit).toHaveBeenCalledTimes(1);
    const batch = mockImeBatchEdit.mock.calls[0][0];
    expect(batch.editInfo).toHaveLength(2);
    expect(batch.editInfo[0]).toEqual({
      insert: 0,
      textFieldStatus: { start: 2, end: 3, value: '' },
    });
    expect(batch.editInfo[1]).toEqual({
      insert: 1,
      textFieldStatus: { start: 2, end: 2, value: 't' },
    });
  });

  it('no-op: identical text sends nothing', () => {
    useImeStore.getState().setValue('cat');
    commitImeText('cat');
    expect(mockImeBatchEdit).not.toHaveBeenCalled();
  });

  it('closed sheet: visible=false sends nothing', () => {
    useImeStore.setState({ visible: false });
    commitImeText('hello');
    expect(mockImeBatchEdit).not.toHaveBeenCalled();
  });

  it('unicode: emoji surrogate pairs', () => {
    useImeStore.getState().setValue('😀😁');
    commitImeText('😀😁😂');
    expect(mockImeBatchEdit).toHaveBeenCalledTimes(1);
    const batch = mockImeBatchEdit.mock.calls[0][0];
    expect(batch.editInfo).toEqual([
      { insert: 1, textFieldStatus: { start: 4, end: 4, value: '😂' } },
    ]);
  });

  it('unicode: CJK characters', () => {
    useImeStore.getState().setValue('你好');
    commitImeText('你好世界');
    expect(mockImeBatchEdit).toHaveBeenCalledTimes(1);
    const batch = mockImeBatchEdit.mock.calls[0][0];
    expect(batch.editInfo).toEqual([
      { insert: 1, textFieldStatus: { start: 2, end: 2, value: '世界' } },
    ]);
  });

  it('unicode: RTL text', () => {
    useImeStore.getState().setValue('של');
    commitImeText('שלום');
    expect(mockImeBatchEdit).toHaveBeenCalledTimes(1);
    const batch = mockImeBatchEdit.mock.calls[0][0];
    expect(batch.editInfo).toEqual([
      { insert: 1, textFieldStatus: { start: 2, end: 2, value: 'ום' } },
    ]);
  });

  it('fieldCounter echoed and imeCounter strictly increasing', () => {
    useImeStore.setState({ fieldCounter: 7 });
    useImeStore.getState().setValue('a');
    commitImeText('ab');
    commitImeText('abc');
    commitImeText('ab');
    const calls = mockImeBatchEdit.mock.calls;
    expect(calls).toHaveLength(3);
    expect(calls[0][0].fieldCounter).toBe(7);
    expect(calls[1][0].fieldCounter).toBe(7);
    expect(calls[2][0].fieldCounter).toBe(7);
    expect(calls[0][0].imeCounter).toBe(1);
    expect(calls[1][0].imeCounter).toBe(2);
    expect(calls[2][0].imeCounter).toBe(3);
  });
});
