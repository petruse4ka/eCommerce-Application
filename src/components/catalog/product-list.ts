import BaseComponent from '@/components/base';
import { MACARONS } from '@/data/products';
import { PRODUCT_LIST_STYLES } from '@/styles/catalog/product-list';
import type { Macarons } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ProductList extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: PRODUCT_LIST_STYLES.CONTAINER });
    this.render();
  }

  private static createProductCard(product: Macarons): HTMLElement {
    const card = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.CARD,
    }).getElement();

    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.IMAGE_CONTAINER,
    }).getElement();

    const image = new ImageBuilder({
      source: product.image,
      alt: product.name,
      className: PRODUCT_LIST_STYLES.IMAGE,
    }).getElement();

    const contentContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.CONTENT_CONTAINER,
    }).getElement();

    const title = new ElementBuilder({
      tag: 'h3',
      className: PRODUCT_LIST_STYLES.TITLE,
      textContent: product.name,
    }).getElement();

    const description = new ElementBuilder({
      tag: 'p',
      className: PRODUCT_LIST_STYLES.DESCRIPTION,
      textContent: product.description,
    }).getElement();

    imageContainer.append(image);
    contentContainer.append(title);
    contentContainer.append(description);
    card.append(imageContainer);
    card.append(contentContainer);

    return card;
  }

  private render(): void {
    for (const product of MACARONS) {
      const productCard = ProductList.createProductCard(product);
      this.component.append(productCard);
    }
  }
}
