import cart from '@/assets/icons/basket.svg';
import BaseComponent from '@/components/base';
import Router from '@/router';
import { cartState } from '@/store/cart-state';
import { HEADER_STYLES } from '@/styles/header/header';
import { Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ShoppingCartIcon extends BaseComponent {
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

    cartState.subscribe('itemsCount', this.updateIndicator.bind(this));
    this.render();
  }

  public override remove(): void {
    cartState.unsubscribe('itemsCount', this.updateIndicator.bind(this));
    super.remove();
  }

  protected render(): void {
    const cartIcon = new ImageBuilder({
      className: HEADER_STYLES.CART_ICON,
      source: cart,
      alt: 'Cart Icon',
    }).getElement();

    this.component.append(cartIcon, this.itemsIndicator);
  }

  private updateIndicator(): void {
    this.itemsIndicator.textContent = String(cartState.getItemsCount());
  }
}
