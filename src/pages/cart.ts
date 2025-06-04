import '@/styles/main.css';

import BaseComponent from '@/components/base';
import CartList from '@/components/cart/cart-list';
import CartTotal from '@/components/cart/cart-total';
import { CART_PAGE } from '@/styles/pages/cart';

export default class CartPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: CART_PAGE.MAIN,
    });
    this.render();
  }

  private render(): void {
    const cartItem = new CartList();
    const cartTotal = new CartTotal();

    this.component.append(cartItem.getElement(), cartTotal.getElement());
  }
}
