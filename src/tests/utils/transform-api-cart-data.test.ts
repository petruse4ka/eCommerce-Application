import type { CartInfo } from '@/types/interfaces';
import { TransformApiCartData } from '@/utils/transform-api-cart-data';

const body: {
  cartInfo: CartInfo;
  productId: string;
} = {
  cartInfo: {
    id: 'cart-id',
    version: 1,
    lineItems: [],
    totalPrice: 0,
    totalDiscountPrice: 0,
  },
  productId: 'product-id',
};

describe('TransformDataCart', () => {
  it('transform cart correctly', () => {
    const result = TransformApiCartData.transformAddProduct(body);

    expect(result).toEqual({
      version: 1,
      actions: [
        {
          action: 'addLineItem',
          productId: 'product-id',
          variantId: 1,
          quantity: 1,
        },
      ],
    });
  });
});
