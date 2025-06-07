import APICart from '@/api/cart';
import { cartState } from '@/store/cart-state';
import { userState } from '@/store/user-state';

beforeEach(() => {
  userState.setTokenState('test-token');
});

describe('APICart', () => {
  it('get cart', async () => {
    const updateCart = vi.spyOn(cartState, 'updateCart');

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 'cart-id',
          version: 1,
          lineItems: [],
        }),
    });

    await expect(APICart.createCart()).resolves.toBeUndefined();

    expect(updateCart).toHaveBeenCalledWith({ id: 'cart-id', version: 1 }, []);
  });
});
