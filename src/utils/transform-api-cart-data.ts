import { cartState } from '@/store/cart-state';
import type {
  AddProductBody,
  CartInfo,
  CartItem,
  CartItemView,
  CartLineItem,
  CartResponse,
  RemoveCartItem,
} from '@/types/interfaces';

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

  public static transformProductLine(productLine: CartItem[]): CartItemView[] {
    const result: CartItemView[] = [];

    for (const item of productLine) {
      const { images } = item.variant;
      const priceDivider = 10 ** item.price.value.fractionDigits;
      const discount = item.price.discounted;

      if (images) {
        const itemBody = {
          id: item.id,
          name: item.name.ru,
          prices: item.price.value.centAmount / priceDivider,
          discountedPrice: discount ? discount.value.centAmount / priceDivider : undefined,
          img: {
            url: images[0].url,
            alt: images[0].label,
          },
          quantity: item.quantity,
        };

        result.push(itemBody);
      }
    }

    return result;
  }

  public static transformProductLineDelete(id: string): RemoveCartItem | void {
    const cartInfo = cartState.getCartInfo();

    if (cartInfo) {
      return {
        version: cartInfo.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: id,
          },
        ],
      };
    }
  }
}
