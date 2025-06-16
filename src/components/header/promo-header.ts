import BaseComponent from '@/components/base';
import { PROMO_HEADER_TEXT } from '@/constants';
import { PROMO_HEADER_STYLES } from '@/styles/header/promo-header';
import ElementBuilder from '@/utils/element-builder';

export default class PromoHeader extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: PROMO_HEADER_STYLES.PROMO_HEADER,
    });
    this.render();
  }

  private static createPromoCode(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: PROMO_HEADER_STYLES.PROMO_CODE,
      textContent: PROMO_HEADER_TEXT,
    }).getElement();
  }

  protected render(): void {
    const promoHeaderContainer = new ElementBuilder({
      tag: 'div',
      className: PROMO_HEADER_STYLES.PROMO_HEADER_CONTAINER,
    }).getElement();

    const promoCode = PromoHeader.createPromoCode();

    promoHeaderContainer.append(promoCode);
    this.component.append(promoHeaderContainer);
  }
}
