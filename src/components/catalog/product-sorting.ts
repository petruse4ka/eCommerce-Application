import magnifyIcon from '@/assets/icons/magnify.svg';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { CATALOG_TEXTS } from '@/constants';
import { SORTING_OPTIONS } from '@/data';
import { filterState } from '@/store/filter-state';
import { SORTING_STYLES } from '@/styles/catalog/sorting';
import { InputType } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import InputBuilder from '@/utils/input-builder';
import SelectBuilder from '@/utils/select-builder';

export default class ProductSorting extends BaseComponent {
  private productCounter: HTMLElement;
  private select: SelectBuilder;
  private searchInput: InputBuilder;

  constructor() {
    super({ tag: 'div', className: SORTING_STYLES.CONTAINER });
    this.productCounter = new ElementBuilder({
      tag: 'span',
      className: SORTING_STYLES.PRODUCT_COUNTER,
      textContent: `${CATALOG_TEXTS.TOTAL_PRODUCTS}: 0`,
    }).getElement();

    this.select = new SelectBuilder({
      className: SORTING_STYLES.DROPDOWN,
      attributes: { id: 'sorting' },
      eventType: 'change',
      callback: ProductSorting.handleSortingSelection,
    });

    this.searchInput = new InputBuilder({
      id: 'search',
      type: InputType.TEXT,
      placeholder: CATALOG_TEXTS.SEARCH_PLACEHOLDER,
      className: SORTING_STYLES.SEARCH_INPUT,
      eventType: 'keydown',
      callback: ProductSorting.handleSearchKeydown,
    });

    this.render();
  }

  private static handleSearchKeydown = (event: Event): void => {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      const input = event.target;
      if (input instanceof HTMLInputElement) {
        const searchQuery = input.value.trim();
        filterState.setSearchQuery(searchQuery);
      }
    }
  };

  private static handleSortingSelection = (event: Event): void => {
    const select = event.target;
    const sortBy = select instanceof HTMLSelectElement ? select.value : undefined;

    if (typeof sortBy === 'string') {
      filterState.setSort(sortBy);
    }
  };

  public updateProductCount(count: number): void {
    this.productCounter.textContent = `${CATALOG_TEXTS.TOTAL_PRODUCTS}: ${count}`;
  }

  private createSearchContainer(): HTMLElement {
    const searchContainer = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.SEARCH_CONTAINER,
    }).getElement();

    const searchButton = new Button({
      style: 'SEARCH_BUTTON',
      textContent: '',
      callback: this.handleSearchClick,
    }).getElement();

    const searchIcon = new ImageBuilder({
      source: magnifyIcon,
      alt: 'Search icon',
      className: SORTING_STYLES.SEARCH_ICON,
    }).getElement();

    searchButton.append(searchIcon);
    searchContainer.append(this.searchInput.getElement(), searchButton);

    return searchContainer;
  }

  private handleSearchClick = (): void => {
    const searchQuery = this.searchInput.getValue().trim();
    filterState.setSearchQuery(searchQuery);
  };

  private render(): void {
    const dropdownContainer = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.DROPDOWN_CONTAINER,
    }).getElement();

    this.select.addOptions(SORTING_OPTIONS);

    const searchContainer = this.createSearchContainer();

    dropdownContainer.append(this.select.getElement());
    this.component.append(this.productCounter, searchContainer, dropdownContainer);
  }
}
