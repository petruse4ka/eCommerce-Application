import type { AddProductBody, CartInfo, CartLineItem, CartResponse } from '@/types/interfaces';

export class TransformApiCartData {
  public static transformAddProduct(body: {
    cartInfo: CartInfo;
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

  public static transformLineItems(lineItems: CartResponse['lineItems']): CartLineItem[] {
    return lineItems.map((item: { productId: string; quantity: number }) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
  }
}
