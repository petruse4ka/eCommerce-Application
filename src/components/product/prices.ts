import BaseComponent from '@/components/base';
import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import { ButtonType } from '@/types/enums';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';

import ProductQuantity from './quantity';

export default class ProductPrices extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: PRODUCT_STYLES.PRICES_CONTAINER });

    this.render();
  }

  protected render(): void {
    const currentPrice = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PRICE,
      textContent: '50.00 руб',
    }).getElement();

    const oldPrice = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PRICE_OLD,
      textContent: '90.00 руб',
    }).getElement();

    const button = new ButtonBuilder({
      className: [...CUSTOM_BUTTON_STYLE.PRIMARY_PINK, ...PRODUCT_STYLES.PRICE_BUTTON],
      textContent: 'В корзину',
      type: ButtonType.BUTTON,
    }).getElement();

    const totalAmount = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_NAME,
      textContent: 'Итого: 1900 руб',
    }).getElement();

    const quantityInputBlock = new ProductQuantity();

    this.component.append(
      currentPrice,
      oldPrice,
      quantityInputBlock.getElement(),
      totalAmount,
      button
    );
  }
}
