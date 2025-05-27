import BaseComponent from '@/components/base';
import { DELIVERY_ITEMS } from '@/data';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import { PACKAGES_STYLES } from '@/styles/promo/packages';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ProductDelivery extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: PRODUCT_STYLES.DETAILED_CONTAINER,
    });
    this.render();
  }

  private render(): void {
    const list = new ElementBuilder({
      tag: 'div',
      className: PACKAGES_STYLES.LIST, //стили свои
    }).getElement();

    for (const item of DELIVERY_ITEMS) {
      const icon = new ImageBuilder({
        source: item.ICON,
        alt: 'Package icon',
        className: PACKAGES_STYLES.ICON,
      }).getElement();

      const description = new ElementBuilder({
        tag: 'p',
        className: PACKAGES_STYLES.CARD_TITLE,
        textContent: item.TEXT,
      }).getElement();

      list.append(icon, description);
    }

    this.component.append(list);
  }
}
