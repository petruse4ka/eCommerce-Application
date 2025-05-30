import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import EmptyFilters from '@/components/catalog/empty-filters';
import { CATALOG_TEXTS, DEFAULT_CURRENCY, DEFAULT_OPTIONS_COUNT, FILTER_RANGES } from '@/constants';
import { filterState } from '@/store/filter-state';
import { FILTERS_STYLES } from '@/styles/catalog/product-filters';
import { FilterType, InputType } from '@/types/enums';
import type { CheckboxFiltersParameters, CheckboxOption, FilterConfigs } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import InputBuilder from '@/utils/input-builder';
import SelectBuilder from '@/utils/select-builder';

export default class ProductFilters extends BaseComponent {
  private filters: {
    checkboxes: Map<string, HTMLInputElement[]>;
    ranges: Map<string, { min: HTMLInputElement; max: HTMLInputElement }>;
    dropdowns: Map<string, HTMLSelectElement>;
  };
  private isFiltersVisible: boolean;
  private filterConfigs: FilterConfigs | null;
  private filtersContainer: ElementBuilder;

  constructor() {
    super({ tag: 'div', className: FILTERS_STYLES.WRAPPER });
    this.filters = {
      checkboxes: new Map(),
      ranges: new Map(),
      dropdowns: new Map(),
    };
    this.isFiltersVisible = false;
    this.filterConfigs = null;

    this.filtersContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.CONTAINER,
    });

    this.component.append(this.filtersContainer.getElement());
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

  private static handleMinInputChange(
    filterId: string,
    min: number,
    minInput: HTMLInputElement,
    maxInput: HTMLInputElement
  ): void {
    const minValue = Number.parseInt(minInput.value);
    const maxValue = Number.parseInt(maxInput.value);
    if (minValue >= min && minValue <= maxValue) {
      const rangeValue = `${minInput.value}-${maxInput.value}`;
      const displayValue =
        filterId === 'price'
          ? `${minInput.value} ${DEFAULT_CURRENCY} - ${maxInput.value} ${DEFAULT_CURRENCY}`
          : `${minInput.value} - ${maxInput.value}`;
      filterState.toggleOption(filterId, rangeValue, displayValue, FilterType.RANGE);
    } else {
      minInput.value = min.toString();
    }
  }

  private static handleMaxInputChange(
    filterId: string,
    max: number,
    minInput: HTMLInputElement,
    maxInput: HTMLInputElement
  ): void {
    const minValue = Number.parseInt(minInput.value);
    const maxValue = Number.parseInt(maxInput.value);
    if (maxValue <= max && maxValue >= minValue) {
      const rangeValue = `${minInput.value}-${maxInput.value}`;
      const displayValue =
        filterId === 'price'
          ? `${minInput.value} ${DEFAULT_CURRENCY} - ${maxInput.value} ${DEFAULT_CURRENCY}`
          : `${minInput.value} - ${maxInput.value}`;
      filterState.toggleOption(filterId, rangeValue, displayValue, FilterType.RANGE);
    } else {
      maxInput.value = max.toString();
    }
  }

  public updateFilters(config: FilterConfigs | null): void {
    this.filterConfigs = config;
    this.updateFiltersContent();
  }

  private updateFiltersContent(): void {
    while (this.component.firstChild) this.component.firstChild.remove();

    const container = this.filtersContainer.getElement();
    while (container.firstChild) container.firstChild.remove();

    if (!this.filterConfigs) {
      this.component.append(this.filtersContainer.getElement());
      return;
    }

    if (
      this.filterConfigs.checkbox.length === 0 &&
      this.filterConfigs.range.length === 0 &&
      this.filterConfigs.dropdown.length === 0
    ) {
      const emptyFilters = new EmptyFilters(CATALOG_TEXTS.NO_FILTERS);
      this.component.append(emptyFilters.getElement());
      return;
    }

    const toggleButton = new Button({
      style: 'TOGGLE_FILTERS',
      textContent: CATALOG_TEXTS.SHOW_FILTERS,
      callback: (): void => {
        this.isFiltersVisible = !this.isFiltersVisible;
        if (this.isFiltersVisible) {
          this.filtersContainer.removeCssClasses(FILTERS_STYLES.HIDDEN);
          toggleButton.textContent = CATALOG_TEXTS.HIDE_FILTERS;
        } else {
          this.filtersContainer.applyCssClasses(FILTERS_STYLES.HIDDEN);
          toggleButton.textContent = CATALOG_TEXTS.SHOW_FILTERS;
        }
      },
    }).getElement();

    this.component.append(toggleButton);

    const filters = this.createFilters();
    filterState.subscribe(this.handleFilterChange);

    for (const filter of filters) container.append(filter);

    this.component.append(this.filtersContainer.getElement());
  }

  private createCheckboxOption(filterId: string, option: CheckboxOption): HTMLElement {
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
      const selectedOptions = filterState.getSelectedOptions(filterId);
      const isSelected = [...selectedOptions].some(
        (selectedOption) => selectedOption.key === option.value
      );
      if (isSelected) {
        checkbox.checked = true;
      }

      checkbox.addEventListener('change', () => {
        filterState.toggleOption(filterId, option.value, option.text, FilterType.CHECKBOX);
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

    optionContainer.append(checkbox, label);
    return optionContainer;
  }

  private createAllCheckboxOptions(options: CheckboxOption[], filterId: string): HTMLElement {
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

    filterContainer.append(filterTitle, optionsContainer);

    if (parameters.options.length > DEFAULT_OPTIONS_COUNT) {
      const showMoreButton = ProductFilters.createShowMoreButton(optionsContainer);
      filterContainer.append(showMoreButton);
    }

    return filterContainer;
  }

  private createDropdownFilter(
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
      attributes: { id: `dropdown-${filterId}` },
    });

    select.addOptions(options);

    const selectElement = select.getElement();
    if (selectElement instanceof HTMLSelectElement) {
      this.filters.dropdowns.set(filterId, selectElement);

      selectElement.addEventListener('change', (event) => {
        const target = event.target;

        if (target instanceof HTMLSelectElement) {
          if (target.value) {
            const option = options.find((option) => option.value === target.value);
            filterState.toggleOption(
              filterId,
              target.value,
              option?.text || target.value,
              FilterType.DROPDOWN
            );
          } else {
            const options = filterState.getSelectedOptions(filterId);
            options.clear();
            filterState.toggleOption(filterId, '', '', FilterType.DROPDOWN);
          }
        }
      });
    }

    dropdownContainer.append(filterTitle, selectElement);
    return dropdownContainer;
  }

  private createRangeInputs(
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
      eventType: 'change',
      callback: (): void => {
        if (minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement)
          ProductFilters.handleMinInputChange(filterId, min, minInput, maxInput);
      },
    }).getElement();

    const maxInput = new InputBuilder({
      id: `max-${filterId}`,
      type: InputType.NUMBER,
      min: min.toString(),
      max: max.toString(),
      step: step.toString(),
      value: max.toString(),
      className: FILTERS_STYLES.RANGE_INPUT,
      eventType: 'change',
      callback: (): void => {
        if (minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement)
          ProductFilters.handleMaxInputChange(filterId, max, minInput, maxInput);
      },
    }).getElement();

    if (minInput instanceof HTMLInputElement && maxInput instanceof HTMLInputElement) {
      this.filters.ranges.set(filterId, { min: minInput, max: maxInput });
    }

    return { minInput, maxInput };
  }

  private createRangeFilter(
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

    const { minInput, maxInput } = this.createRangeInputs(filterId, min, max, step);

    inputsContainer.append(minLabel, minInput, maxLabel, maxInput);
    rangeContainer.append(filterTitle, inputsContainer);

    return rangeContainer;
  }

  private createFilters(): HTMLElement[] {
    const filters: HTMLElement[] = [];

    for (const config of this.filterConfigs!.checkbox) {
      filters.push(
        this.createCheckboxFilter({
          title: config.title,
          options: config.options,
          filterId: config.id,
        })
      );
    }

    for (const config of this.filterConfigs!.range) {
      filters.push(
        this.createRangeFilter(
          config.title,
          config.min,
          config.max,
          FILTER_RANGES.DEFAULT.STEP,
          config.id
        )
      );
    }

    for (const config of this.filterConfigs!.dropdown) {
      filters.push(this.createDropdownFilter(config.title, config.options, config.id));
    }

    return filters;
  }

  private handleFilterChange = (): void => {
    if (this.filterConfigs) {
      for (const config of this.filterConfigs.checkbox) {
        const checkboxes = this.filters.checkboxes.get(config.id);
        if (checkboxes) {
          for (const checkbox of checkboxes) {
            const selectedOptions = filterState.getSelectedOptions(config.id);
            checkbox.checked = [...selectedOptions].some((option) => option.key === checkbox.value);
          }
        }
      }

      for (const config of this.filterConfigs.range) {
        const range = this.filters.ranges.get(config.id);
        if (range) {
          const values = [...filterState.getSelectedOptions(config.id)];
          const [minValue, maxValue] = values.length > 0 ? values[0].key.split('-') : ['', ''];

          range.min.value = minValue || config.min.toString();
          range.max.value = maxValue || config.max.toString();
        }
      }

      for (const config of this.filterConfigs.dropdown) {
        const select = this.filters.dropdowns.get(config.id);
        if (select) {
          const values = [...filterState.getSelectedOptions(config.id)];
          select.value = values.length > 0 ? values[0].key : '';
        }
      }
    }
  };
}
