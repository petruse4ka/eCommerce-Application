import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';

export default class ProductDelivery extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: PRODUCT_STYLES.DETAILED_CONTAINER,
    });
    this.render();
  }

  private render(): void {
    const name = new ElementBuilder({
      tag: 'h3',
      className: PRODUCT_STYLES.PARAMETER_NAME,
      textContent: 'Описание',
    }).getElement();

    const description = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
    }).getElement();

    this.component.append(name, description);
  }
}
