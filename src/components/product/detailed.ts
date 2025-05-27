import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';

export default class DetailedProduct extends BaseComponent {
  constructor(content: string) {
    super({
      tag: 'section',
      className: PRODUCT_STYLES.DETAILED_CONTAINER,
    });
    this.render(content);
  }

  private render(_content: string): void {
    const name = new ElementBuilder({
      tag: 'h3',
      className: PRODUCT_STYLES.PARAMETER_NAME,
      textContent: 'Описание',
    }).getElement();

    const description = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
      textContent: _content,
    }).getElement();

    this.component.append(name, description);
  }
}
