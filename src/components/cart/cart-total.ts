import APICart from '@/api/cart';
import macaronAstonaut from '@/assets/images/astronaut.png';
import { BTN_TEXT, CART_TEXT, DEFAULT_CURRENCY } from '@/constants';
import { MODAL_TITLE } from '@/constants';
import Router from '@/router';
import { cartState } from '@/store/cart-state';
import { CART_TOTAL } from '@/styles/cart/cart-total';
import { MODAL } from '@/styles/modal';
import { ASTRONAUT_STYLE, MAIN_CONTAINER } from '@/styles/pages/underconstruction';
import { Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import FormPromoCode from '../forms/promo-code';
import Modal from '../modal';
import LoaderOverlay from '../overlay/loader-overlay';

export default class CartTotal extends BaseComponent {
  private totalPrice: number = 0;
  private totalDiscountPrice: number = 0;
  private discountCode: string | null = null;
  private productLoader: HTMLElement;
  private totalInfoContainer: HTMLElement;

  constructor() {
    super({
      tag: 'section',
      className: CART_TOTAL.CONTAINER,
    });

    this.updateInfo();

    this.productLoader = new LoaderOverlay({
      text: CART_TEXT.LOADING_TOTAL,
      className: CART_TOTAL.LOADER,
    }).getElement();

    this.totalInfoContainer = new ElementBuilder({
      tag: 'div',
      className: '',
    }).getElement();

    this.component.append(this.productLoader);
    this.createTotalInfo();

    this.render();
  }

  private static closeCart(): void {
    void APICart.deleteCart();
    Router.followRoute(Route.HOME);
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

  public updateView(parameters: { isLoading: boolean; success: boolean }): void {
    const { isLoading, success } = parameters;
    this.updateInfo();
    if (isLoading) {
      this.component.append(this.productLoader);
    } else if (success) {
      while (this.component.firstChild) {
        this.component.firstChild.remove();
      }

      while (this.totalInfoContainer.firstChild) {
        this.totalInfoContainer.firstChild.remove();
      }

      this.createTotalInfo();

      this.render();
    } else {
      while (this.totalInfoContainer.firstChild) {
        this.totalInfoContainer.firstChild.remove();
      }

      this.createTotalInfo();

      this.productLoader.remove();
    }
  }

  private updateInfo(): void {
    const cartInfo = cartState.getCartInfo();

    this.totalPrice = cartInfo?.totalPrice ?? 0;
    this.totalDiscountPrice = cartInfo?.totalDiscountPrice ?? 0;
    this.discountCode = cartInfo?.discountCode ?? null;
  }

  private createTotalInfo(): void {
    const productsPrice = CartTotal.createTotalItem(
      CART_TEXT.PRODUCTS_PRICE,
      `${(this.totalPrice + this.totalDiscountPrice).toFixed(2)} ${DEFAULT_CURRENCY}`,
      {
        isDotted: true,
        isAccent: false,
      }
    );
    const sale = CartTotal.createTotalItem(
      CART_TEXT.SALE,
      `${this.totalDiscountPrice.toFixed(2)} ${DEFAULT_CURRENCY}`,
      {
        isDotted: true,
        isAccent: false,
      }
    );

    this.totalInfoContainer.append(productsPrice, sale);

    if (this.discountCode) {
      const codeInfo = CartTotal.createTotalItem(
        CART_TEXT.PROMO_CODE_APPLY,
        `${this.discountCode}`,
        {
          isDotted: true,
          isAccent: false,
        }
      );

      this.totalInfoContainer.append(codeInfo);
    }

    const totalPrice = CartTotal.createTotalItem(
      CART_TEXT.TOTAL_PRICE,
      `${this.totalPrice.toFixed(2)} ${DEFAULT_CURRENCY}`,
      {
        isDotted: false,
        isAccent: true,
      }
    );

    this.totalInfoContainer.append(totalPrice);
  }

  private checkoutModal(): void {
    const content = new ElementBuilder({
      tag: 'div',
      className: MODAL.CONTENT.CHECKOUT_PAGE.CONTAINER,
    });

    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: MAIN_CONTAINER,
    }).getElement();

    const img = new ImageBuilder({
      className: ASTRONAUT_STYLE,
      source: macaronAstonaut,
      alt: 'astronaut macaron',
    }).getElement();

    imageContainer.append(img);

    const text = new ElementBuilder({
      tag: 'p',
      className: MODAL.CONTENT.CHECKOUT_PAGE.TITLE,
      textContent: CART_TEXT.MODAL_TEXT,
    }).getElement();

    const modal = new Modal({
      title: MODAL_TITLE.CHECKOUT_CART,
      content,
      className: MODAL.CART_COMPONENT,
      classNameTitle: MODAL.HEADER.CART_TITLE,
      callback: CartTotal.closeCart.bind(CartTotal),
    });

    const buttonFinish = new Button({
      style: 'PRICE_BUTTON',
      textContent: BTN_TEXT.FINISH_CART,
      callback: (): void => {
        modal.closeModal();
      },
    }).getElement();

    content.getElement().append(imageContainer, text, buttonFinish);

    this.component.append(modal.getElement());
    modal.showModal();
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h4',
      className: CART_TOTAL.TITLE,
      textContent: CART_TEXT.TOTAL_TITLE,
    }).getElement();

    const promo = new FormPromoCode(this.updateView.bind(this)).getElement();

    const checkoutButton = new Button({
      style: 'PRICE_BUTTON',
      textContent: BTN_TEXT.CHECKOUT,
      callback: (): void => {
        this.checkoutModal();
      },
    }).getElement();

    this.component.append(title, this.totalInfoContainer, promo, checkoutButton);
  }
}
