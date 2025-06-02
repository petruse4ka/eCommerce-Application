import { filterState } from '@/store/filter-state';
import { FilterType } from '@/types/enums';

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

    filterState.toggleOption(filterId, optionValue, optionValue, FilterType.CHECKBOX);
    expect(filterState.getSelectedOptions(filterId)).toEqual(
      new Set([{ key: optionValue, value: optionValue, type: FilterType.CHECKBOX }])
    );

    filterState.toggleOption(filterId, optionValue, optionValue, FilterType.CHECKBOX);
    expect(filterState.getSelectedOptions(filterId)).toEqual(new Set());
  });

  test('should notify subscriber on option toggle', () => {
    const mockCallback = vi.fn();
    filterState.subscribe(mockCallback);

    filterState.toggleOption('type', 'testOption', 'testOption', FilterType.CHECKBOX);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    filterState.toggleOption('type', 'testOption', 'testOption', FilterType.CHECKBOX);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should notify all subscribers on option toggle', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    filterState.subscribe(mockFirstCallback);
    filterState.subscribe(mockSecondCallback);

    filterState.toggleOption('type', 'testOption', 'testOption', FilterType.CHECKBOX);

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
