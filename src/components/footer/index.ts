import { BaseComponent } from '@/components/base/component';
import { FOOTER_STYLES } from '@/styles/footer';
import { ElementBuilder } from '@/utils/element-builder';

import Promo from './promo';

export default class Footer extends BaseComponent {
  constructor() {
    super({
      tag: 'footer',
      className: FOOTER_STYLES.FOOTER,
    });
    this.render();
  }

  protected render(): void {
    const footerContainer = new ElementBuilder({
      tag: 'div',
      className: FOOTER_STYLES.FOOTER_CONTAINER,
    }).getElement();

    const promo = new Promo();

    footerContainer.append(promo.getElement());

    this.component.append(footerContainer);
  }
}
