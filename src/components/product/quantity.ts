import BaseComponent from '@/components/base';
import { DEFAULT_QUANTITY_AMOUNT, PRODUCT_TEXT } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { ProductQuantityParameters } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import Button from '../buttons';

export default class ProductQuantity extends BaseComponent {
  private count: number;
  private callback: ((count: number) => Promise<boolean>) | undefined;

  constructor(parameters: ProductQuantityParameters) {
    super({ tag: 'div', className: PRODUCT_STYLES.QUANTITY_BLOCK });

    this.callback = parameters.callback;

    this.count = parameters.count;
    this.render(parameters.price, parameters.element, parameters.text);
  }

  private createQuantityInput(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.QUANTITY_INPUT,
      textContent: String(this.count),
    }).getElement();
  }

  private render(price: number, element: HTMLElement, text: string): void {
    const minusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '-',
      callback: async (): Promise<void> => {
        if (this.callback) {
          const resultCallback = await this.callback(--this.count);

          if (resultCallback) {
            if (this.count > DEFAULT_QUANTITY_AMOUNT) {
              quantityInput.textContent = String(this.count);
              element.textContent = `${text} ${String(price * this.count)} ${PRODUCT_TEXT.CURRENCY}`;
            }
            if (this.count === DEFAULT_QUANTITY_AMOUNT) {
              minusButton.setAttribute('disabled', 'true');
            }
          }
        }
      },
    }).getElement();

    const plusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '+',
      callback: async (): Promise<void> => {
        if (this.callback) {
          const resultCallback = await this.callback(++this.count);

          if (resultCallback) {
            quantityInput.textContent = String(this.count);
            if (this.count > DEFAULT_QUANTITY_AMOUNT) {
              minusButton.removeAttribute('disabled');
            }
            element.textContent = `${text} ${String(price * this.count)} ${PRODUCT_TEXT.CURRENCY}`;
          }
        }
      },
    }).getElement();

    const quantityInput = this.createQuantityInput();

    element.textContent = `${text} ${String(price * this.count)} ${PRODUCT_TEXT.CURRENCY}`;
    this.component.append(minusButton, quantityInput, plusButton);
  }
}
