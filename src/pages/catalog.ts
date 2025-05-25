import '@/styles/main.css';

import BaseComponent from '@/components/base';
import ProductFilters from '@/components/catalog/product-filters';
import ProductList from '@/components/catalog/product-list';
import { PAGE_TITLES } from '@/constants';
import { CATALOG_STYLES } from '@/styles/pages/catalog';
import ElementBuilder from '@/utils/element-builder';

export default class CatalogPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: CATALOG_STYLES.PAGE_CONTAINER,
    });
    this.render();
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: CATALOG_STYLES.TITLE,
      textContent: PAGE_TITLES.CATALOG,
    }).getElement();

    const catalogContainer = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.CATALOG_CONTAINER,
    }).getElement();

    const filtersSection = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.FILTERS_SECTION,
    }).getElement();

    const productListSection = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.PRODUCT_LIST_SECTION,
    }).getElement();

    const productList = new ProductList().getElement();
    const productFilters = new ProductFilters().getElement();

    filtersSection.append(productFilters);
    productListSection.append(productList);
    catalogContainer.append(filtersSection);
    catalogContainer.append(productListSection);

    this.component.append(title);
    this.component.append(catalogContainer);
  }
}
