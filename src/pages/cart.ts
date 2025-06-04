import '@/styles/main.css';

import BaseComponent from '@/components/base';
import CartItem from '@/components/cart/cart-item';
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
    const cartItem = new CartItem();
    this.component.append(cartItem.getElement());
  }
}
