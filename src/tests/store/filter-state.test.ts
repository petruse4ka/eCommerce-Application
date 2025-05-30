import { filterState } from '@/store/filter-state';

describe('Filter state', () => {
  beforeEach(() => {
    filterState.unsubscribe(() => {});
  });

  test('should return empty set for new filter', () => {
    expect(filterState.getSelectedOptions('type')).toEqual(new Set());
  });

  test('should correctly toggle options', () => {
    const filterId = 'type';
    const optionValue = 'testValue';

    filterState.toggleOption(filterId, optionValue);
    expect(filterState.getSelectedOptions(filterId)).toEqual(new Set([optionValue]));

    filterState.toggleOption(filterId, optionValue);
    expect(filterState.getSelectedOptions(filterId)).toEqual(new Set());
  });

  test('should notify subscriber on option toggle', () => {
    const mockCallback = vi.fn();
    filterState.subscribe(mockCallback);

    filterState.toggleOption('type', 'testOption');
    expect(mockCallback).toHaveBeenCalledTimes(1);

    filterState.toggleOption('type', 'testOption');
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should notify all subscribers on option toggle', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    filterState.subscribe(mockFirstCallback);
    filterState.subscribe(mockSecondCallback);

    filterState.toggleOption('type', 'testOption');

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
