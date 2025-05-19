import BaseComponent from '@/components/base';
import { MENU_ITEMS } from '@/constants';
import Router from '@/router/index.';
import { HEADER_STYLES } from '@/styles/header/header';
import ElementBuilder from '@/utils/element-builder';

export default class MainMenu extends BaseComponent {
  constructor() {
    super({ tag: 'nav', className: HEADER_STYLES.MAIN_MENU });
    this.render();
  }

  protected render(): void {
    for (const item of MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'span',
        className: HEADER_STYLES.MENU_ITEM,
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        Router.followRoute(item.route);
      });

      this.component.append(menuItem);
    }
  }
}
