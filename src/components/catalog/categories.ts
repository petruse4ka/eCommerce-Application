import BaseComponent from '@/components/base';
import { CATALOG_TEXTS } from '@/constants';
import { filterState } from '@/store/filter-state';
import { CATEGORY_STYLES } from '@/styles/catalog/categories';
import type { Category } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

export default class Categories extends BaseComponent {
  private categories: Category[];

  constructor(categories: Category[]) {
    super({
      tag: 'div',
      className: CATEGORY_STYLES.CONTAINER,
    });

    this.categories = categories;
    this.render();
    filterState.subscribe(this.handleFilterChange);
  }

  private static createAllCategoriesSelector(): HTMLElement {
    const item = new ElementBuilder({
      tag: 'li',
      className: CATEGORY_STYLES.ITEM,
    }).getElement();

    const isActive = !filterState.getSelectedCategory();
    const selectorClasses = isActive
      ? [...CATEGORY_STYLES.SELECTOR_MAIN, ...CATEGORY_STYLES.ACTIVE]
      : CATEGORY_STYLES.SELECTOR_MAIN;

    const selector = new ElementBuilder({
      tag: 'div',
      className: selectorClasses,
      textContent: CATALOG_TEXTS.ALL_CATEGORIES,
      callback: (): void => {
        filterState.setCategory(null);
        filterState.setInternalCategory(null);
      },
    }).getElement();

    item.append(selector);
    return item;
  }

  private static getSelectorClasses(isInternalCategory: boolean, isActive: boolean): string[] {
    const defaultSelectorClass = isInternalCategory
      ? CATEGORY_STYLES.SELECTOR
      : CATEGORY_STYLES.SELECTOR_MAIN;
    return isActive ? [...defaultSelectorClass, ...CATEGORY_STYLES.ACTIVE] : defaultSelectorClass;
  }

  private handleFilterChange = (): void => {
    this.render();
  };

  private createCategoryItem(category: Category, isInternalCategory: boolean): HTMLElement {
    const item = new ElementBuilder({
      tag: 'li',
      className: CATEGORY_STYLES.ITEM,
    }).getElement();

    const selectedCategory = filterState.getSelectedCategory();
    const selectedInternalCategory = filterState.getSelectedInternalCategory();

    const isActive = isInternalCategory
      ? selectedInternalCategory?.id === category.id
      : selectedCategory?.id === category.id && !selectedInternalCategory;

    const selector = new ElementBuilder({
      tag: 'div',
      className: Categories.getSelectorClasses(isInternalCategory, isActive),
      textContent: category.name['ru'],
      callback: (): void => {
        if (isInternalCategory) {
          const mainCategoryId = category.ancestors[0]?.id;
          if (mainCategoryId) {
            const mainCategory = this.categories.find(
              (category: Category) => category.id === mainCategoryId
            );
            if (mainCategory) {
              filterState.setCategoryAndInternalCategory(mainCategory, category);
            }
          }
        } else {
          filterState.setCategoryAndInternalCategory(category, null);
        }
      },
    }).getElement();

    item.append(selector);
    return item;
  }

  private createInternalCategoriesList(
    mainCategory: Category,
    subCategories: Category[]
  ): HTMLElement | null {
    const internalCategories = subCategories.filter((category) =>
      category.ancestors.some((ancestor) => ancestor.id === mainCategory.id)
    );

    if (internalCategories.length === 0) {
      return null;
    }

    const list = new ElementBuilder({
      tag: 'ul',
      className: CATEGORY_STYLES.INTERNAL_LIST,
    }).getElement();

    for (const internalCategory of internalCategories) {
      const internalItem = this.createCategoryItem(internalCategory, true);
      list.append(internalItem);
    }

    return list;
  }

  private render(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

    const title = new ElementBuilder({
      tag: 'h2',
      className: CATEGORY_STYLES.TITLE,
      textContent: CATALOG_TEXTS.CATEGORY,
    }).getElement();

    const mainCategories = this.categories.filter((category) => category.ancestors.length === 0);
    const internalCategories = this.categories.filter((category) => category.ancestors.length > 0);

    const list = new ElementBuilder({
      tag: 'ul',
      className: CATEGORY_STYLES.LIST,
    }).getElement();

    list.append(Categories.createAllCategoriesSelector());

    for (const mainCategory of mainCategories) {
      list.append(this.createCategoryItem(mainCategory, false));

      const internalCategoriesList = this.createInternalCategoriesList(
        mainCategory,
        internalCategories
      );
      if (internalCategoriesList) {
        list.append(internalCategoriesList);
      }
    }

    this.component.append(title, list);
  }
}
