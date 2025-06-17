import APICart from '@/api/cart';
import { BTN_TEXT, CART_TEXT, DROPDOWN_OPTIONS, MODAL_TITLE } from '@/constants';
import { cartState } from '@/store/cart-state';
import { CART_LIST } from '@/styles/cart/cart-list';
import { MODAL } from '@/styles/modal';
import type { UpdateViewTotalCart } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import Modal from '../modal';
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

  private clearApprove(): void {
    const content = new ElementBuilder({
      tag: 'div',
      className: MODAL.CONTENT.APPROVE_CLEAR_CART,
    });

    const buttonApprove = new Button({
      style: 'PRICE_BUTTON',
      textContent: DROPDOWN_OPTIONS.TRUE,
      callback: async (): Promise<void> => {
        modal.closeModal();
        this.loading(CART_TEXT.LOADING_DELETE_CART);
        await APICart.deleteCart();
      },
    }).getElement();

    const buttonCancel = new Button({
      style: 'SECONDARY_PRICE_BUTTON',
      textContent: DROPDOWN_OPTIONS.FALSE,
      callback: (): void => {
        modal.closeModal();
      },
    }).getElement();

    content.getElement().append(buttonApprove, buttonCancel);

    const modal = new Modal({
      title: MODAL_TITLE.APPROVE_CLEAR_CART,
      content,
    });

    this.component.append(modal.getElement());
    modal.showModal();
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
      callback: (): void => {
        this.clearApprove();
      },
    });

    this.component.append(clearButton.getElement());
  }
}
