import bestPriceIcon from '@/assets/icons/best-price.png';
import fastDeliveryIcon from '@/assets/icons/fast-delivery.png';
import freshProductsIcon from '@/assets/icons/fresh-products.png';
import { BaseComponent } from '@/components/base/component';
import { SUBHEADER_PROMO_TEXT } from '@/constants/constants';
import { SUBHEADER_STYLES } from '@/styles/header/subheader';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class Promo extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: SUBHEADER_STYLES.PROMO });
    this.render();
  }

  protected render(): void {
    const promoItems = [
      { icon: fastDeliveryIcon, text: SUBHEADER_PROMO_TEXT.DELIVERY },
      { icon: freshProductsIcon, text: SUBHEADER_PROMO_TEXT.FRESH },
      { icon: bestPriceIcon, text: SUBHEADER_PROMO_TEXT.PRICE },
    ];

    for (const item of promoItems) {
      const promoItem = new ElementBuilder({
        tag: 'div',
        className: SUBHEADER_STYLES.PROMO_ITEM,
      }).getElement();

      const icon = new ImageBuilder({
        source: item.icon,
        alt: item.text,
        className: SUBHEADER_STYLES.PROMO_ICON,
      }).getElement();

      const text = new ElementBuilder({
        tag: 'span',
        className: '',
        textContent: item.text,
      }).getElement();

      promoItem.append(icon, text);
      this.component.append(promoItem);
    }
  }
}
