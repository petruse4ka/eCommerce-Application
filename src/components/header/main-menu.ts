import BaseComponent from '@/components/base';
import { MENU_ITEMS } from '@/constants';
import Router from '@/router';
import { HEADER_STYLES } from '@/styles/header/header';
import ElementBuilder from '@/utils/element-builder';

export default class MainMenu extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: HEADER_STYLES.MAIN_MENU });
    this.render();
  }

  protected render(): void {
    const nav = new ElementBuilder({
      tag: 'nav',
      className: HEADER_STYLES.MENU_NAV,
    }).getElement();

    for (const item of MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'span',
        className: HEADER_STYLES.MENU_ITEM,
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        Router.followRoute(item.route);
      });

      nav.append(menuItem);
    }

    const burgerButton = new ElementBuilder({
      tag: 'button',
      className: HEADER_STYLES.BURGER_BUTTON,
    }).getElement();

    const burgerIconTop = new ElementBuilder({
      tag: 'span',
      className: HEADER_STYLES.BURGER_ICON_TOP,
    }).getElement();

    const burgerIconTBottom = new ElementBuilder({
      tag: 'span',
      className: HEADER_STYLES.BURGER_ICON_BOTTOM,
    }).getElement();

    burgerButton.append(burgerIconTop, burgerIconTBottom);

    this.component.append(nav, burgerButton);
  }
}
