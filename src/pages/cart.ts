import '@/styles/main.css';

import APICart from '@/api/cart';
import BaseComponent from '@/components/base';
import CartList from '@/components/cart/cart-list';
import CartTotal from '@/components/cart/cart-total';
import { userState } from '@/store/user-state';
import { CART_PAGE } from '@/styles/pages/cart';
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

    userState.subscribe(() => {
      void this.render.bind(this);
    });
    void this.render();

    this.component.append(this.container);
  }

  private async render(): Promise<void> {
    await APICart.getCart();

    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    const cartList = new CartList();
    const cartTotal = new CartTotal();

    this.container.append(cartList.getElement(), cartTotal.getElement());
  }
}
