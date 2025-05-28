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
    const actualPrice = 50;
    const noActualPrice = 90;
    const currentPrice = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PRICE,
      textContent: `${actualPrice.toFixed(2)} ${PRODUCT_TEXT.CURRANCY}`,
    }).getElement();

    const oldPrice = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.PRICE_OLD,
      textContent: `${noActualPrice.toFixed(2)} ${PRODUCT_TEXT.CURRANCY}`,
    }).getElement();

    const button = new Button({
      style: 'PRICE_BUTTON',
      textContent: PRODUCT_TEXT.BASKET,
      callback: (): void => {},
    }).getElement();

    const totalAmount = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.QUANTITY_MESSAGE,
      textContent: `${PRODUCT_TEXT.TOTAL} ${actualPrice} ${PRODUCT_TEXT.CURRANCY}`,
    }).getElement();

    const quantityInputBlock = new ProductQuantity(actualPrice, totalAmount);

    this.component.append(
      currentPrice,
      oldPrice,
      quantityInputBlock.getElement(),
      totalAmount,
      button
    );
  }
}
