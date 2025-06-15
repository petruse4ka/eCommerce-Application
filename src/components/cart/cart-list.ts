import APICart from '@/api/cart';
import { BTN_TEXT, CART_TEXT } from '@/constants';
import { cartState } from '@/store/cart-state';
import { CART_LIST } from '@/styles/cart/cart-list';
import type { UpdateViewTotalCart } from '@/types/types';

import BaseComponent from '../base';
import Button from '../buttons';
import CartItem from './cart-item';

export default class CartList extends BaseComponent {
  private callback: UpdateViewTotalCart;
  private loading: (text: string) => void;

  constructor(callback: UpdateViewTotalCart, loading: (text: string) => void) {
    super({
      tag: 'section',
      className: CART_LIST.CONTAINER,
    });

    this.callback = (parameters: { isLoading: boolean; success: boolean }): void => {
      callback(parameters);
    };

    this.loading = loading;

    this.render();
  }

  public updateInfo(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    this.render();
  }

  private render(): void {
    const products = cartState.getCartInfo()?.lineItems;

    if (products) {
      for (const product of products) {
        const productNode = new CartItem(product, this.callback).getElement();

        this.component.append(productNode);
      }
    }

    const clearButton = new Button({
      style: 'CLEAR_CART',
      textContent: BTN_TEXT.CLEAR_CART,
      callback: async (): Promise<void> => {
        this.loading(CART_TEXT.LOADING_DELETE_CART);
        clearButton.disableButton();
        await APICart.deleteCart();
        clearButton.enableButton();
      },
    });

    this.component.append(clearButton.getElement());
  }
}
