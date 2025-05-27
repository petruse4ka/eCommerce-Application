import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { CATALOG_TEXTS, DEFAULT_OPTIONS_COUNT } from '@/constants';
import { FILTER_RANGES } from '@/constants';
import {
  DIET_FILTER,
  FILLING_FILTER,
  FILTER_CONFIGS,
  FLAVOUR_FILTER,
  PRODUCT_TYPE_FILTER,
  PROMO_FILTER,
  TOPPING_FILTER,
} from '@/data/products';
import { filterState } from '@/store/filter-state';
import { FILTERS_STYLES } from '@/styles/catalog/product-filters';
import { FilterId, InputType } from '@/types/enums';
import type { CheckboxFiltersParameters, CheckboxOption } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import InputBuilder from '@/utils/input-builder';
import SelectBuilder from '@/utils/select-builder';

import SelectedFilters from './selected-filters';

export default class ProductFilters extends BaseComponent {
  private filters: {
    checkboxes: Map<FilterId, HTMLInputElement[]>;
    ranges: Map<FilterId, { min: HTMLInputElement; max: HTMLInputElement }>;
    dropdowns: Map<FilterId, HTMLSelectElement>;
  };
  private isFiltersVisible: boolean;

  constructor() {
    super({ tag: 'div', className: FILTERS_STYLES.WRAPPER });
    this.filters = {
      checkboxes: new Map(),
      ranges: new Map(),
      dropdowns: new Map(),
    };
    this.isFiltersVisible = false;
    this.render();
  }

  private static createFilterTitle(title: string): HTMLElement {
    return new ElementBuilder({
      tag: 'h3',
      className: FILTERS_STYLES.FILTER_TITLE,
      textContent: title,
    }).getElement();
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

  public override remove(): void {
    filterState.unsubscribe(this.handleFilterChange);
    super.remove();
  }

  private createCheckboxOption(filterId: FilterId, option: CheckboxOption): HTMLElement {
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

      const checkboxes = this.filters.checkboxes.get(filterId) || [];
      checkboxes.push(checkbox);
      this.filters.checkboxes.set(filterId, checkboxes);
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

  private createAllCheckboxOptions(options: CheckboxOption[], filterId: FilterId): HTMLElement {
    const optionsContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.OPTIONS_CONTAINER,
    }).getElement();

    for (const option of options) {
      const checkboxOption = this.createCheckboxOption(filterId, option);
      if (options.indexOf(option) >= DEFAULT_OPTIONS_COUNT) {
        checkboxOption.classList.add(...FILTERS_STYLES.HIDDEN);
      }
      optionsContainer.append(checkboxOption);
    }

    return optionsContainer;
  }

