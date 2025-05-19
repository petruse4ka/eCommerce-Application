import BaseComponent from '@/components/base';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import ElementBuilder from '@/utils/element-builder';

import AuthorizationMenu from './authorisation-menu';
import Promo from './promo';

export default class SubHeader extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: SUBHEADER_STYLES.SUBHEADER,
    });
    this.render();
  }

  protected render(): void {
    const subheaderContainer = new ElementBuilder({
      tag: 'div',
      className: SUBHEADER_STYLES.SUBHEADER_CONTAINER,
    }).getElement();

    const promo = new Promo();
    const authorizationMenu = new AuthorizationMenu();

    subheaderContainer.append(promo.getElement(), authorizationMenu.getElement());
    this.component.append(subheaderContainer);
  }
}
