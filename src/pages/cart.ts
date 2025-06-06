import '@/styles/main.css';

import APICart from '@/api/cart';
import BaseComponent from '@/components/base';
import CartList from '@/components/cart/cart-list';
import CartTotal from '@/components/cart/cart-total';
import { userState } from '@/store/user-state';
import { CART_PAGE } from '@/styles/pages/cart';

export default class CartPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: CART_PAGE.MAIN,
    });

    userState.subscribe(() => {
      void this.render.bind(this);
    });
    void this.render();
  }

  private async render(): Promise<void> {
    await APICart.getCart();

    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    const cartList = new CartList();
    const cartTotal = new CartTotal();

    this.component.append(cartList.getElement(), cartTotal.getElement());
  }
}
