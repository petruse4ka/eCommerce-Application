import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { PRODUCT_TEXT } from '@/constants';
import { PRODUCT_STYLES } from '@/styles/pages/product';
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
      textContent: `50.00 ${PRODUCT_TEXT.CURRANCY}`,
    }).getElement();

    const oldPrice = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PRICE_OLD,
      textContent: `90.00 ${PRODUCT_TEXT.CURRANCY}`,
    }).getElement();

    const button = new Button({
      style: 'PRICE_BUTTON',
      textContent: PRODUCT_TEXT.BASKET,
      callback: (): void => {},
    }).getElement();

    const totalAmount = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PARAMETER_NAME,
      textContent: `${PRODUCT_TEXT.TOTAL} 1900 ${PRODUCT_TEXT.CURRANCY}`,
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
