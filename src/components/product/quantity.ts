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

  private static toggleStateButton(
    plusButton: Button,
    minusButton: Button,
    isDisable: boolean
  ): void {
    if (isDisable) {
      plusButton.disableButton();
      minusButton.disableButton();
    } else {
      plusButton.enableButton();
      minusButton.enableButton();
    }
  }

  private createQuantityInput(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.QUANTITY_INPUT,
      textContent: String(this.count),
    }).getElement();
  }

  private async changeQuantity(
    delta: number,
    plusButton: Button,
    minusButton: Button,
    quantityInput: HTMLElement,
    price: number,
    element: HTMLElement,
    text: string
  ): Promise<void> {
    if (this.callback) {
      ProductQuantity.toggleStateButton(plusButton, minusButton, true);
      this.count += delta;
      const resultCallback = await this.callback(this.count);

      if (resultCallback) {
        quantityInput.textContent = String(this.count);
        element.textContent = `${text} ${(price * this.count).toFixed(2)} ${PRODUCT_TEXT.CURRENCY}`;
        ProductQuantity.toggleStateButton(plusButton, minusButton, false);
        if (this.count > DEFAULT_QUANTITY_AMOUNT) {
          minusButton.enableButton();
        }

        if (this.count === DEFAULT_QUANTITY_AMOUNT) {
          minusButton.disableButton();
        }
      }
    }
  }

  private render(price: number, element: HTMLElement, text: string): void {
    const minusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '-',
      callback: (): void => {
        void this.changeQuantity(-1, plusButton, minusButton, quantityInput, price, element, text);
      },
    });

    if (this.count === DEFAULT_QUANTITY_AMOUNT) {
      minusButton.disableButton();
    }

    const plusButton = new Button({
      style: 'PRICE_QUANTITY',
      textContent: '+',
      callback: (): void => {
        void this.changeQuantity(1, plusButton, minusButton, quantityInput, price, element, text);
      },
    });

    const quantityInput = this.createQuantityInput();

    element.textContent = `${text} ${(price * this.count).toFixed(2)} ${PRODUCT_TEXT.CURRENCY}`;
    this.component.append(minusButton.getElement(), quantityInput, plusButton.getElement());
  }
}
