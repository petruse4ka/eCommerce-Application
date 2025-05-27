import BaseComponent from '@/components/base';
import { DELIVERY_ITEMS } from '@/data';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ProductDelivery extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: PRODUCT_STYLES.DELIVERY_CONTAINER,
    });
    this.render();
  }

  private render(): void {
    for (const item of DELIVERY_ITEMS) {
      const list = new ElementBuilder({
        tag: 'div',
        className: PRODUCT_STYLES.DELIVERY_ITEM,
      }).getElement();

      const icon = new ImageBuilder({
        source: item.ICON,
        alt: 'delivery icon',
        className: '',
      }).getElement();

      const description = new ElementBuilder({
        tag: 'p',
        className: PRODUCT_STYLES.DELIVERY_DESCRIPTION,
        textContent: item.TEXT,
      }).getElement();

      list.append(icon, description);
      this.component.append(list);
    }
  }
}
