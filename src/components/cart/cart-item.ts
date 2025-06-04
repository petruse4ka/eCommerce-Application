import { CART_TEXT } from '@/constants';
import { CART_ITEM } from '@/styles/cart/cart-item';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import ProductQuantity from '../product/quantity';

export default class CartItem extends BaseComponent {
  private productInfo: {
    name: string;
    img: string;
    price: number;
  };

  constructor(product: { name: string; img: string; price: number }) {
    super({
      tag: 'article',
      className: CART_ITEM.CONTAINER,
    });

    this.productInfo = product;

    this.render();
  }

  private render(): void {
    const productImg = new ImageBuilder({
      source: this.productInfo.img,
      alt: 'Product image',
      className: CART_ITEM.IMAGE,
    }).getElement();

    const productName = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.INFO.NAME,
      textContent: this.productInfo.name,
    }).getElement();

    const priceContainer = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.PRICE.DEFAULT,
      textContent: CART_TEXT.PRICE,
    }).getElement();

    const priceValue = new ElementBuilder({
      tag: 'span',
      className: CART_ITEM.PRICE.ACCENT,
      textContent: `${this.productInfo.price} ₽`,
    }).getElement();

    priceContainer.append(priceValue);

    const deleteButton = new Button({
      style: 'DELETE_CART_ITEM',
      textContent: 'X',
      callback: (): void => {},
    }).getElement();

    const quantityInputBlock = new ProductQuantity(
      this.productInfo.price,
      priceValue,
      ''
    ).getElement();

    this.component.append(
      productImg,
      productName,
      quantityInputBlock,
      priceContainer,
      deleteButton
    );
  }
}
