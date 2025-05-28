import BaseComponent from '@/components/base';
import { PRODUCT_ATTRIBUTES, PRODUCT_TEXT } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { TitleProduct } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

export default class ProductTitle extends BaseComponent {
  constructor(parameters: TitleProduct) {
    super({ tag: 'div', className: PRODUCT_STYLES.TITLE_CONTAINER });
    this.render(parameters);
  }

  protected render(parameters: TitleProduct): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: PRODUCT_STYLES.TITLE,
      textContent: parameters.title,
    }).getElement();

    const description = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
      textContent: parameters.description,
    }).getElement();

    const weightContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
    }).getElement();

    const weightName = new ElementBuilder({
      tag: 'span',
      className: PRODUCT_STYLES.PARAMETER_NAME,
      textContent: PRODUCT_ATTRIBUTES.WEIGHT,
    }).getElement();

    const weightValue = new ElementBuilder({
      tag: 'span',
      className: PRODUCT_STYLES.PARAMETER_DESCRIPTION,
      textContent: `${parameters.weight} ${PRODUCT_TEXT.GRAMM}`,
    }).getElement();

    weightContainer.append(weightName, weightValue);
    this.component.append(title, description, weightContainer);
  }
}
