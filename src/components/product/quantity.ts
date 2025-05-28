import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';

import Button from '../buttons';

export default class ProductQuantity extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: PRODUCT_STYLES.QUANTITY_BLOCK });

    this.render();
  }

  private render(): void {
    const minusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '-',
      callback: (): void => {},
    }).getElement();
    // minusButton.classList.remove('min-w-[234px]');

    const plusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '+',
      callback: (): void => {},
    }).getElement();

    const quantityInput = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.QUANTITY_INPUT,
      textContent: '1',
    }).getElement();

    this.component.append(minusButton, quantityInput, plusButton);
  }
}
