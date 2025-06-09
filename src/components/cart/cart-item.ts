import APICart from '@/api/cart';
import deleteIcon from '@/assets/icons/delete.svg';
import { CART_TEXT } from '@/constants';
import { ADDRESS } from '@/styles/address';
import { CART_ITEM } from '@/styles/cart/cart-item';
import type { CartItemView } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import ButtonWithIcon from '../buttons/button-with-icon';
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
    }).getElement();

    priceContainer.append(priceValue);

    const quantityInputBlock = new ProductQuantity({
      price: this.productInfo.discountedPrice ?? this.productInfo.prices,
      element: priceValue,
      text: '',
      count: this.productInfo.quantity,
      callback: (count: number): void => {
        void APICart.changeProductQuantity({ id: this.productInfo.id, quantity: count });
      },
    });

    this.component.append(quantityInputBlock.getElement(), priceContainer);
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

    const deleteButton = new ButtonWithIcon({
      style: 'DELETE_CART_ITEM',
      icon: {
        source: deleteIcon,
        alt: 'Garbage bin icon',
        className: ADDRESS.CARD.ICON,
      },
      callback: (): void => {
        void APICart.removeCartProduct(this.productInfo.id);
      },
    }).getElement();

    this.component.append(deleteButton);
  }
}
