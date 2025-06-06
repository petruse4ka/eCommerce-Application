import { CART_TEXT } from '@/constants';
import { CART_ITEM } from '@/styles/cart/cart-item';
import type { CartItemView } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import ProductQuantity from '../product/quantity';

export default class CartItem extends BaseComponent {
  private productInfo: CartItemView;

  constructor(product: CartItemView) {
    super({
      tag: 'article',
      className: CART_ITEM.CONTAINER,
    });

    this.productInfo = product;

    this.render();
  }

  private createPriceAndQuantity(): void {
    const priceContainer = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.PRICE.DEFAULT,
      textContent: CART_TEXT.PRICE,
    }).getElement();

    const priceValue = new ElementBuilder({
      tag: 'span',
      className: CART_ITEM.PRICE.ACCENT,
      textContent: `${this.productInfo.prices} ₽`,
    }).getElement();

    priceContainer.append(priceValue);

    if (this.productInfo.discountedPrice) {
      const priceOldValue = new ElementBuilder({
        tag: 'span',
        className: CART_ITEM.PRICE.OLD,
        textContent: `${this.productInfo.prices} ₽`,
      }).getElement();

      priceValue.textContent = `${this.productInfo.discountedPrice} ₽`;

      priceContainer.append(priceOldValue);
    }

    const quantityInputBlock = new ProductQuantity(
      this.productInfo.prices,
      priceValue,
      ''
    ).getElement();

    this.component.append(quantityInputBlock, priceContainer);
  }

  private render(): void {
    const productImg = new ImageBuilder({
      source: this.productInfo.img.url,
      alt: this.productInfo.img.alt ?? 'Product image',
      className: CART_ITEM.IMAGE,
    }).getElement();

    const productName = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.INFO.NAME,
      textContent: this.productInfo.name,
    }).getElement();

    this.component.append(productImg, productName);

    this.createPriceAndQuantity();

    const deleteButton = new Button({
      style: 'DELETE_CART_ITEM',
      textContent: 'X',
      callback: (): void => {},
    }).getElement();

    this.component.append(deleteButton);
  }
}
