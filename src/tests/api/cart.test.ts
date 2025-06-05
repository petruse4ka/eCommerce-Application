import APICart from '@/api/cart';
import { cartState } from '@/store/cart-state';
import { userState } from '@/store/user-state';

beforeEach(() => {
  userState.setTokenState('test-token');
});

describe('APICart', () => {
  test('get cart', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 'cart-id', version: 1 }),
    });

    const setCartInfo = vi.spyOn(cartState, 'setCartInfo');
    await expect(APICart.createCart()).resolves.toBeUndefined();

    expect(setCartInfo).toHaveBeenCalledWith({ id: 'cart-id', version: 1 });
  });
});
