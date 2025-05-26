import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { CATALOG_TEXTS, DEFAULT_OPTIONS_COUNT } from '@/constants';
import { FILTER_RANGES } from '@/constants';
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

  private static createRangeInputs(
    filterId: string,
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

    minInput.addEventListener('change', () => {
      if (minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement) {
        filterState.toggleOption(filterId, `${minInput.value}-${maxInput.value}`);
      }
    });

    maxInput.addEventListener('change', () => {
      if (minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement) {
        filterState.toggleOption(filterId, `${minInput.value}-${maxInput.value}`);
      }
    });

    return { minInput, maxInput };
  }

  private static createRangeFilter(
    title: string,
    min: number,
    max: number,
    step: number,
    filterId: string
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

    const { minInput, maxInput } = ProductFilters.createRangeInputs(filterId, min, max, step);

    inputsContainer.append(minLabel);
    inputsContainer.append(minInput);
    inputsContainer.append(maxLabel);
    inputsContainer.append(maxInput);
    rangeContainer.append(filterTitle);
    rangeContainer.append(inputsContainer);

    return rangeContainer;
  }

  private static createMainFilters(): HTMLElement[] {
    return [
      ProductFilters.createCheckboxFilter({
        title: CATALOG_TEXTS.PRODUCT_TYPE_FILTER,
        options: PRODUCT_TYPE_FILTER,
        filterId: 'type',
      }),
      ProductFilters.createRangeFilter(
        CATALOG_TEXTS.PRICE_FILTER,
        FILTER_RANGES.PRICE.MIN,
        FILTER_RANGES.PRICE.MAX,
        FILTER_RANGES.PRICE.STEP,
        'price'
      ),
    ];
  }

  private static createSecondaryFilters(): HTMLElement[] {
    return [
      ProductFilters.createCheckboxFilter({
        title: CATALOG_TEXTS.TASTE_FILTER,
        options: FLAVOUR_FILTER,
        filterId: 'taste',
      }),
      ProductFilters.createCheckboxFilter({
        title: CATALOG_TEXTS.DIET_FILTER,
        options: DIET_FILTER,
        filterId: 'diet',
      }),
    ];
  }

  private static createAdditionalFilters(): HTMLElement[] {
    return [
      ProductFilters.createCheckboxFilter({
        title: CATALOG_TEXTS.TOPPING_FILTER,
        options: TOPPING_FILTER,
        filterId: 'topping',
      }),
      ProductFilters.createCheckboxFilter({
        title: CATALOG_TEXTS.FILLING_FILTER,
        options: FILLING_FILTER,
        filterId: 'filling',
      }),
      ProductFilters.createRangeFilter(
        CATALOG_TEXTS.WEIGHT_FILTER,
        FILTER_RANGES.WEIGHT.MIN,
        FILTER_RANGES.WEIGHT.MAX,
        FILTER_RANGES.WEIGHT.STEP,
        'weight'
      ),
    ];
  }

  private static createFilters(): HTMLElement[] {
    return [
      ...ProductFilters.createMainFilters(),
      ...ProductFilters.createSecondaryFilters(),
      ...ProductFilters.createAdditionalFilters(),
      ProductFilters.createDropdownFilter(CATALOG_TEXTS.PROMO_FILTER, PROMO_FILTER, 'promo'),
    ];
  }

  public override remove(): void {
    filterState.unsubscribe(this.handleFilterChange);
    super.remove();
  }

  private handleFilterChange = (): void => {
    console.log(this, 'Filter state changed');
  };

  private render(): void {
    const filters = ProductFilters.createFilters();
    filterState.subscribe(this.handleFilterChange);
    for (const filter of filters) this.component.append(filter);
  }
}
