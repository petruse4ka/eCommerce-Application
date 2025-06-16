import '@/styles/main.css';

import notFoundImage from '@/assets/images/not-found.svg';
import BaseComponent from '@/components/base';
import EmptyComponent from '@/components/base/empty';
import Button from '@/components/buttons';
import CartList from '@/components/cart/cart-list';
import CartTotal from '@/components/cart/cart-total';
import LoaderOverlay from '@/components/overlay/loader-overlay';
import { CART_TEXT } from '@/constants';
import Router from '@/router';
import { cartState } from '@/store/cart-state';
import { CART_TOTAL } from '@/styles/cart/cart-total';
import { CART_PAGE } from '@/styles/pages/cart';
import { CartStateKey, Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';

export default class CartPage extends BaseComponent {
  private container: HTMLElement;
  private cartTotal: CartTotal;
  private cartList: CartList;

  constructor() {
    super({
      tag: 'main',
      className: CART_PAGE.MAIN,
    });

    this.container = new ElementBuilder({
      tag: 'div',
      className: CART_PAGE.CONTAINER,
    }).getElement();

    this.cartTotal = new CartTotal();
    this.cartList = new CartList(
      this.cartTotal.updateView.bind(this.cartTotal),
      this.loading.bind(this)
    );

    cartState.subscribe(CartStateKey.UPDATE_CART_LINE, this.updateInfo.bind(this));

    this.render();
  }

  private loading(text: string): void {
    const loader = new LoaderOverlay({
      text,
      className: CART_TOTAL.LOADER,
    }).getElement();

    this.component.append(loader);
  }

  private updateInfo(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    this.render();
  }

  private render(): void {
    const total = cartState.getItemsCount();

    if (total) {
      this.cartList.updateInfo();
      this.cartTotal.updateView({ isLoading: false, success: true });
      this.container.append(this.cartList.getElement(), this.cartTotal.getElement());
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
