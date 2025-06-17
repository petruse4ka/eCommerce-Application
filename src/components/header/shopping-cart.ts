import BaseComponent from '@/components/base';
import { SVG_ICONS } from '@/data';
import Router from '@/router';
import { cartState } from '@/store/cart-state';
import { HEADER_STYLES } from '@/styles/header/header';
import { CartStateKey, Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import SVGBuilder from '@/utils/svg-builder';

import type MainMenu from './main-menu';

export default class ShoppingCartIcon extends BaseComponent {
  private itemsIndicator: HTMLElement;
  private mainMenu: MainMenu;

  constructor(mainMenu: MainMenu) {
    super({ tag: 'div', className: HEADER_STYLES.CART_CONTAINER });
    this.mainMenu = mainMenu;

    this.itemsIndicator = new ElementBuilder({
      tag: 'div',
      className: HEADER_STYLES.CART_INDICATOR,
      textContent: String(cartState.getItemsCount()),
    }).getElement();

    this.component.addEventListener('click', () => {
      this.mainMenu.closeBurgerMenu();
      Router.followRoute(Route.CART);
    });

    cartState.subscribe(CartStateKey.ITEMS_COUNT, this.updateIndicator.bind(this));
    this.render();
  }

  public override remove(): void {
    cartState.unsubscribe(CartStateKey.ITEMS_COUNT, this.updateIndicator.bind(this));
    super.remove();
  }

  protected render(): void {
    const cartIcon = new SVGBuilder({
      source: SVG_ICONS.CART_ICON,
      className: [],
      classNameIcon: HEADER_STYLES.CART_ICON,
      viewBox: '0 0 24 24',
      iconSize: 40,
    }).getElement();

    this.component.append(cartIcon, this.itemsIndicator);
  }

  private updateIndicator(): void {
    this.itemsIndicator.textContent = String(cartState.getItemsCount());
  }
}
