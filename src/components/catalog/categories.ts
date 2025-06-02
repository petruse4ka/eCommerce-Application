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
  }

  private createCategoryItem(category: Category, isInternalCategory = false): HTMLElement {
    const item = new ElementBuilder({
      tag: 'li',
      className: CATEGORY_STYLES.ITEM,
    }).getElement();

    const button = new ElementBuilder({
      tag: 'button',
      className: isInternalCategory ? CATEGORY_STYLES.BUTTON : CATEGORY_STYLES.BUTTON_MAIN,
      textContent: category.name['ru'],
      callback: (): void => {
        if (isInternalCategory) {
          const mainCategoryId = category.ancestors[0]?.id;
          if (mainCategoryId) {
            const mainCategory = this.categories.find(
              (category: Category) => category.id === mainCategoryId
            );
            if (mainCategory) {
              filterState.setCategory(mainCategory);
            }
          }
          filterState.setSubCategory(category);
        } else {
          filterState.setCategory(category);
          filterState.setSubCategory(null);
        }
      },
    }).getElement();

    item.append(button);

    return item;
  }

  private render(): void {
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

    for (const mainCategory of mainCategories) {
      const mainItem = this.createCategoryItem(mainCategory);
      list.append(mainItem);

      const internalCats = internalCategories.filter((internalCategory) =>
        internalCategory.ancestors.some((ancestor) => ancestor.id === mainCategory.id)
      );

      if (internalCats.length > 0) {
        const internalList = new ElementBuilder({
          tag: 'ul',
          className: CATEGORY_STYLES.INTERNAL_LIST,
        }).getElement();

        for (const internalCategory of internalCats) {
          const subItem = this.createCategoryItem(internalCategory, true);
          internalList.append(subItem);
        }

        list.append(internalList);
      }
    }

    this.component.append(title, list);
  }
}
