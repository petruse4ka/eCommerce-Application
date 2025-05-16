import { BaseComponent } from '@/components/base/component';
import { FOOTER_MENU_ITEMS, FOOTER_TEXTS } from '@/constants/constants';
import { Router } from '@/router/router';
import { FOOTER_STYLES } from '@/styles/footer';
import { ElementBuilder } from '@/utils/element-builder';

export default class Menu extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: FOOTER_STYLES.MENU });
    this.render();
  }

  protected render(): void {
    const title = new ElementBuilder({
      tag: 'h3',
      className: FOOTER_STYLES.TITLE,
      textContent: FOOTER_TEXTS.MENU_TITLE,
    }).getElement();

    this.component.append(title);

    const menuList = new ElementBuilder({
      tag: 'ul',
      className: FOOTER_STYLES.MENU_LIST,
    }).getElement();

    for (const item of FOOTER_MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'li',
        className: FOOTER_STYLES.MENU_ITEM,
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        Router.followRoute(item.route);
      });

      menuList.append(menuItem);
    }

    this.component.append(menuList);
  }
}
