import defaultProductImage from '@/assets/images/default-macaron.svg';
import notFoundImage from '@/assets/images/not-found.svg';
import BaseComponent from '@/components/base';
import EmptyComponent from '@/components/base/empty';
import { CATALOG_TEXTS, DEFAULT_CURRENCY, MAX_DESCRIPTION_LENGTH } from '@/constants';
import { productsState } from '@/store/products-state';
import { PRODUCT_LIST_STYLES } from '@/styles/catalog/product-list';
import { Route } from '@/types/enums';
import type { Products } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import SVGBuilder from '@/utils/svg-builder';

import AddToCartButton from '../buttons/add-to-cart-button';

export default class ProductList extends BaseComponent {
  private static readonly CAMERA_ICON =
    'M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z';

  private productsContainer: HTMLElement;
  private isLoading: boolean;
  private hasError: boolean;

  constructor() {
    super({ tag: 'div', className: PRODUCT_LIST_STYLES.CONTAINER });
    this.productsContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRODUCTS_CONTAINER,
    }).getElement();
    this.isLoading = true;
    this.hasError = false;

    productsState.subscribe(this.handleProductsChange);
    productsState.subscribeError(this.handleError);
    this.updateProductList();
  }

  public static createPromoTag(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PROMO_TAG,
      textContent: CATALOG_TEXTS.PROMO_TAG,
    }).getElement();
  }

  private static createPhotoCounter(product: Products): HTMLElement {
    const photoCounterContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PHOTO_COUNTER,
    }).getElement();

    const icon = new SVGBuilder({
      source: ProductList.CAMERA_ICON,
      className: [],
      classNameIcon: PRODUCT_LIST_STYLES.CAMERA_ICON,
      viewBox: '0 0 24 24',
      iconSize: 24,
    }).getElement();

    const photoCount = new ElementBuilder({
      tag: 'span',
      className: PRODUCT_LIST_STYLES.PHOTO_COUNT,
      textContent: product.imagesCount?.toString() || '0',
    }).getElement();

    photoCounterContainer.append(icon, photoCount);
    return photoCounterContainer;
  }

  private static createPriceContainer(product: Products): HTMLElement {
    const priceContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRICE_CONTAINER,
    }).getElement();

    const priceWrapper = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRICE_WRAPPER,
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

      priceWrapper.append(discountedPrice, originalPrice);
    } else {
      const regularPrice = new ElementBuilder({
        tag: 'span',
        className: PRODUCT_LIST_STYLES.REGULAR_PRICE,
        textContent: `${product.price} ${DEFAULT_CURRENCY}`,
      }).getElement();

      priceWrapper.append(regularPrice);
    }

    priceContainer.append(priceWrapper, ProductList.createPhotoCounter(product));

    return priceContainer;
  }

  private static cropText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  }

  private static createProductCard(product: Products): HTMLElement {
    const card = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.CARD,
      callback: (): void => {
        globalThis.location.hash = `${Route.PRODUCT}/${product.key}`;
      },
    }).getElement();

    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.IMAGE_CONTAINER,
    }).getElement();

    const image = new ImageBuilder({
      source: product.image || defaultProductImage,
      alt: product.name,
      className: PRODUCT_LIST_STYLES.IMAGE,
    }).getElement();

    if (product.discountedPrice) {
      imageContainer.append(ProductList.createPromoTag());
    }

    const addInCartButton = this.createAddProductButton(product);

    imageContainer.append(image);
    const content = this.createContent(product);

    card.append(imageContainer, content, addInCartButton);

    return card;
  }

  private static createAddProductButton(product: Products): HTMLElement {
    const button = new AddToCartButton({
      style: 'ADD_TO_CART',
      productId: product.id,
    });

    return button.getElement();
  }

  private static createContent(product: Products): HTMLElement {
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
      textContent: ProductList.cropText(product.description, MAX_DESCRIPTION_LENGTH),
    }).getElement();

    const priceContainer = ProductList.createPriceContainer(product);

    contentContainer.append(title, description, priceContainer);

    return contentContainer;
  }

  private handleProductsChange = (): void => {
    this.isLoading = false;
    this.hasError = false;
    this.updateProductList();
  };

  private handleError = (): void => {
    this.isLoading = false;
    this.hasError = true;
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

    if (!this.isLoading) {
      if (this.hasError) {
        const errorState = new EmptyComponent(
          CATALOG_TEXTS.ERROR_LOADING_PRODUCTS,
          notFoundImage,
          PRODUCT_LIST_STYLES.EMPTY_CATALOG_CONTAINER,
          PRODUCT_LIST_STYLES.EMPTY_CATALOG_IMAGE,
          PRODUCT_LIST_STYLES.EMPTY_CATALOG_TEXT
        );
        this.component.append(errorState.getElement());
        return;
      }

      if (products.length === 0) {
        const emptyState = new EmptyComponent(
          CATALOG_TEXTS.NO_PRODUCTS,
          notFoundImage,
          PRODUCT_LIST_STYLES.EMPTY_CATALOG_CONTAINER,
          PRODUCT_LIST_STYLES.EMPTY_CATALOG_IMAGE,
          PRODUCT_LIST_STYLES.EMPTY_CATALOG_TEXT
        );
        this.component.append(emptyState.getElement());
        return;
      }
    }

    this.component.append(this.productsContainer);
    for (const product of products) {
      const productItem = ProductList.createProductCard(product);
      this.productsContainer.append(productItem);
    }
  }
}
