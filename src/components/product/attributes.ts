import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';

export default class ProductAttributes extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: PRODUCT_STYLES.TITLE_CONTAINER });
    this.render();
  }

  protected render(): void {
    const flavors = new ElementBuilder({
      tag: 'h2',
      className: PRODUCT_STYLES.TITLE,
      textContent: 'Вкусы:',
    }).getElement();

    const flavorsDescription = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
      textContent: 'Перечень вкусов',
    }).getElement();

    const diet = new ElementBuilder({
      tag: 'h2',
      className: PRODUCT_STYLES.TITLE,
      textContent: 'Диета:',
    }).getElement();

    const dietDescription = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
      textContent: 'Перечень ограничений по диете',
    }).getElement();
    this.component.append(flavors, flavorsDescription, diet, dietDescription);
  }
}
