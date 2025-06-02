import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Price } from '@/types/interfaces';
import type { Attributes } from '@/types/types';

import ProductAttributes from './attributes';
import ProductPrices from './prices';

export default class ProductWrappingBlock extends BaseComponent {
  constructor(attributes: Attributes, prices: Price[]) {
    super({ tag: 'div', className: PRODUCT_STYLES.WRAPPING_BLOCK });
    const productAttributs = new ProductAttributes(attributes);
    this.component.append(productAttributs.getElement());

    const pricesBlock = new ProductPrices(prices);
    this.component.append(pricesBlock.getElement());
  }
}
