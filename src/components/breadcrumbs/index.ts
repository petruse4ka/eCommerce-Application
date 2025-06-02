import BaseComponent from '@/components/base';
import { CATALOG_TEXTS } from '@/constants';
import { filterState } from '@/store/filter-state';
import { BREADCRUMB_STYLES } from '@/styles/breadcrumbs';
import { Route } from '@/types/enums';
import type { Category } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

export default class Breadcrumbs extends BaseComponent {
  constructor() {
    super({
      tag: 'nav',
      className: BREADCRUMB_STYLES.CONTAINER,
    });

    this.render();
    filterState.subscribe(this.handleFilterChange);
  }

  private static createDefaultItem(text: string, route: Route, isDeepest: boolean): HTMLElement {
    const item = new ElementBuilder({
      tag: 'li',
      className: BREADCRUMB_STYLES.ITEM,
    }).getElement();

    const isActive = isDeepest && !filterState.getSelectedCategory();

    const link = new ElementBuilder({
      tag: 'span',
      className: isActive
        ? [...BREADCRUMB_STYLES.LINK, ...BREADCRUMB_STYLES.ACTIVE]
        : BREADCRUMB_STYLES.LINK,
      textContent: text,
      callback: (): void => {
        globalThis.location.href = route;
      },
    }).getElement();

    item.append(link);
    return item;
  }

  private static createCategoryItem(
    category: Category,
    isInternalCategory: boolean,
    isLast: boolean
  ): HTMLElement {
    const item = new ElementBuilder({
      tag: 'li',
      className: BREADCRUMB_STYLES.ITEM,
    }).getElement();

    const selectedCategory = filterState.getSelectedCategory();
    const selectedInternalCategory = filterState.getSelectedInternalCategory();
    const href =
      isInternalCategory && selectedCategory
        ? `${Route.CATALOG}?category=${selectedCategory.id}&intcategory=${category.id}`
        : `${Route.CATALOG}?category=${category.id}`;

    const isActive =
      isLast &&
      (isInternalCategory
        ? selectedInternalCategory?.id === category.id
        : selectedCategory?.id === category.id && !selectedInternalCategory);

    const link = new ElementBuilder({
      tag: 'span',
      className: isActive
        ? [...BREADCRUMB_STYLES.LINK, ...BREADCRUMB_STYLES.ACTIVE]
        : BREADCRUMB_STYLES.LINK,
      textContent: category.name['ru'] || category.id,
      callback: (): void => {
        globalThis.location.href = href;
      },
    }).getElement();

    item.append(link);
    return item;
  }

  private static createSeparator(): HTMLElement {
    return new ElementBuilder({
      tag: 'li',
      className: BREADCRUMB_STYLES.SEPARATOR,
      textContent: '→',
    }).getElement();
  }

  private handleFilterChange = (): void => {
    this.render();
  };

  private render(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    const list = new ElementBuilder({
      tag: 'ul',
      className: BREADCRUMB_STYLES.LIST,
    }).getElement();

    const homeItem = Breadcrumbs.createDefaultItem(CATALOG_TEXTS.HOME, Route.HOME, false);
    const separator = Breadcrumbs.createSeparator();
    const catalogItem = Breadcrumbs.createDefaultItem(
      CATALOG_TEXTS.CATALOG,
      Route.CATALOG,
      !filterState.getSelectedCategory()
    );

    list.append(homeItem, separator, catalogItem);

    const selectedCategory = filterState.getSelectedCategory();
    if (selectedCategory) {
      const categorySeparator = Breadcrumbs.createSeparator();
      const categoryItem = Breadcrumbs.createCategoryItem(
        selectedCategory,
        false,
        !filterState.getSelectedInternalCategory()
      );
      list.append(categorySeparator, categoryItem);

      const selectedInternalCategory = filterState.getSelectedInternalCategory();
      if (selectedInternalCategory) {
        const internalCategorySeparator = Breadcrumbs.createSeparator();
        const internalCategoryItem = Breadcrumbs.createCategoryItem(
          selectedInternalCategory,
          true,
          true
        );
        list.append(internalCategorySeparator, internalCategoryItem);
      }
    }

    this.component.append(list);
  }
}
