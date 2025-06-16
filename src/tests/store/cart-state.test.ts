import { cartState } from '@/store/cart-state';
import { CartStateKey } from '@/types/enums';

describe('Cart state', () => {
  beforeEach(() => {
    cartState.setItemsCount(0);
    cartState.unsubscribe(CartStateKey.ITEMS_COUNT, () => {});
  });

  test('should be 0 at initialization', () => {
    expect(cartState.getItemsCount()).toBe(0);
  });

  test('should correctly change and return items count', () => {
    cartState.setItemsCount(5);
    expect(cartState.getItemsCount()).toBe(5);

    cartState.setItemsCount(0);
    expect(cartState.getItemsCount()).toBe(0);
  });

  test('should notify subscriber on each state change', () => {
    const mockCallback = vi.fn((itemsCount) => {
      void itemsCount;
    });
    cartState.subscribe(CartStateKey.ITEMS_COUNT, mockCallback);

    cartState.setItemsCount(3);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(3);

    cartState.setItemsCount(0);
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith(0);
  });

  test('should notify all subscribers on state change', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    cartState.subscribe(CartStateKey.ITEMS_COUNT, mockFirstCallback);
    cartState.subscribe(CartStateKey.ITEMS_COUNT, mockSecondCallback);

    cartState.setItemsCount(2);

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
