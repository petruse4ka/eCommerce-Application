import BaseComponent from '@/components/base';
import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import { ButtonType } from '@/types/enums';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';

export default class ProductQuantity extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: PRODUCT_STYLES.QUANTITY_BLOCK });

    this.render();
  }

  private render(): void {
    const minusButton = new ButtonBuilder({
      className: [...CUSTOM_BUTTON_STYLE.SECONDARY_BLUE, ...PRODUCT_STYLES.QUANTITY_ADD],
      textContent: '-',
      type: ButtonType.BUTTON,
    }).getElement();
    minusButton.classList.remove('min-w-[234px]');

    const plusButton = new ButtonBuilder({
      className: [...CUSTOM_BUTTON_STYLE.SECONDARY_BLUE, ...PRODUCT_STYLES.QUANTITY_ADD],
      textContent: '+',
      type: ButtonType.BUTTON,
    }).getElement();
    plusButton.classList.remove('min-w-[234px]');

    const quantityInput = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.QUANTITY_INPUT,
      textContent: '1',
    }).getElement();

    this.component.append(minusButton, quantityInput, plusButton);
  }
}
