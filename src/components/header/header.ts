import { BaseComponent } from '@/components/base/component';
import { HEADER_STYLES } from '@/styles/header/header';
import { ElementBuilder } from '@/utils/element-builder';

import Logo from './logo';
import MainMenu from './main-menu';
import SubHeader from './subheader';

export default class Header extends BaseComponent {
  private subHeader: SubHeader;

  constructor() {
    super({
      tag: 'header',
      className: HEADER_STYLES.HEADER,
    });
    this.subHeader = new SubHeader();
    this.render();
  }

  protected render(): void {
    const headerContainer = new ElementBuilder({
      tag: 'div',
      className: HEADER_STYLES.HEADER_CONTAINER,
    }).getElement();

    const logo = new Logo();
    const mainMenu = new MainMenu();

    headerContainer.append(logo.getElement(), mainMenu.getElement());
    this.component.append(this.subHeader.getElement(), headerContainer);
  }
}
