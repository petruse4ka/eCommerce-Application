import BaseComponent from '@/components/base';
import { PRODUCT_ATTRIBUTES } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Attributes } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';

export default class ProductAttributes extends BaseComponent {
  constructor(parameters: Attributes) {
    super({ tag: 'div', className: PRODUCT_STYLES.TITLE_CONTAINER });
    this.render(parameters);
  }

  protected render(parameters: Attributes): void {
    Object.entries(PRODUCT_ATTRIBUTES).map((title: [string, string]): void =>
      this.addAttributeItem(title, parameters)
    );
  }

  private addAttributeItem(title: [string, string], parameters: Attributes): void {
    const value = parameters[title[0].toLowerCase()] ?? '';
    if (value === '') return;
    const container = new ElementBuilder({
      tag: 'div',
      className: '',
    }).getElement();

    const attribute = new ElementBuilder({
      tag: 'h3',
      className: PRODUCT_STYLES.PARAMETER_NAME,
      textContent: `${title[1]}: `,
    }).getElement();
    container.append(attribute);

    const attributeDescription = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
      textContent: String(value),
    }).getElement();

    container.append(attributeDescription);
    this.component.append(container);
  }
}
