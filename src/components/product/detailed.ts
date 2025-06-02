import BaseComponent from '@/components/base';
import { PRODUCT_TEXT } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';

export default class DetailedProduct extends BaseComponent {
  constructor(content: string) {
    super({
      tag: 'section',
      className: PRODUCT_STYLES.DETAILED_CONTAINER,
    });

    const paragraphes = content.split(/\\n/g);
    this.render(paragraphes);
  }

  private render(paragraphes: string[]): void {
    const name = new ElementBuilder({
      tag: 'h3',
      className: PRODUCT_STYLES.DETAILED_NAME,
      textContent: PRODUCT_TEXT.DESCRIPTION,
    }).getElement();

    const description = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
    }).getElement();

    for (const item of paragraphes) {
      const paragraph = new ElementBuilder({
        tag: 'p',
        className: '',
        textContent: item,
      }).getElement();

      description.append(paragraph);
    }

    this.component.append(name, description);
  }
}
