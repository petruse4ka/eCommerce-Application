import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { CATALOG_TEXTS } from '@/constants';
import { filterState } from '@/store/filter-state';
import { FILTERS_STYLES } from '@/styles/catalog/product-filters';
import { FilterType } from '@/types/enums';
import type { FilterConfigs } from '@/types/interfaces';
import type { ActionHandler } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';

export default class SelectedFilters extends BaseComponent {
  private filterConfigs: FilterConfigs;

  constructor() {
    super({ tag: 'div', className: FILTERS_STYLES.SELECTED_FILTERS_CONTAINER });
    this.filterConfigs = { checkbox: [], range: [], dropdown: [] };
    this.render();
    filterState.subscribe(this.handleFilterChange);
  }

  private static createClearAllButton(): HTMLElement {
    return new Button({
      style: 'SECONDARY_PINK_FILTER',
      textContent: CATALOG_TEXTS.CLEAR_ALL,
      callback: (): void => {
        filterState.clearAll();
      },
    }).getElement();
  }

  public updateFilterConfigs(config: FilterConfigs): void {
    this.filterConfigs = config;
    this.render();
  }

  public override remove(): void {
    filterState.unsubscribe(this.handleFilterChange);
    super.remove();
  }

  private createFilterItem(filterId: string, value: string): HTMLElement {
    const item = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_ITEM,
    }).getElement();

    const itemValue = new ElementBuilder({
      tag: 'span',
      className: FILTERS_STYLES.FILTER_ITEM_VALUE,
      textContent: value,
    }).getElement();

    const removeButton = new Button({
      style: 'FILTER_TAG_DELETE',
      textContent: '×',
      callback: (): void => {
        const isRange = this.filterConfigs.range.some(({ id }) => id === filterId);
        const isDropdown = this.filterConfigs.dropdown.some(({ id }) => id === filterId);
        let type = undefined;
        if (isRange) {
          type = FilterType.RANGE;
        } else if (isDropdown) {
          type = FilterType.DROPDOWN;
        } else {
          type = FilterType.CHECKBOX;
        }
        filterState.toggleOption(filterId, isRange || isDropdown ? '' : value, type);
      },
    }).getElement();

    item.append(itemValue, removeButton);
    return item;
  }

  private createFilterList(filterId: string, values: Set<string>): HTMLElement {
    const list = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_LIST,
    }).getElement();

    const filterConfig = [
      ...this.filterConfigs.checkbox,
      ...this.filterConfigs.range,
      ...this.filterConfigs.dropdown,
    ].find((config) => config.id === filterId);

    const title = new ElementBuilder({
      tag: 'span',
      className: FILTERS_STYLES.FILTER_LIST_TITLE,
      textContent: filterConfig?.title || filterId,
    }).getElement();

    const itemContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_TAGS,
    }).getElement();

    for (const value of values) {
      const item = this.createFilterItem(filterId, value);
      itemContainer.append(item);
    }

    list.append(title, itemContainer);
    return list;
  }

  private handleFilterChange: ActionHandler = () => {
    this.render();
  };

  private render(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    const selectedFilters = filterState.getSelectedFilters();
    const hasFilters = Object.keys(selectedFilters).some(
      (filterId) => selectedFilters[filterId]?.size > 0
    );

    const title = new ElementBuilder({
      tag: 'h3',
      className: FILTERS_STYLES.FILTERS_TITLE,
      textContent: CATALOG_TEXTS.APPLIED_FILTERS,
    }).getElement();

    this.component.append(title);

    if (!hasFilters) {
      const message = new ElementBuilder({
        tag: 'p',
        className: FILTERS_STYLES.NO_FILTERS_MESSAGE,
        textContent: CATALOG_TEXTS.NO_APPLIED_FILTERS,
      }).getElement();

      this.component.append(message);
      return;
    }

    const listContainer = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTERS_CONTAINER,
    }).getElement();

    for (const [filterId, values] of Object.entries(selectedFilters)) {
      if (values.size > 0) {
        const list = this.createFilterList(filterId, values);
        listContainer.append(list);
      }
    }

    const clearAllButton = SelectedFilters.createClearAllButton();

    this.component.append(listContainer, clearAllButton);
  }
}
