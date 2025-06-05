import type { AddProductBody, cartInfo } from '@/types/interfaces';

export class TransformApiCartData {
  public static transformAddProduct(body: {
    cartInfo: cartInfo;
    productId: string;
  }): AddProductBody {
    return {
      version: body.cartInfo.version,
      actions: [
        {
          action: 'addLineItem',
          productId: body.productId,
          variantId: 1,
          quantity: 1,
        },
      ],
    };
  }
}
