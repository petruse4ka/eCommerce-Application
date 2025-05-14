import { BaseComponent } from '@/components/base/component';
import { FOOTER_PROMO_ITEMS } from '@/data';
import { FOOTER_STYLES } from '@/styles/footer';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export default class Promo extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: FOOTER_STYLES.PROMO });
    this.render();
  }

  protected render(): void {
    for (const item of FOOTER_PROMO_ITEMS) {
      const promoItem = new ElementBuilder({
        tag: 'div',
        className: FOOTER_STYLES.PROMO_ITEM,
      }).getElement();

      const icon = new ImageBuilder({
        source: item.icon,
        alt: item.text,
        className: FOOTER_STYLES.PROMO_ICON,
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
