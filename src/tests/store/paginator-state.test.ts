import { paginatorState } from '@/store/paginator-state';

beforeEach(() => {
  paginatorState.setCurrentPage(1);
  paginatorState.setTotalPages(10);
  paginatorState.unsubscribe(() => {});
});

describe('Paginator state', () => {
  test('should be 1 and 10 at initialization', () => {
    expect(paginatorState.getCurrentPage()).toBe(1);
    expect(paginatorState.getTotalPages()).toBe(10);
  });

  test('should correctly change and return current page', () => {
    paginatorState.setCurrentPage(5);
    expect(paginatorState.getCurrentPage()).toBe(5);

    paginatorState.setCurrentPage(1);
    expect(paginatorState.getCurrentPage()).toBe(1);
  });

  test('should correctly change and return total pages', () => {
    paginatorState.setTotalPages(999);
    expect(paginatorState.getTotalPages()).toBe(999);

    paginatorState.setTotalPages(-5);
    expect(paginatorState.getTotalPages()).toBe(1);
  });
});

describe('Paginator state', () => {
  test('should notify subscriber on each state change', () => {
    const mockCallback = vi.fn();
    paginatorState.subscribe(mockCallback);

    paginatorState.setCurrentPage(3);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(3);

    paginatorState.setCurrentPage(-5);
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith(1);
  });

  test('should notify all subscribers on state change', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    paginatorState.subscribe(mockFirstCallback);
    paginatorState.subscribe(mockSecondCallback);

    paginatorState.setCurrentPage(2);

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
