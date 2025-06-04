import BaseComponent from '@/components/base';
import { HEADER_STYLES } from '@/styles/header/header';
import ElementBuilder from '@/utils/element-builder';

import Logo from './logo';
import MainMenu from './main-menu';
import ShoppingCartIcon from './shopping-cart';
import SubHeader from './subheader';

export default class Header extends BaseComponent {
  private subHeader: SubHeader;

  constructor() {
    super({
      tag: 'header',
      className: HEADER_STYLES.HEADER,
    });
    this.subHeader = new SubHeader();
    this.render();
  }

  protected render(): void {
    const headerContainer = new ElementBuilder({
      tag: 'div',
      className: HEADER_STYLES.HEADER_CONTAINER,
    }).getElement();

    const logo = new Logo();
    const mainMenu = new MainMenu();
    const shoppingCart = new ShoppingCartIcon();

    headerContainer.append(logo.getElement(), mainMenu.getElement(), shoppingCart.getElement());
    this.component.append(this.subHeader.getElement(), headerContainer);
  }
}
