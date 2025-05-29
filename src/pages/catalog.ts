import '@/styles/main.css';

import CatalogAPI from '@/api/catalog';
import BaseComponent from '@/components/base';
import ProductFilters from '@/components/catalog/product-filters';
import ProductList from '@/components/catalog/product-list';
import ProductSorting from '@/components/catalog/product-sorting';
import { CATALOG_TEXTS, LOADING_CONFIG, PAGE_TITLES } from '@/constants';
import { userState } from '@/store/user-state';
import { CATALOG_STYLES } from '@/styles/pages/catalog';
import ElementBuilder from '@/utils/element-builder';

export default class CatalogPage extends BaseComponent {
  private productList: ProductList;
  private productSorting: ProductSorting;
  private isLoading: boolean;
  private loadingOverlay: HTMLElement;

  constructor() {
    super({
      tag: 'div',
      className: CATALOG_STYLES.PAGE_CONTAINER,
    });
    this.productList = new ProductList();
    this.productSorting = new ProductSorting();
    this.isLoading = true;
    this.loadingOverlay = CatalogPage.createLoadingOverlay();
    this.render();
    void this.loadProducts();
  }

  private static createLoadingOverlay(): HTMLElement {
    const overlay = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.LOADING_OVERLAY,
    }).getElement();

    const spinnerContainer = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.SPINNER_CONTAINER,
    }).getElement();

    const spinner = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.LOADING_SPINNER,
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: CATALOG_STYLES.LOADING_TEXT,
      textContent: CATALOG_TEXTS.LOADING_PRODUCTS,
    }).getElement();

    spinnerContainer.append(spinner, text);
    overlay.append(spinnerContainer);

    return overlay;
  }

  private async loadProducts(): Promise<void> {
    try {
      let attempts = 0;

      while (attempts < LOADING_CONFIG.MAX_ATTEMPTS) {
        const token = userState.getTokenState();
        if (token) {
          const loadedProducts = await CatalogAPI.getProducts();
          if (loadedProducts) {
            this.productList.updateProducts(loadedProducts);
            this.productSorting.updateProductCount(loadedProducts.length);
          }
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, LOADING_CONFIG.DELAY));
        attempts += 1;
      }

      throw new Error('Failed to get authentication token');
    } catch (error) {
      console.error('Error loading products:', error);
      this.productList.showError('Failed to load products');
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  private render(): void {
    while (this.component.firstChild) {
      this.component.firstChild.remove();
    }

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

    const productListContainer = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.PRODUCT_LIST_CONTAINER,
    }).getElement();

    const productFilters = new ProductFilters().getElement();

    filtersSection.append(productFilters);
    productListContainer.append(this.productList.getElement());

    if (this.isLoading) {
      productListContainer.append(this.loadingOverlay);
    }

    productListSection.append(this.productSorting.getElement(), productListContainer);
    catalogContainer.append(filtersSection, productListSection);

    this.component.append(title, catalogContainer);
  }
}
