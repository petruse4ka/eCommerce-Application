import cart from '@/assets/icons/cart.svg';
import BaseComponent from '@/components/base';
import Router from '@/router';
import { HEADER_STYLES } from '@/styles/header/header';
import { Route } from '@/types/enums';
import ImageBuilder from '@/utils/image-builder';

export default class ShoppingCartIcon extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: '' });

    this.component.addEventListener('click', () => {
      Router.followRoute(Route.HOME);
    });

    this.render();
  }

  protected render(): void {
    const logoElement = new ImageBuilder({
      className: HEADER_STYLES.LOGO,
      source: cart,
      alt: 'Cart Icon',
    }).getElement();

    this.component.append(logoElement);
  }
}
