import BaseComponent from '@/components/base';
import AddToCartButton from '@/components/buttons/add-to-cart-button';
import { DEFAULT_CURRENCY } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Price, PriceValue } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import ProductList from '../catalog/product-list';

export default class ProductPrices extends BaseComponent {
  private productId: string;

  constructor(inputPrices: Price[], productId: string) {
    super({ tag: 'div', className: PRODUCT_STYLES.PRICES_CONTAINER });
    this.productId = productId;
    const prices = ProductPrices.parsePrices(inputPrices);
    this.render(prices);
  }

  private static parsePrices(prices: Price[]): PriceValue {
    if (Array.isArray(prices) && prices[0].value?.centAmount && prices[0].value?.fractionDigits) {
      const price: PriceValue = {
        price: prices[0].value?.centAmount / 10 ** prices[0].value?.fractionDigits,
        code: DEFAULT_CURRENCY,
      };
      const discounted = prices[0].discounted?.value;
      if (discounted && discounted.centAmount && discounted.fractionDigits) {
        price.oldPrice = price.price;
        price.price = discounted.centAmount / 10 ** discounted.fractionDigits;
      }
      return price;
    } else {
      console.error('data error');
      throw new Error('data error');
    }
  }

  private static createAddToCartButton(productId: string): HTMLElement {
    return new AddToCartButton({
      style: 'ADD_TO_CART',
      productId: productId,
    }).getElement();
  }

  protected render(prices: PriceValue): void {
    const actualPrice = `${prices.price.toFixed(2)}${DEFAULT_CURRENCY}`;
    const noActualPrice = prices.oldPrice ? `${prices.oldPrice.toFixed(2)}${DEFAULT_CURRENCY}` : '';
    const currentPrice = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PRICE,
      textContent: actualPrice,
    }).getElement();

    this.component.append(currentPrice);

    const oldPrice = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PRICE_OLD,
      textContent: noActualPrice,
    }).getElement();
    if (prices.oldPrice) {
      this.component.append(ProductList.createPromoTag());
    }

    this.component.append(oldPrice);

    const button = ProductPrices.createAddToCartButton(this.productId);

    this.component.append(button);
  }
}
