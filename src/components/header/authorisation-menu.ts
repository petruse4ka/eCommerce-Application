import { BaseComponent } from '@/components/base/component';
import { AUTHORIZATION_MENU_TEXT } from '@/constants/constants';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import { ElementBuilder } from '@/utils/element-builder';

export default class AuthorizationMenu extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: SUBHEADER_STYLES.AUTHORIZATION_MENU });
    this.render();
  }

  protected render(): void {
    const loginItem = new ElementBuilder({
      tag: 'span',
      className: SUBHEADER_STYLES.AUTHORIZATION_ITEM,
      textContent: AUTHORIZATION_MENU_TEXT.LOGIN,
    }).getElement();

    const registrationItem = new ElementBuilder({
      tag: 'span',
      className: SUBHEADER_STYLES.AUTHORIZATION_ITEM,
      textContent: AUTHORIZATION_MENU_TEXT.REGISTRATION,
    }).getElement();

    this.component.append(loginItem, registrationItem);
  }
}
