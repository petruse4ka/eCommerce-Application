import BaseComponent from '@/components/base';
import Router from '@/router';
import { cartState } from '@/store/cart-state';
import { HEADER_STYLES } from '@/styles/header/header';
import { Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import SVGBuilder from '@/utils/svg-builder';

export default class ShoppingCartIcon extends BaseComponent {
  private static readonly CART_ICON =
    'M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z';
  private itemsIndicator: HTMLElement;

  constructor() {
    super({ tag: 'div', className: HEADER_STYLES.CART_CONTAINER });

    this.itemsIndicator = new ElementBuilder({
      tag: 'div',
      className: HEADER_STYLES.CART_INDICATOR,
      textContent: String(cartState.getItemsCount()),
    }).getElement();

    this.component.addEventListener('click', () => {
      Router.followRoute(Route.CART);
    });

    cartState.subscribe(this.updateIndicator.bind(this));
    this.render();
  }

  public override remove(): void {
    cartState.unsubscribe(this.updateIndicator.bind(this));
    super.remove();
  }

  protected render(): void {
    const cartIcon = new SVGBuilder({
      source: ShoppingCartIcon.CART_ICON,
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
