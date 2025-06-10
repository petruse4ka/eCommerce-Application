import APICart from '@/api/cart';
import { cartState } from '@/store/cart-state';
import { userState } from '@/store/user-state';
import { TransformApiCartData } from '@/utils/transform-api-cart-data';

beforeEach(() => {
  userState.setTokenState('test-token');
});

const body = {
  id: 'cart-id',
  version: 1,
  lineItems: [
    {
      id: '640e58dd-562c-4034-8fda-22f872ecb9f8',
      productId: '1fdd8f10-945d-4e10-a155-f0589bca8dc9',
      productKey: 'rolls-buttercream',
      name: {
        ru: 'Вафельные трубочки с заварным кремом «Наслаждение»',
      },
      productType: {
        typeId: 'product-type',
        id: 'd412169d-7099-4ce0-9bf2-b7d0c1605da9',
        version: 87,
      },
      productSlug: {
        ru: 'rolls-with-buttercream',
      },
      variant: {
        id: 1,
        sku: 'ROLLS-WITH-BUTTERCREAM',
        key: 'rolls-with-buttercream',
        prices: [
          {
            id: 'e3bf19ba-e4de-4044-b00e-117f14541294',
            value: {
              type: 'centPrecision',
              currencyCode: 'RUB',
              centAmount: 6500,
              fractionDigits: 2,
            },
            key: 'rolls-with-buttercream',
            country: 'RU',
          },
        ],
        images: [
          {
            url: 'https://images.cdn.europe-west1.gcp.commercetools.com/b9f98f74-b2a1-4aad-9996-1f77b7385183/cottage-cream-rolls--16gpgQ3B.png',
            alt: 'rolls with buttercream',
            dimensions: {
              w: 300,
              h: 230,
            },
          },
        ],
        attributes: [],
      },
      price: {
        id: 'e3bf19ba-e4de-4044-b00e-117f14541294',
        value: {
          type: 'centPrecision',
          currencyCode: 'RUB',
          centAmount: 6500,
          fractionDigits: 2,
        },
        key: 'rolls-with-buttercream',
        country: 'RU',
      },
      quantity: 1,
      addedAt: '2025-06-06T12:42:56.425Z',
      lastModifiedAt: '2025-06-06T12:42:56.425Z',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'RUB',
        centAmount: 6500,
        fractionDigits: 2,
      },
    },
  ],
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'RUB',
    centAmount: 6500,
    fractionDigits: 2,
  },
  discountCodes: [],
};

describe('APICart', () => {
  test('get cart', async () => {
    const bodyTransform = TransformApiCartData.transformProductLine(body.lineItems);
    const updateCart = vi.spyOn(cartState, 'setCartInfo');
    const updateCartLine = vi.spyOn(cartState, 'updateCartLine');

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(body),
    });

    await expect(APICart.createCart()).resolves.toBeUndefined();

    expect(updateCart).toHaveBeenCalledWith({
      version: 1,
      id: 'cart-id',
      lineItems: bodyTransform,
      totalPrice: 65,
      totalDiscountPrice: 0,
      discountCode: null,
    });

    expect(updateCartLine).toHaveBeenCalledWith(
      TransformApiCartData.transformLineItems(body.lineItems)
    );
  });
});
