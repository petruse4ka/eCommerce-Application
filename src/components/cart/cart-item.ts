import productImage from '@/assets/images/macarons.jpg';
import { CART_TEXT } from '@/constants';
import { CART_ITEM } from '@/styles/cart/cart-item';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import ProductQuantity from '../product/quantity';

export default class CartItem extends BaseComponent {
  constructor() {
    super({
      tag: 'article',
      className: CART_ITEM.CONTAINER,
    });

    this.render();
  }

  private render(): void {
    const productImg = new ImageBuilder({
      source: productImage,
      alt: 'Product image',
      className: CART_ITEM.IMAGE,
    }).getElement();

    const productName = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.INFO.NAME,
      textContent: 'Название продукта',
    }).getElement();

    const priceContainer = new ElementBuilder({
      tag: 'p',
      className: CART_ITEM.PRICE.DEFAULT,
      textContent: CART_TEXT.PRICE,
    }).getElement();

    const priceValue = new ElementBuilder({
      tag: 'span',
      className: CART_ITEM.PRICE.ACCENT,
      textContent: '10 ₽',
    }).getElement();

    priceContainer.append(priceValue);

    const deleteButton = new Button({
      style: 'DELETE_CART_ITEM',
      textContent: 'X',
      callback: (): void => {},
    }).getElement();

    const quantityInputBlock = new ProductQuantity(10, priceValue, '').getElement();

    this.component.append(
      productImg,
      productName,
      quantityInputBlock,
      priceContainer,
      deleteButton
    );
  }
}
