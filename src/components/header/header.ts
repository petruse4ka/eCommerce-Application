import BaseComponent from '@/components/base';
import { HEADER_STYLES } from '@/styles/header/header';
import ElementBuilder from '@/utils/element-builder';

import Logo from './logo';
import MainMenu from './main-menu';
import PromoHeader from './promo-header';
import ShoppingCartIcon from './shopping-cart';
import SubHeader from './subheader';

export default class Header extends BaseComponent {
  private subHeader: SubHeader;
  private mainMenu: MainMenu;

  constructor() {
    super({
      tag: 'header',
      className: HEADER_STYLES.HEADER,
    });
    this.mainMenu = new MainMenu();
    this.subHeader = new SubHeader(this.mainMenu);
    this.render();
  }

  protected render(): void {
    const promoHeader = new PromoHeader();
    const headerContainer = new ElementBuilder({
      tag: 'div',
      className: HEADER_STYLES.HEADER_CONTAINER,
    }).getElement();

    const logo = new Logo(this.mainMenu);
    const shoppingCart = new ShoppingCartIcon(this.mainMenu);

    headerContainer.append(
      logo.getElement(),
      this.mainMenu.getElement(),
      shoppingCart.getElement()
    );
    this.component.append(promoHeader.getElement(), this.subHeader.getElement(), headerContainer);
  }
}
