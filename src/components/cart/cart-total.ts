import { BTN_TEXT, CART_TEXT } from '@/constants';
import { CART_TOTAL } from '@/styles/cart/cart-total';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import FormPromoCode from '../forms/promo-code';

export default class CartTotal extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: CART_TOTAL.CONTAINER,
    });

    this.render();
  }

  private static createTotalItem(
    textContent: string,
    style: { isDotted: boolean; isAccent: boolean }
  ): HTMLElement {
    const { isDotted, isAccent } = style;
    const container = new ElementBuilder({
      tag: 'h4',
      className: isAccent ? CART_TOTAL.ITEM.CONTAINER.ACCENT : CART_TOTAL.ITEM.CONTAINER.DEFAULT,
    }).getElement();

    const title = new ElementBuilder({
      tag: 'p',
      className: isAccent ? CART_TOTAL.ITEM.TEXT.ACCENT : CART_TOTAL.ITEM.TEXT.DEFAULT,
      textContent,
    }).getElement();

    const value = new ElementBuilder({
      tag: 'p',
      className: isAccent ? CART_TOTAL.ITEM.TEXT.ACCENT : CART_TOTAL.ITEM.TEXT.DEFAULT,
      textContent: '100 руб',
    }).getElement();

    if (isDotted) {
      const dotted = new ElementBuilder({
        tag: 'span',
        className: CART_TOTAL.ITEM.DOTTED,
      }).getElement();

      container.append(title, dotted, value);
    } else {
      container.append(title, value);
    }

    return container;
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h4',
      className: CART_TOTAL.TITLE,
      textContent: CART_TEXT.TOTAL_TITLE,
    }).getElement();

    const totalInfoContainer = new ElementBuilder({
      tag: 'div',
      className: '',
    }).getElement();

    const productsPrice = CartTotal.createTotalItem(CART_TEXT.PRODUCTS_PRICE, {
      isDotted: true,
      isAccent: false,
    });
    const sale = CartTotal.createTotalItem(CART_TEXT.SALE, { isDotted: true, isAccent: false });
    const delivery = CartTotal.createTotalItem(CART_TEXT.DELIVERY, {
      isDotted: true,
      isAccent: false,
    });

    totalInfoContainer.append(productsPrice, sale, delivery);

    const totalPrice = CartTotal.createTotalItem(CART_TEXT.TOTAL_PRICE, {
      isDotted: false,
      isAccent: true,
    });

    const formPromo = new FormPromoCode().getElement();

    const checkoutButton = new Button({
      style: 'PRICE_BUTTON',
      textContent: BTN_TEXT.CHECKOUT,
      callback: (): void => {},
    }).getElement();

    this.component.append(title, totalInfoContainer, totalPrice, formPromo, checkoutButton);
  }
}
