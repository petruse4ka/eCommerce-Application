import Alert from '@/components/alert';
import BaseComponent from '@/components/base';
import {
  AUTHORIZATION_MENU_ITEMS,
  AUTHORIZATION_MENU_TEXT,
  UNAUTHORIZED_MENU_ITEMS,
} from '@/constants';
import Router from '@/router';
import { userState } from '@/store/user-state';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import { AlertStatus, AlertText } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';

export default class AuthorizationMenu extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: SUBHEADER_STYLES.AUTHORIZATION_MENU });
    userState.subscribe(this.updateMenu.bind(this));
    this.render();
  }

  public override remove(): void {
    userState.unsubscribe(this.updateMenu.bind(this));
    super.remove();
  }

  protected render(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    if (userState.getAuthorizationState()) {
      this.createAuthorizedMenu();
    } else {
      this.createUnauthorizedMenu();
    }
  }

  private updateMenu(): void {
    this.render();
  }

  private createUnauthorizedMenu(): void {
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

  private createAuthorizedMenu(): void {
    for (const item of UNAUTHORIZED_MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'span',
        className: SUBHEADER_STYLES.AUTHORIZATION_ITEM,
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        if (item.name === AUTHORIZATION_MENU_TEXT.LOGOUT) {
          userState.setAuthorizationState(false);
          Alert.render({
            textContent: AlertText.LOGOUT_SUCCESS,
            status: AlertStatus.SUCCESS,
            visibleTime: 3000,
          });
        }
        Router.followRoute(item.route);
      });

      this.component.append(menuItem);
    }
  }
}
