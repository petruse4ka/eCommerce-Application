import BaseComponent from '@/components/base';
import EmptyCatalog from '@/components/catalog/empty-catalog';
import { CATALOG_TEXTS, DEFAULT_CURRENCY } from '@/constants';
import { productsState } from '@/store/products-state';
import { PRODUCT_LIST_STYLES } from '@/styles/catalog/product-list';
import type { Products } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ProductList extends BaseComponent {
  private productsContainer: HTMLElement;
  private isLoading: boolean;

  constructor() {
    super({ tag: 'div', className: PRODUCT_LIST_STYLES.CONTAINER });
    this.productsContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRODUCTS_CONTAINER,
    }).getElement();
    this.isLoading = true;

    productsState.subscribe(this.handleProductsChange);
    this.updateProductList();
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

  private static createPromoTag(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PROMO_TAG,
      textContent: CATALOG_TEXTS.PROMO_TAG,
    }).getElement();
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

    if (product.discountedPrice) {
      imageContainer.append(ProductList.createPromoTag());
    }

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

  private handleProductsChange = (): void => {
    this.isLoading = false;
    this.updateProductList();
  };

  private updateProductList(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    while (this.productsContainer.firstChild) {
      this.productsContainer.firstChild.remove();
    }

    const products = productsState.getProducts();

    if (!this.isLoading && products.length === 0) {
      const emptyState = new EmptyCatalog(`${CATALOG_TEXTS.NO_PRODUCTS}`);
      this.component.append(emptyState.getElement());
      return;
    }

    this.component.append(this.productsContainer);
    for (const product of products) {
      const productItem = ProductList.createProductCard(product);
      this.productsContainer.append(productItem);
    }
  }
}
