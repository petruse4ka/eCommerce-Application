import BaseComponent from '@/components/base';
import { CATALOG_TEXTS } from '@/constants';
import { MACARONS, SORTING_OPTIONS } from '@/data/products';
import { PRODUCT_LIST_STYLES } from '@/styles/catalog/product-list';
import { SORTING_STYLES } from '@/styles/catalog/sorting';
import { InputType } from '@/types/enums';
import type { Macarons } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import InputBuilder from '@/utils/input-builder';
import SelectBuilder from '@/utils/select-builder';

export default class ProductList extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: PRODUCT_LIST_STYLES.CONTAINER });
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
    }).getElement();

    const clearButton = new ElementBuilder({
      tag: 'span',
      className: SORTING_STYLES.CLEAR_BUTTON,
      textContent: '×',
    }).getElement();

    searchInput.addEventListener('input', () => {
      if (searchInput instanceof HTMLInputElement) {
        clearButton.style.display = searchInput.value ? 'block' : 'none';
      }
    });

    clearButton.addEventListener('click', () => {
      if (searchInput instanceof HTMLInputElement) {
        searchInput.value = '';
        clearButton.style.display = 'none';
      }
    });

    searchContainer.append(searchInput);
    searchContainer.append(clearButton);

    return searchContainer;
  }

  private static createSortingContainer(): HTMLElement {
    const container = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.CONTAINER,
    }).getElement();

    const productCounter = new ElementBuilder({
      tag: 'span',
      className: SORTING_STYLES.PRODUCT_COUNTER,
      textContent: `${CATALOG_TEXTS.TOTAL_PRODUCTS}: ${MACARONS.length}`,
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
    container.append(productCounter);
    container.append(searchContainer);
    container.append(dropdownContainer);

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
        textContent: `${product.price} €`,
      }).getElement();

      const discountedPrice = new ElementBuilder({
        tag: 'span',
        className: PRODUCT_LIST_STYLES.REGULAR_PRICE,
        textContent: `${product.discountedPrice} €`,
      }).getElement();

      priceContainer.append(originalPrice);
      priceContainer.append(discountedPrice);
    } else {
      const regularPrice = new ElementBuilder({
        tag: 'span',
        className: PRODUCT_LIST_STYLES.REGULAR_PRICE,
        textContent: `${product.price} €`,
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
    contentContainer.append(title);
    contentContainer.append(description);
    contentContainer.append(priceContainer);
    card.append(imageContainer);
    card.append(contentContainer);

    return card;
  }

  private render(): void {
    const sortingContainer = ProductList.createSortingContainer();

    const productsContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_LIST_STYLES.PRODUCTS_CONTAINER,
    }).getElement();

    for (const product of MACARONS) {
      const productItem = ProductList.createProductCard(product);
      productsContainer.append(productItem);
    }

    this.component.append(sortingContainer);
    this.component.append(productsContainer);
  }
}
