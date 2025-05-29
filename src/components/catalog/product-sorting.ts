import BaseComponent from '@/components/base';
import { CATALOG_TEXTS } from '@/constants';
import { SORTING_OPTIONS } from '@/data/products';
import { SORTING_STYLES } from '@/styles/catalog/sorting';
import { InputType } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import InputBuilder from '@/utils/input-builder';
import SelectBuilder from '@/utils/select-builder';

export default class ProductSorting extends BaseComponent {
  private productCounter: HTMLElement;

  constructor() {
    super({ tag: 'div', className: SORTING_STYLES.CONTAINER });
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
    }).getElement();

    searchContainer.append(searchInput);

    return searchContainer;
  }

  public updateProductCount(count: number): void {
    this.productCounter.textContent = `${CATALOG_TEXTS.TOTAL_PRODUCTS}: ${count}`;
  }

  private render(): void {
    const dropdownContainer = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.DROPDOWN_CONTAINER,
    }).getElement();

    const select = new SelectBuilder({
      className: SORTING_STYLES.DROPDOWN,
    });

    select.addOptions(SORTING_OPTIONS);

    const searchContainer = ProductSorting.createSearchContainer();

    dropdownContainer.append(select.getElement());
    this.component.append(this.productCounter, searchContainer, dropdownContainer);
  }
}
