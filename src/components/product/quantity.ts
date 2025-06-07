import BaseComponent from '@/components/base';
import { DEFAULT_QUANTITY_AMOUNT, PRODUCT_TEXT } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { ProductQuantityParameters } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import Button from '../buttons';

export default class ProductQuantity extends BaseComponent {
  private count: number;
  private callback: ((count: number) => void) | undefined;

  constructor(parameters: ProductQuantityParameters) {
    super({ tag: 'div', className: PRODUCT_STYLES.QUANTITY_BLOCK });

    this.callback = parameters.callback;

    this.count = parameters.count;
    this.render(parameters.price, parameters.element, parameters.text);
  }

  private render(price: number, element: HTMLElement, text: string): void {
    const minusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '-',
      callback: (): void => {
        if (this.count > DEFAULT_QUANTITY_AMOUNT) {
          quantityInput.textContent = String(--this.count);
          element.textContent = `${text} ${String(price * this.count)} ${PRODUCT_TEXT.CURRENCY}`;
        }
        if (this.count === DEFAULT_QUANTITY_AMOUNT) {
          minusButton.setAttribute('disabled', 'true');
        }

        if (this.callback) {
          this.callback(this.count);
        }
      },
    }).getElement();

    const plusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '+',
      callback: (): void => {
        quantityInput.textContent = String(++this.count);
        if (this.count > DEFAULT_QUANTITY_AMOUNT) {
          minusButton.removeAttribute('disabled');
        }
        element.textContent = `${text} ${String(price * this.count)} ${PRODUCT_TEXT.CURRENCY}`;

        if (this.callback) {
          this.callback(this.count);
        }
      },
    }).getElement();

    const quantityInput = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.QUANTITY_INPUT,
      textContent: String(this.count),
    }).getElement();

    element.textContent = `${text} ${String(price * this.count)} ${PRODUCT_TEXT.CURRENCY}`;
    this.component.append(minusButton, quantityInput, plusButton);
  }
}
