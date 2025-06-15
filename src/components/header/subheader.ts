import BaseComponent from '@/components/base';
import ButtonWithIcon from '@/components/buttons/button-with-icon';
import { SVG_ICONS } from '@/data';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import ElementBuilder from '@/utils/element-builder';

import AuthorizationMenu from './authorisation-menu';
import LanguageMenu from './language-menu';
import type MainMenu from './main-menu';
import Promo from './promo';

export default class SubHeader extends BaseComponent {
  private themeButton: ButtonWithIcon;
  private mainMenu: MainMenu;

  constructor(mainMenu: MainMenu) {
    super({
      tag: 'div',
      className: SUBHEADER_STYLES.SUBHEADER,
    });
    this.mainMenu = mainMenu;
    this.themeButton = SubHeader.createThemeSelector();
    this.render();
  }

  private static createThemeSelector(): ButtonWithIcon {
    return new ButtonWithIcon({
      style: 'SUBHEADER_ICON_OUTLINE',
      icon: {
        source: SVG_ICONS.THEME_SELECTOR_ICON,
        classNameIcon: SUBHEADER_STYLES.THEME_ICON,
      },
      textClassName: SUBHEADER_STYLES.THEME_TEXT,
      callback: (): void => {
        const savedTheme = localStorage.getItem('great-js-minds-ecommerce-theme');
        const isDark = savedTheme
          ? savedTheme === 'dark'
          : globalThis.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('great-js-minds-ecommerce-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('great-js-minds-ecommerce-theme', 'dark');
        }
      },
    });
  }

  protected render(): void {
    const subheaderContainer = new ElementBuilder({
      tag: 'div',
      className: SUBHEADER_STYLES.SUBHEADER_CONTAINER,
    }).getElement();

    const settingsContainer = new ElementBuilder({
      tag: 'div',
      className: SUBHEADER_STYLES.SETTINGS_CONTAINER,
    }).getElement();

    const promo = new Promo();
    const authorizationMenu = new AuthorizationMenu(this.mainMenu);
    const languageMenu = new LanguageMenu();

    settingsContainer.append(this.themeButton.getElement(), languageMenu.getElement());
    subheaderContainer.append(
      settingsContainer,
      promo.getElement(),
      authorizationMenu.getElement()
    );
    this.component.append(subheaderContainer);
  }
}
