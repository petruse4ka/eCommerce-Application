import BaseComponent from '@/components/base';
import { DEFAULT_QUANTITY_AMOUNT, PRODUCT_TEXT } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';

import Button from '../buttons';

export default class ProductQuantity extends BaseComponent {
  constructor(price: number, element: HTMLElement) {
    super({ tag: 'div', className: PRODUCT_STYLES.QUANTITY_BLOCK });

    this.render(price, element);
  }

  private render(price: number, element: HTMLElement): void {
    const minusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '-',
      callback: (): void => {
        let number = Number(quantityInput.textContent);
        if (number <= DEFAULT_QUANTITY_AMOUNT) {
          minusButton.setAttribute('disabled', 'true');
        } else {
          quantityInput.textContent = String(--number);
          element.textContent = `${PRODUCT_TEXT.TOTAL} ${String(price * number)} ${PRODUCT_TEXT.CURRANCY}`;
        }
      },
    }).getElement();

    const plusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '+',
      callback: (): void => {
        let number = Number(quantityInput.textContent);
        ++number;
        if (minusButton.hasAttribute('disabled')) {
          minusButton.removeAttribute('disabled');
        } else {
          quantityInput.textContent = String(number);
        }
        element.textContent = `${PRODUCT_TEXT.TOTAL} ${String(price * number)} ${PRODUCT_TEXT.CURRANCY}`;
      },
    }).getElement();

    const quantityInput = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.QUANTITY_INPUT,
      textContent: String(DEFAULT_QUANTITY_AMOUNT),
    }).getElement();

    this.component.append(minusButton, quantityInput, plusButton);
  }
}
