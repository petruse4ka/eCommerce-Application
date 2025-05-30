import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import { CATALOG_TEXTS } from '@/constants';
import { FILTER_CONFIGS, FILTER_TEXTS } from '@/data/products';
import { filterState } from '@/store/filter-state';
import { FILTERS_STYLES } from '@/styles/catalog/product-filters';
import type { ActionHandler } from '@/types/types';
import ElementBuilder from '@/utils/element-builder';

export default class SelectedFilters extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: FILTERS_STYLES.SELECTED_FILTERS_CONTAINER });
    this.render();
    filterState.subscribe(this.handleFilterChange);
  }

  private static createFilterItem(filterId: string, value: string): HTMLElement {
    const item = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_ITEM,
    }).getElement();

    const itemValue = new ElementBuilder({
      tag: 'span',
      className: FILTERS_STYLES.FILTER_ITEM_VALUE,
      textContent: FILTER_TEXTS[filterId]?.[value] || value,
    }).getElement();

    const removeButton = new Button({
      style: 'FILTER_TAG_DELETE',
      textContent: '×',
      callback: (): void => {
        const isRange = FILTER_CONFIGS.range.some(({ id }) => id === filterId);
        filterState.toggleOption(filterId, isRange ? '' : value);
      },
    }).getElement();

    item.append(itemValue, removeButton);
    return item;
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

  private static createFilterList(filterId: string, values: Set<string>): HTMLElement {
    const list = new ElementBuilder({
      tag: 'div',
      className: FILTERS_STYLES.FILTER_LIST,
    }).getElement();

    const filterConfig = [
      ...FILTER_CONFIGS.checkbox,
      ...FILTER_CONFIGS.range,
      ...FILTER_CONFIGS.dropdown,
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
      const item = SelectedFilters.createFilterItem(filterId, value);
      itemContainer.append(item);
    }

    list.append(title, itemContainer);
    return list;
  }

  public override remove(): void {
    filterState.unsubscribe(this.handleFilterChange);
    super.remove();
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
        const list = SelectedFilters.createFilterList(filterId, values);
        listContainer.append(list);
      }
    }

    const clearAllButton = SelectedFilters.createClearAllButton();

    this.component.append(listContainer, clearAllButton);
  }
}
