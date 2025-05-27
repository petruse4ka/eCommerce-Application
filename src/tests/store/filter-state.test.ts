import { beforeEach, describe, expect, test, vi } from 'vitest';

import { filterState } from '@/store/filter-state';
import { FilterId } from '@/types/enums';

describe('Filter state', () => {
  beforeEach(() => {
    filterState.unsubscribe(() => {});
  });

  test('should return empty set for new filter', () => {
    expect(filterState.getSelectedOptions(FilterId.TYPE)).toEqual(new Set());
  });

  test('should correctly toggle options', () => {
    const filterId = FilterId.TYPE;
    const optionValue = 'testValue';

    filterState.toggleOption(filterId, optionValue);
    expect(filterState.getSelectedOptions(filterId)).toEqual(new Set([optionValue]));

    filterState.toggleOption(filterId, optionValue);
    expect(filterState.getSelectedOptions(filterId)).toEqual(new Set());
  });

  test('should notify subscriber on option toggle', () => {
    const mockCallback = vi.fn();
    filterState.subscribe(mockCallback);

    filterState.toggleOption(FilterId.TYPE, 'testOption');
    expect(mockCallback).toHaveBeenCalledTimes(1);

    filterState.toggleOption(FilterId.TYPE, 'testOption');
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should notify all subscribers on option toggle', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    filterState.subscribe(mockFirstCallback);
    filterState.subscribe(mockSecondCallback);

    filterState.toggleOption(FilterId.TYPE, 'testOption');

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
