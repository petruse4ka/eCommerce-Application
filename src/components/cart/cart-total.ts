import { BTN_TEXT, CART_TEXT, DEFAULT_CURRENCY } from '@/constants';
import { cartState } from '@/store/cart-state';
import { CART_TOTAL } from '@/styles/cart/cart-total';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import FormPromoCode from '../forms/promo-code';

export default class CartTotal extends BaseComponent {
  private totalPrice: number;
  private totalDiscountPrice: number;
  private discountCode: string | null;

  constructor() {
    super({
      tag: 'section',
      className: CART_TOTAL.CONTAINER,
    });

    const cartInfo = cartState.getCartInfo();

    this.totalPrice = cartInfo?.totalPrice ?? 0;
    this.totalDiscountPrice = cartInfo?.totalDiscountPrice ?? 0;
    this.discountCode = cartInfo?.discountCode ?? null;

    this.render();
  }

  private static createTotalItem(
    textContent: string,
    price: string,
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
      textContent: price,
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

  private createTotalInfo(): HTMLElement {
    const totalInfoContainer = new ElementBuilder({
      tag: 'div',
      className: '',
    }).getElement();

    const productsPrice = CartTotal.createTotalItem(
      CART_TEXT.PRODUCTS_PRICE,
      `${this.totalPrice + this.totalDiscountPrice} ${DEFAULT_CURRENCY}`,
      {
        isDotted: true,
        isAccent: false,
      }
    );
    const sale = CartTotal.createTotalItem(
      CART_TEXT.SALE,
      `${this.totalDiscountPrice} ${DEFAULT_CURRENCY}`,
      {
        isDotted: true,
        isAccent: false,
      }
    );

    totalInfoContainer.append(productsPrice, sale);

    if (this.discountCode) {
      const codeInfo = CartTotal.createTotalItem(
        CART_TEXT.PROMO_CODE_APPLY,
        `${this.discountCode}`,
        {
          isDotted: true,
          isAccent: false,
        }
      );

      totalInfoContainer.append(codeInfo);
    }

    return totalInfoContainer;
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h4',
      className: CART_TOTAL.TITLE,
      textContent: CART_TEXT.TOTAL_TITLE,
    }).getElement();

    const totalInfo = this.createTotalInfo();

    const totalPrice = CartTotal.createTotalItem(
      CART_TEXT.TOTAL_PRICE,
      `${this.totalPrice} ${DEFAULT_CURRENCY}`,
      {
        isDotted: false,
        isAccent: true,
      }
    );

    const formPromo = new FormPromoCode().getElement();

    const checkoutButton = new Button({
      style: 'PRICE_BUTTON',
      textContent: BTN_TEXT.CHECKOUT,
      callback: (): void => {},
    }).getElement();

    this.component.append(title, totalInfo, totalPrice, formPromo, checkoutButton);
  }
}
