import CatalogAPI from '@/api/catalog';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { CATALOG_TEXTS, DEFAULT_CURRENCY } from '@/constants';
import { SORTING_OPTIONS } from '@/data/products';
import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
import { PRODUCT_LIST_STYLES } from '@/styles/catalog/product-list';
import { SORTING_STYLES } from '@/styles/catalog/sorting';
import { InputType } from '@/types/enums';
import type { Macarons } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import InputBuilder from '@/utils/input-builder';
import SelectBuilder from '@/utils/select-builder';

export default class ProductList extends BaseComponent {
  private products: Macarons[] = [];
  private productsContainer: HTMLElement;
  private productCounter: HTMLElement;

  constructor() {
    super({ tag: 'div', className: PRODUCT_LIST_STYLES.CONTAINER });

    this.productsContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRODUCTS_CONTAINER,
    }).getElement();

    this.productCounter = new ElementBuilder({
      tag: 'span',
      className: SORTING_STYLES.PRODUCT_COUNTER,
      textContent: `${CATALOG_TEXTS.TOTAL_PRODUCTS}: 0`,
    }).getElement();

    this.render();
  }

  private static createSearchContainer(): HTMLElement {
    const searchContainer = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.SEARCH_CONTAINER,
    }).getElement();

    const searchInput = new InputBuilder({
      id: 'search',
      type: InputType.TEXT,
      placeholder: CATALOG_TEXTS.SEARCH_PLACEHOLDER,
      className: SORTING_STYLES.SEARCH_INPUT,
      eventType: 'input',
      callback: (): void => {
        if (searchInput instanceof HTMLInputElement && searchInput.value.length > 0) {
          button.classList.remove(...CUSTOM_BUTTON_STYLE.HIDDEN);
        } else {
          button.classList.add(...CUSTOM_BUTTON_STYLE.HIDDEN);
        }
      },
    }).getElement();

    const button = new Button({
      style: 'CLEAR',
      textContent: '×',
      callback: (): void => {
        if (searchInput instanceof HTMLInputElement) {
          searchInput.value = '';
          button.classList.add(...CUSTOM_BUTTON_STYLE.HIDDEN);
        }
      },
    }).getElement();

    searchContainer.append(searchInput, button);

    return searchContainer;
  }

  private static createSortingContainer(productCounter: HTMLElement): HTMLElement {
    const container = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.CONTAINER,
    }).getElement();

    const dropdownContainer = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.DROPDOWN_CONTAINER,
    }).getElement();

    const select = new SelectBuilder({
      className: SORTING_STYLES.DROPDOWN,
    });

    select.addOptions(SORTING_OPTIONS);

    const searchContainer = ProductList.createSearchContainer();

    dropdownContainer.append(select.getElement());
    container.append(productCounter, searchContainer, dropdownContainer);

    return container;
  }

  private static createPriceContainer(product: Macarons): HTMLElement {
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

    const priceContainer = ProductList.createPriceContainer(product);

    imageContainer.append(image);
    contentContainer.append(title, description, priceContainer);
    card.append(imageContainer, contentContainer);

    return card;
  }

  private async loadProducts(): Promise<void> {
    try {
      const loadedProducts = await CatalogAPI.getProducts();
      if (loadedProducts) {
        this.products = loadedProducts;
        this.updateProductList();
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  private updateProductList(): void {
    while (this.productsContainer.firstChild) {
      this.productsContainer.firstChild.remove();
    }

    for (const product of this.products) {
      const productItem = ProductList.createProductCard(product);
      this.productsContainer.append(productItem);
    }

    this.productCounter.textContent = `${CATALOG_TEXTS.TOTAL_PRODUCTS}: ${this.products.length}`;
  }

  private render(): void {
    const testButton = new Button({
      style: 'PRIMARY_PINK',
      textContent: 'Запросить Продукты',
      callback: (): void => {
        void this.loadProducts().catch((error) => {
          console.error('Error rendering products:', error);
        });
      },
    }).getElement();

    const sortingContainer = ProductList.createSortingContainer(this.productCounter);

    this.component.append(testButton, sortingContainer, this.productsContainer);
  }
}
