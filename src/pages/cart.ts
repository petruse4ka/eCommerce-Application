import '@/styles/main.css';

import notFoundImage from '@/assets/images/not-found.svg';
import BaseComponent from '@/components/base';
import EmptyComponent from '@/components/base/empty';
import Button from '@/components/buttons';
import CartList from '@/components/cart/cart-list';
import CartTotal from '@/components/cart/cart-total';
import { CART_TEXT } from '@/constants';
import Router from '@/router';
import { cartState } from '@/store/cart-state';
import { userState } from '@/store/user-state';
import { CART_PAGE } from '@/styles/pages/cart';
import { Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';

export default class CartPage extends BaseComponent {
  private container: HTMLElement;
  constructor() {
    super({
      tag: 'main',
      className: CART_PAGE.MAIN,
    });

    this.container = new ElementBuilder({
      tag: 'div',
      className: CART_PAGE.CONTAINER,
    }).getElement();

    userState.subscribe(this.render.bind(this));

    cartState.subscribe(this.render.bind(this));

    this.render();
  }

  private render(): void {
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    const total = cartState.getItemsCount();

    if (total) {
      const cartList = new CartList();
      const cartTotal = new CartTotal();

      this.container.append(cartList.getElement(), cartTotal.getElement());
      this.component.append(this.container);
    } else {
      const emptyState = new EmptyComponent(
        CART_TEXT.EMPTY,
        notFoundImage,
        CART_PAGE.EMPTY_PRODUCT_CONTAINER,
        CART_PAGE.EMPTY_PRODUCT_IMAGE,
        CART_PAGE.EMPTY_PRODUCT_TEXT
      ).getElement();

      const returnButton = new Button({
        style: 'PRIMARY_PINK',
        textContent: CART_TEXT.CATALOG,
        callback: (): void => {
          Router.followRoute(Route.CATALOG);
        },
      }).getElement();

      emptyState.append(returnButton);
      this.component.append(emptyState);
    }
  }
}
