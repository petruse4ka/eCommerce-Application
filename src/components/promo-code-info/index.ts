import { PROMO_CODE_INFO } from '@/styles/promo-code-info';

import BaseComponent from '../base';

export default class PromoCodeInfo extends BaseComponent {
  constructor(textContent: string) {
    super({
      tag: 'section',
      className: PROMO_CODE_INFO,
      textContent,
    });
  }
}
