import BaseComponent from '@/components/base';
import EmptyCatalog from '@/components/catalog/empty-catalog';
import { CATALOG_TEXTS, DEFAULT_CURRENCY } from '@/constants';
import { PRODUCT_LIST_STYLES } from '@/styles/catalog/product-list';
import type { Products } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ProductList extends BaseComponent {
  private products: Products[] = [];
  private productsContainer: HTMLElement;

  constructor() {
    super({ tag: 'div', className: PRODUCT_LIST_STYLES.CONTAINER });
    this.productsContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRODUCTS_CONTAINER,
    }).getElement();
  }

  private static createPriceContainer(product: Products): HTMLElement {
    const priceContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRICE_CONTAINER,
    }).getElement();

    if (product.discountedPrice) {
      const originalPrice = new ElementBuilder({
        tag: 'span',
        className: PRODUCT_LIST_STYLES.ORIGINAL_PRICE,
        textContent: `${product.price} ${DEFAULT_CURRENCY}`,
      }).getElement();

      const discountedPrice = new ElementBuilder({
        tag: 'span',
        className: PRODUCT_LIST_STYLES.REGULAR_PRICE,
        textContent: `${product.discountedPrice} ${DEFAULT_CURRENCY}`,
      }).getElement();

      priceContainer.append(originalPrice, discountedPrice);
    } else {
      const regularPrice = new ElementBuilder({
        tag: 'span',
        className: PRODUCT_LIST_STYLES.REGULAR_PRICE,
        textContent: `${product.price} ${DEFAULT_CURRENCY}`,
      }).getElement();

      priceContainer.append(regularPrice);
    }

    return priceContainer;
  }

  private static createProductCard(product: Products): HTMLElement {
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

    const priceContainer = ProductList.createPriceContainer(product);

    imageContainer.append(image);
    contentContainer.append(title, description, priceContainer);
    card.append(imageContainer, contentContainer);

    return card;
  }

  public updateProducts(products: Products[]): void {
    this.products = products;
    this.updateProductList();
  }

  private updateProductList(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    if (this.products.length === 0) {
      const emptyState = new EmptyCatalog(`${CATALOG_TEXTS.NO_PRODUCTS}`);
      this.component.append(emptyState.getElement());
      return;
    }

    this.component.append(this.productsContainer);
    for (const product of this.products) {
      const productItem = ProductList.createProductCard(product);
      this.productsContainer.append(productItem);
    }
  }
}
