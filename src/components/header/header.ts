import logo from '@/assets/logo/logo-main.png';
import { HEADER_STYLES } from '@/styles/header/header';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

import { BaseComponent } from '../base/component';

export default class Header extends BaseComponent {
  constructor() {
    super({ tag: 'header', className: HEADER_STYLES.HEADER });
    this.render();
  }

  protected render(): void {
    const headerContainer = new ElementBuilder({
      tag: 'div',
      className: HEADER_STYLES.HEADER_CONTAINER,
    }).getElement();

    const logoElement = new ImageBuilder({
      className: '',
      source: logo,
      alt: 'Logo of the Macaron Shop',
    }).getElement();

    headerContainer.append(logoElement);
    this.component.append(headerContainer);
  }
}
