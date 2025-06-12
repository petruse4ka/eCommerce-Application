import APICart from '@/api/cart';
import { BTN_TEXT } from '@/constants';
import { cartState } from '@/store/cart-state';
import { CART_LIST } from '@/styles/cart/cart-list';

import BaseComponent from '../base';
import Button from '../buttons';
import CartItem from './cart-item';

export default class CartList extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: CART_LIST.CONTAINER,
    });

    this.render();
  }

  private render(): void {
    const products = cartState.getCartInfo()?.lineItems;

    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    if (products) {
      for (const product of products) {
        const productNode = new CartItem(product).getElement();

        this.component.append(productNode);
      }
    }

    const clearButton = new Button({
      style: 'CLEAR_CART',
      textContent: BTN_TEXT.CLEAR_CART,
      callback: (): void => {
        void APICart.deleteCart();
      },
    }).getElement();

    this.component.append(clearButton);
  }
}
