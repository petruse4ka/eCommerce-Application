import {
  PROMO_CODE_INFO_GRADIENT,
  STARS_CONTAINER,
  TEXT_CONTAINER,
} from '@/styles/promo-code-info';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';

export default class PromoCodeInfo extends BaseComponent {
  constructor(textContent: string) {
    super({
      tag: 'section',
      className: PROMO_CODE_INFO_GRADIENT,
    });

    const starsContainer = new ElementBuilder({
      tag: 'div',
      className: STARS_CONTAINER,
    }).getElement();

    const textContainer = new ElementBuilder({
      tag: 'div',
      className: TEXT_CONTAINER,
      textContent,
    }).getElement();

    this.component.append(starsContainer, textContainer);
  }
}
