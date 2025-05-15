import { BaseComponent } from '@/components/base/component';
import { AUTHORIZATION_MENU_ITEMS } from '@/constants/constants';
import { Router } from '@/router/router';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import { ElementBuilder } from '@/utils/element-builder';

export default class AuthorizationMenu extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: SUBHEADER_STYLES.AUTHORIZATION_MENU });
    this.render();
  }

  protected render(): void {
    for (const item of AUTHORIZATION_MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'span',
        className: SUBHEADER_STYLES.AUTHORIZATION_ITEM,
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        Router.followRoute(item.route);
      });

      this.component.append(menuItem);
    }
  }
}
