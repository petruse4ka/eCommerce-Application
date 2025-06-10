import '@/styles/main.css';

import BaseComponent from '@/components/base';
import Guarantees from '@/components/promo/guarantees';
import Intro from '@/components/promo/intro';
import Packages from '@/components/promo/packages';
import PromoCodeInfo from '@/components/promo-code-info';
import { PROMO_CODE_TEXT } from '@/constants';
import { CONTAINER, MAIN_CONTAINER } from '@/styles/pages/homepage';
import ElementBuilder from '@/utils/element-builder';

export default class HomePage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: CONTAINER,
    });
    this.render();
  }

  private render(): void {
    const mainContainer = new ElementBuilder({
      tag: 'div',
      className: MAIN_CONTAINER,
    }).getElement();

    const intro = new Intro();
    const packages = new Packages();
    const promoCodeInfo = new PromoCodeInfo(PROMO_CODE_TEXT);
    const guarantees = new Guarantees();
    mainContainer.append(
      intro.getElement(),
      packages.getElement(),
      promoCodeInfo.getElement(),
      guarantees.getElement()
    );
    this.component.append(mainContainer);
  }
}
