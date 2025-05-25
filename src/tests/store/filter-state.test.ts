import { beforeEach, describe, expect, test, vi } from 'vitest';

import { filterState } from '@/store/filter-state';

describe('Filter state', () => {
  beforeEach(() => {
    filterState.unsubscribe(() => {});
  });

  test('should return empty set for new filter', () => {
    expect(filterState.getSelectedOptions('testFilter')).toEqual(new Set());
  });

  test('should correctly toggle options', () => {
    const filterId = 'testID';
    const optionValue = 'testValue';

    filterState.toggleOption(filterId, optionValue);
    expect(filterState.getSelectedOptions(filterId)).toEqual(new Set([optionValue]));

    filterState.toggleOption(filterId, optionValue);
    expect(filterState.getSelectedOptions(filterId)).toEqual(new Set());
  });

  test('should notify subscriber on option toggle', () => {
    const mockCallback = vi.fn();
    filterState.subscribe(mockCallback);

    filterState.toggleOption('testFilter', 'testOption');
    expect(mockCallback).toHaveBeenCalledTimes(1);

    filterState.toggleOption('testFilter', 'testOption');
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should notify all subscribers on option toggle', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    filterState.subscribe(mockFirstCallback);
    filterState.subscribe(mockSecondCallback);

    filterState.toggleOption('testFilter', 'testOption');

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
