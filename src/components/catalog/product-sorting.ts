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
  private clearButton: HTMLElement;
  private validationMessage: HTMLElement;
  private searchContainer: HTMLElement;

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
      eventType: 'input',
      callback: this.handleSearchInput,
    });

    this.searchInput.getElement().addEventListener('keydown', this.handleSearchKeydown);

    this.clearButton = new Button({
      style: 'CLEAR',
      textContent: '×',
      callback: this.handleClearSearch,
    }).getElement();

    this.validationMessage = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.SHORT_SEARCH_QUERY,
      textContent: CATALOG_TEXTS.SHORT_SEARCH_QUERY,
    }).getElement();

    this.searchContainer = new ElementBuilder({
      tag: 'div',
      className: SORTING_STYLES.SEARCH_CONTAINER,
    }).getElement();

    this.render();
  }

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
    this.searchContainer.append(this.searchInput.getElement(), searchButton, this.clearButton);

    return this.searchContainer;
  }

  private handleSearchInput = (event: Event): void => {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.clearButton.classList.toggle('hidden', !input.value);
    }
  };

  private handleSearchKeydown = (event: Event): void => {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.handleSearchClick();
    }
  };

  private handleSearchClick = (): void => {
    const searchQuery = this.searchInput.getValue().trim();
    if (searchQuery.length > 0 && searchQuery.length <= 2) {
      this.showValidationMessage();
    } else {
      filterState.setSearchQuery(searchQuery);
    }
  };

  private handleClearSearch = (): void => {
    this.searchInput.setValue('');
    filterState.setSearchQuery('');
    this.clearButton.classList.add('hidden');
  };

  private showValidationMessage(): void {
    this.searchContainer.append(this.validationMessage);
    setTimeout(() => {
      this.validationMessage.remove();
    }, 1500);
  }

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
