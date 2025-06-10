import themeSelectorIcon from 'src/assets/icons/theme-light.svg';

import BaseComponent from '@/components/base';
import ButtonWithIcon from '@/components/buttons/button-with-icon';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import ElementBuilder from '@/utils/element-builder';

import AuthorizationMenu from './authorisation-menu';
import Promo from './promo';

export default class SubHeader extends BaseComponent {
  private themeButton: ButtonWithIcon;

  constructor() {
    super({
      tag: 'div',
      className: SUBHEADER_STYLES.SUBHEADER,
    });
    this.themeButton = SubHeader.createThemeSelector();
    this.render();
  }

  private static createThemeSelector(): ButtonWithIcon {
    return new ButtonWithIcon({
      style: 'SUBHEADER_ICON_OUTLINE',
      icon: {
        source: themeSelectorIcon,
        alt: 'Theme selector icon',
        className: SUBHEADER_STYLES.THEME_ICON,
      },
      textClassName: SUBHEADER_STYLES.THEME_TEXT,
      callback: (): void => {
        const isDark = document.documentElement.classList.contains('dark');

        if (isDark) {
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
        }

        localStorage.setItem('great-js-minds-ecommerce-theme', isDark ? 'light' : 'dark');
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
    const authorizationMenu = new AuthorizationMenu();

    settingsContainer.append(this.themeButton.getElement());
    subheaderContainer.append(
      settingsContainer,
      promo.getElement(),
      authorizationMenu.getElement()
    );
    this.component.append(subheaderContainer);
  }
}
