import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { CATALOG_TEXTS, DEFAULT_OPTIONS_COUNT } from '@/constants';
import {
  DIET_FILTER,
  FILLING_FILTER,
  FLAVOUR_FILTER,
  PRODUCT_TYPE_FILTER,
  PROMO_FILTER,
  TOPPING_FILTER,
} from '@/data/products';
import { filterState } from '@/store/filter-state';
import { FILTERS_STYLES } from '@/styles/catalog/product-filters';
import { InputType } from '@/types/enums';
import type { CheckboxFiltersParameters, CheckboxOption } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import InputBuilder from '@/utils/input-builder';
import SelectBuilder from '@/utils/select-builder';

export default class ProductFilters extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: FILTERS_STYLES.CONTAINER });
    this.render();
  }

  private static createFilterTitle(title: string): HTMLElement {
    return new ElementBuilder({
      tag: 'h3',
      className: FILTERS_STYLES.FILTER_TITLE,
      textContent: title,
    }).getElement();
  }

  private static createCheckboxOption(filterId: string, option: CheckboxOption): HTMLElement {
    const optionContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.OPTION_CONTAINER,
    }).getElement();

    const checkbox = new InputBuilder({
      id: option.value,
      type: InputType.CHECKBOX,
      value: option.value,
      className: FILTERS_STYLES.CHECKBOX,
    }).getElement();

    if (checkbox instanceof HTMLInputElement) {
      if (filterState.getSelectedOptions(filterId).has(option.value)) {
        checkbox.checked = true;
      }

      checkbox.addEventListener('change', () => {
        filterState.toggleOption(filterId, option.value);
      });
    }

    const label = new ElementBuilder({
      tag: 'label',
      className: FILTERS_STYLES.LABEL,
      textContent: option.text,
      attributes: {
        for: option.value,
      },
    }).getElement();

    optionContainer.append(checkbox);
    optionContainer.append(label);
    return optionContainer;
  }

  private static createAllCheckboxOptions(
    options: CheckboxOption[],
    filterId: string
  ): HTMLElement {
    const optionsContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.OPTIONS_CONTAINER,
    }).getElement();

    for (const option of options) {
      const checkboxOption = ProductFilters.createCheckboxOption(filterId, option);
      if (options.indexOf(option) >= DEFAULT_OPTIONS_COUNT) {
        checkboxOption.classList.add(...FILTERS_STYLES.HIDDEN);
      }
      optionsContainer.append(checkboxOption);
    }

    return optionsContainer;
  }

  private static createShowMoreButton(optionsContainer: HTMLElement): HTMLElement {
    let isAllOptionsShown = false;

    const button = new Button({
      style: 'SHOW_MORE',
      textContent: CATALOG_TEXTS.SHOW_MORE,
      callback: (): void => {
        isAllOptionsShown = !isAllOptionsShown;
        const allOptions = optionsContainer.children;

        for (let index = DEFAULT_OPTIONS_COUNT; index < allOptions.length; index++) {
          if (isAllOptionsShown) {
            allOptions[index].classList.remove(...FILTERS_STYLES.HIDDEN);
          } else {
            allOptions[index].classList.add(...FILTERS_STYLES.HIDDEN);
          }
        }

        button.getElement().textContent = isAllOptionsShown
          ? CATALOG_TEXTS.SHOW_LESS
          : CATALOG_TEXTS.SHOW_MORE;
      },
    });

    return button.getElement();
  }

  private static createCheckboxFilter(parameters: CheckboxFiltersParameters): HTMLElement {
    const filterContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_CONTAINER,
    }).getElement();

    const filterTitle = ProductFilters.createFilterTitle(parameters.title);
    const optionsContainer = ProductFilters.createAllCheckboxOptions(
      parameters.options,
      parameters.filterId
    );

    filterContainer.append(filterTitle);
    filterContainer.append(optionsContainer);

    if (parameters.options.length > DEFAULT_OPTIONS_COUNT) {
      const showMoreButton = ProductFilters.createShowMoreButton(optionsContainer);
      filterContainer.append(showMoreButton);
    }

    return filterContainer;
  }

  private static createDropdownFilter(
    title: string,
    options: CheckboxOption[],
    filterId: string
  ): HTMLElement {
    const dropdownContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_CONTAINER,
    }).getElement();

    const filterTitle = ProductFilters.createFilterTitle(title);

    const select = new SelectBuilder({
      className: FILTERS_STYLES.DROPDOWN,
    });

    select.addOptions(options);

    select.getElement().addEventListener('change', (event) => {
      const target = event.target;
      if (target instanceof HTMLSelectElement) {
        if (target.value) {
          filterState.toggleOption(filterId, target.value);
        } else {
          filterState.toggleOption(filterId, '');
        }
      }
    });

    dropdownContainer.append(filterTitle);
    dropdownContainer.append(select.getElement());

    return dropdownContainer;
  }

  public override remove(): void {
    filterState.unsubscribe(this.handleFilterChange);
    super.remove();
  }

  private handleFilterChange = (): void => {
    console.log(this, 'Filter state changed');
  };

  private render(): void {
    const productTypeFilter = ProductFilters.createCheckboxFilter({
      title: CATALOG_TEXTS.PRODUCT_TYPE_FILTER,
      options: PRODUCT_TYPE_FILTER,
      filterId: 'type',
    });

    const tasteFilter = ProductFilters.createCheckboxFilter({
      title: CATALOG_TEXTS.TASTE_FILTER,
      options: FLAVOUR_FILTER,
      filterId: 'taste',
    });

    const dietFilter = ProductFilters.createCheckboxFilter({
      title: CATALOG_TEXTS.DIET_FILTER,
      options: DIET_FILTER,
      filterId: 'diet',
    });

    const fillingFilter = ProductFilters.createCheckboxFilter({
      title: CATALOG_TEXTS.FILLING_FILTER,
      options: FILLING_FILTER,
      filterId: 'filling',
    });

    const toppingFilter = ProductFilters.createCheckboxFilter({
      title: CATALOG_TEXTS.TOPPING_FILTER,
      options: TOPPING_FILTER,
      filterId: 'topping',
    });

    const promoFilter = ProductFilters.createDropdownFilter(
      CATALOG_TEXTS.PROMO_FILTER,
      PROMO_FILTER,
      'promo'
    );

    filterState.subscribe(this.handleFilterChange);
    this.component.append(productTypeFilter);
    this.component.append(tasteFilter);
    this.component.append(dietFilter);
    this.component.append(toppingFilter);
    this.component.append(fillingFilter);
    this.component.append(promoFilter);
  }
}
