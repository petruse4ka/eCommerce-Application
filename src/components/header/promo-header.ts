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

  private static createStarsContainer(position: 'left' | 'right'): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: [
        ...PROMO_HEADER_STYLES.STARS_CONTAINER,
        ...(position === 'left' ? PROMO_HEADER_STYLES.STARS_LEFT : PROMO_HEADER_STYLES.STARS_RIGHT),
      ],
    }).getElement();
  }

  protected render(): void {
    const promoHeaderContainer = new ElementBuilder({
      tag: 'div',
      className: [...PROMO_HEADER_STYLES.PROMO_HEADER_CONTAINER, 'relative'],
    }).getElement();

    const promoCode = PromoHeader.createPromoCode();
    const leftStars = PromoHeader.createStarsContainer('left');
    const rightStars = PromoHeader.createStarsContainer('right');

    promoHeaderContainer.append(leftStars, promoCode, rightStars);
    this.component.append(promoHeaderContainer);
  }
}
