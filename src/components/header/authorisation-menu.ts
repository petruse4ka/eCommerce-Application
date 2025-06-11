import API from '@/api';
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
import SVGBuilder from '@/utils/svg-builder';

export default class AuthorizationMenu extends BaseComponent {
  private static readonly ACCOUNT_ICON =
    'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z';
  private static readonly LOGIN_ICON =
    'M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z';
  private static readonly LOGOUT_ICON =
    'M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z';
  private static readonly REGISTER_ICON =
    'M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z';

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
        tag: 'div',
        className: SUBHEADER_STYLES.AUTHORIZATION_ITEM,
      }).getElement();

      const icon = new SVGBuilder({
        source:
          item.name === AUTHORIZATION_MENU_TEXT.LOGIN
            ? AuthorizationMenu.LOGIN_ICON
            : AuthorizationMenu.REGISTER_ICON,
        className: [],
        classNameIcon: SUBHEADER_STYLES.AUTHORIZATION_ITEM_ICON,
      }).getElement();

      const text = new ElementBuilder({
        tag: 'span',
        className: SUBHEADER_STYLES.AUTHORIZATION_ITEM_TEXT,
        textContent: item.name,
      }).getElement();

      menuItem.append(icon, text);

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
      }).getElement();

      const icon = new SVGBuilder({
        source:
          item.name === AUTHORIZATION_MENU_TEXT.LOGOUT
            ? AuthorizationMenu.LOGOUT_ICON
            : AuthorizationMenu.ACCOUNT_ICON,
        className: [],
        classNameIcon: SUBHEADER_STYLES.AUTHORIZATION_ITEM_ICON,
      }).getElement();

      const text = new ElementBuilder({
        tag: 'span',
        className: SUBHEADER_STYLES.AUTHORIZATION_ITEM_TEXT,
        textContent: item.name,
      }).getElement();

      menuItem.append(icon, text);

      menuItem.addEventListener('click', () => {
        if (item.name === AUTHORIZATION_MENU_TEXT.LOGOUT) {
          userState.setAuthorizationState(false);
          void API.authentication();
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
