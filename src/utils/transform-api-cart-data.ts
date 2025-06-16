import APICart from '@/api/cart';
import { cartState } from '@/store/cart-state';
import type {
  AddDiscountCode,
  AddProductBody,
  CartInfo,
  CartItem,
  CartItemView,
  CartLineItem,
  CartResponse,
  ProductQuantityTransform,
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
          productId: item.productId,
          key: item.productKey,
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

  public static transformProductQuantity(body: {
    id: string;
    quantity: number;
  }): ProductQuantityTransform | void {
    const cartInfo = cartState.getCartInfo();

    if (cartInfo) {
      return {
        version: cartInfo.version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: body.id,
            quantity: body.quantity,
          },
        ],
      };
    }
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

  public static transformAddDiscountCode(code: string): AddDiscountCode | void {
    const cartInfo = cartState.getCartInfo();

    if (cartInfo) {
      return {
        version: cartInfo.version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      };
    }
  }

  public static async transformCartState(body: CartResponse): Promise<CartInfo> {
    const priceDivider = 10 ** body.totalPrice.fractionDigits;
    const totalDiscount = body.discountOnTotalPrice;

    const discounts = body.discountCodes;
    let discountCode = null;
    if (discounts.length > 0) {
      discountCode = await APICart.getDiscountCodeInfo(body.discountCodes[0].discountCode.id);
    }

    const result = {
      id: body.id,
      version: body.version,
      lineItems: TransformApiCartData.transformProductLine(body.lineItems),
      totalPrice: body.totalPrice.centAmount / priceDivider,
      totalDiscountPrice: totalDiscount
        ? totalDiscount.discountedAmount.centAmount / priceDivider
        : 0,
      discountCode: discountCode ?? null,
    };

    return result;
  }
}