  private createCheckboxFilter(parameters: CheckboxFiltersParameters): HTMLElement {
    const filterContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_CONTAINER,
    }).getElement();

    const filterTitle = ProductFilters.createFilterTitle(parameters.title);
    const optionsContainer = this.createAllCheckboxOptions(parameters.options, parameters.filterId);

    filterContainer.append(filterTitle);
    filterContainer.append(optionsContainer);

    if (parameters.options.length > DEFAULT_OPTIONS_COUNT) {
      const showMoreButton = ProductFilters.createShowMoreButton(optionsContainer);
      filterContainer.append(showMoreButton);
    }

    return filterContainer;
  }

  private createDropdownFilter(
    title: string,
    options: CheckboxOption[],
    filterId: FilterId
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

    const selectElement = select.getElement();
    if (selectElement instanceof HTMLSelectElement) {
      this.filters.dropdowns.set(filterId, selectElement);

      selectElement.addEventListener('change', (event) => {
        const target = event.target;

        if (target instanceof HTMLSelectElement) {
          if (target.value) {
            filterState.toggleOption(filterId, target.value);
          } else {
            const options = filterState.getSelectedOptions(filterId);

            options.clear();
            filterState.toggleOption(filterId, '');
          }
        }
      });
    }

    dropdownContainer.append(filterTitle);
    dropdownContainer.append(selectElement);

    return dropdownContainer;
  }

  private createRangeInputs(
    filterId: FilterId,
    min: number,
    max: number,
    step: number
  ): { minInput: HTMLElement; maxInput: HTMLElement } {
    const minInput = new InputBuilder({
      id: `min-${filterId}`,
      type: InputType.NUMBER,
      min: min.toString(),
      max: max.toString(),
      step: step.toString(),
      value: min.toString(),
      className: FILTERS_STYLES.RANGE_INPUT,
    }).getElement();

    const maxInput = new InputBuilder({
      id: `max-${filterId}`,
      type: InputType.NUMBER,
      min: min.toString(),
      max: max.toString(),
      step: step.toString(),
      value: max.toString(),
      className: FILTERS_STYLES.RANGE_INPUT,
    }).getElement();

    if (minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement) {
      this.filters.ranges.set(filterId, { min: minInput, max: maxInput });

      minInput.addEventListener('change', () => {
        filterState.toggleOption(filterId, `${minInput.value}-${maxInput.value}`);
      });

      maxInput.addEventListener('change', () => {
        filterState.toggleOption(filterId, `${minInput.value}-${maxInput.value}`);
      });
    }

    return { minInput, maxInput };
  }

  private createRangeFilter(
    title: string,
    min: number,
    max: number,
    step: number,
    filterId: FilterId
  ): HTMLElement {
    const rangeContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_CONTAINER,
    }).getElement();

    const filterTitle = ProductFilters.createFilterTitle(title);

    const inputsContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.RANGE_CONTAINER,
    }).getElement();

    const minLabel = new ElementBuilder({
      tag: 'span',
      className: FILTERS_STYLES.RANGE_LABEL,
      textContent: CATALOG_TEXTS.RANGE_FROM,
    }).getElement();

    const maxLabel = new ElementBuilder({
      tag: 'span',
      className: FILTERS_STYLES.RANGE_LABEL,
      textContent: CATALOG_TEXTS.RANGE_TO,
    }).getElement();

    const { minInput, maxInput } = this.createRangeInputs(filterId, min, max, step);

    inputsContainer.append(minLabel);
    inputsContainer.append(minInput);
    inputsContainer.append(maxLabel);
    inputsContainer.append(maxInput);
    rangeContainer.append(filterTitle);
    rangeContainer.append(inputsContainer);

    return rangeContainer;
  }

  private createMainFilters(): HTMLElement[] {
    return [
      this.createCheckboxFilter({
        title: CATALOG_TEXTS.PRODUCT_TYPE_FILTER,
        options: PRODUCT_TYPE_FILTER,
        filterId: FilterId.TYPE,
      }),
      this.createRangeFilter(
        CATALOG_TEXTS.PRICE_FILTER,
        FILTER_RANGES.PRICE.MIN,
        FILTER_RANGES.PRICE.MAX,
        FILTER_RANGES.PRICE.STEP,
        FilterId.PRICE
      ),
    ];
  }

  private createSecondaryFilters(): HTMLElement[] {
    return [
      this.createCheckboxFilter({
        title: CATALOG_TEXTS.TASTE_FILTER,
        options: FLAVOUR_FILTER,
        filterId: FilterId.TASTE,
      }),
      this.createCheckboxFilter({
        title: CATALOG_TEXTS.DIET_FILTER,
        options: DIET_FILTER,
        filterId: FilterId.DIET,
      }),
    ];
  }

  private createAdditionalFilters(): HTMLElement[] {
    return [
      this.createCheckboxFilter({
        title: CATALOG_TEXTS.TOPPING_FILTER,
        options: TOPPING_FILTER,
        filterId: FilterId.TOPPING,
      }),
      this.createCheckboxFilter({
        title: CATALOG_TEXTS.FILLING_FILTER,
        options: FILLING_FILTER,
        filterId: FilterId.FILLING,
      }),
      this.createRangeFilter(
        CATALOG_TEXTS.WEIGHT_FILTER,
        FILTER_RANGES.WEIGHT.MIN,
        FILTER_RANGES.WEIGHT.MAX,
        FILTER_RANGES.WEIGHT.STEP,
        FilterId.WEIGHT
      ),
    ];
  }

  private createFilters(): HTMLElement[] {
    return [
      ...this.createMainFilters(),
      ...this.createSecondaryFilters(),
      ...this.createAdditionalFilters(),
      this.createDropdownFilter(CATALOG_TEXTS.PROMO_FILTER, PROMO_FILTER, FilterId.PROMO),
    ];
  }

  private handleFilterChange = (): void => {
    for (const { id } of FILTER_CONFIGS.checkbox) {
      const checkboxes = this.filters.checkboxes.get(id);

      if (checkboxes) {
        for (const checkbox of checkboxes) {
          checkbox.checked = filterState.getSelectedOptions(id).has(checkbox.value);
        }
      }
    }

    for (const { id, min, max } of FILTER_CONFIGS.range) {
      const range = this.filters.ranges.get(id);

      if (range) {
        const values = [...filterState.getSelectedOptions(id)];
        const [minValue, maxValue] = values.length > 0 ? values[0].split('-') : ['', ''];

        range.min.value = minValue || min.toString();
        range.max.value = maxValue || max.toString();
      }
    }

    for (const { id } of FILTER_CONFIGS.dropdown) {
      const select = this.filters.dropdowns.get(id);

      if (select) {
        const values = [...filterState.getSelectedOptions(id)];
        select.value = values[0] || '';
      }
    }
  };

  private render(): void {
    const selectedFilters = new SelectedFilters().getElement();
    const filtersContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.CONTAINER,
    });

    const toggleButton = new Button({
      style: 'TOGGLE_FILTERS',
      textContent: CATALOG_TEXTS.SHOW_FILTERS,
      callback: (): void => {
        this.isFiltersVisible = !this.isFiltersVisible;
        if (this.isFiltersVisible) {
          filtersContainer.removeCssClasses(FILTERS_STYLES.HIDDEN);
          toggleButton.textContent = CATALOG_TEXTS.HIDE_FILTERS;
        } else {
          filtersContainer.applyCssClasses(FILTERS_STYLES.HIDDEN);
          toggleButton.textContent = CATALOG_TEXTS.SHOW_FILTERS;
        }
      },
    }).getElement();

    const allFilters = this.createFilters();

    filterState.subscribe(this.handleFilterChange);

    for (const filter of allFilters) {
      filtersContainer.getElement().append(filter);
    }

    this.component.append(selectedFilters);
    this.component.append(toggleButton);
    this.component.append(filtersContainer.getElement());
  }
}
