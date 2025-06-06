import type { AddProductBody, CartInfo, CartItem, CartItemView } from '@/types/interfaces';

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

  public static transformProductLine(productLine: CartItem[]): CartItemView[] {
    const result: CartItemView[] = [];

    for (const item of productLine) {
      const { images } = item.variant;
      const priceDivider = 10 ** item.price.value.fractionDigits;
      const discount = item.price.discounted;

      if (images) {
        const itemBody = {
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
}
