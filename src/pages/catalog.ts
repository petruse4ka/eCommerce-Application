import '@/styles/main.css';

import CatalogAPI from '@/api/catalog';
import BaseComponent from '@/components/base';
import Breadcrumbs from '@/components/breadcrumbs';
import Categories from '@/components/catalog/categories';
import ProductFilters from '@/components/catalog/product-filters';
import ProductList from '@/components/catalog/product-list';
import ProductSorting from '@/components/catalog/product-sorting';
import SelectedFilters from '@/components/catalog/selected-filters';
import LoaderOverlay from '@/components/overlay/loader-overlay';
import { CATALOG_TEXTS, LOADING_CONFIG, PAGE_TITLES } from '@/constants';
import { filterState } from '@/store/filter-state';
import { productsState } from '@/store/products-state';
import { userState } from '@/store/user-state';
import { CATALOG_STYLES } from '@/styles/pages/catalog';
import { isCategory } from '@/types/guards';
import type { CategoryResponse, ProductApiResponse, ProductTypeResponse } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import TransformApiProductTypesData from '@/utils/transform-api-product-types-data';

export default class CatalogPage extends BaseComponent {
  private productList: ProductList;
  private productSorting: ProductSorting;
  private productFilters: ProductFilters;
  private selectedFilters: SelectedFilters;
  private breadcrumbs: Breadcrumbs;
  private categories: Categories | null;
  private isLoading: boolean;
  private productListLoader: LoaderOverlay;
  private filtersLoader: LoaderOverlay;

  constructor() {
    super({
      tag: 'div',
      className: CATALOG_STYLES.PAGE_CONTAINER,
    });
    this.productList = new ProductList();
    this.productSorting = new ProductSorting();
    this.productFilters = new ProductFilters();
    this.selectedFilters = new SelectedFilters();
    this.breadcrumbs = new Breadcrumbs();
    this.categories = null;
    this.isLoading = true;
    this.productListLoader = new LoaderOverlay({
      text: CATALOG_TEXTS.LOADING_PRODUCTS,
      className: CATALOG_STYLES.OVERLAY_PRODUCTS,
    });
    this.filtersLoader = new LoaderOverlay({
      text: CATALOG_TEXTS.LOADING_FILTERS,
      className: CATALOG_STYLES.OVERLAY_FILTERS,
    });
    this.render();
    void this.loadProducts();
    filterState.subscribe(() => {
      void this.handleFilterChange();
    });
  }

  private handleCategories(loadedCategories: CategoryResponse['results'] | null): void {
    if (loadedCategories && loadedCategories.every((category) => isCategory(category))) {
      const renderedCategories = loadedCategories.map((category) => ({
        ...category,
        typeId: 'category',
        ancestors: category.ancestors,
      }));
      this.categories = new Categories(renderedCategories);
    }
  }

  private handleProductTypes(
    loadedProductTypes: ProductTypeResponse,
    productsData: ProductApiResponse,
    loadedCategories: CategoryResponse['results'] | null
  ): void {
    const filterConfigs = TransformApiProductTypesData.transformProductTypes(
      loadedProductTypes,
      productsData.productData,
      loadedCategories || []
    );
    this.productFilters.updateFilters(filterConfigs);
    this.selectedFilters.updateFilterConfigs(filterConfigs);
  }

  private async loadProducts(): Promise<void> {
    try {
      let attempts = 0;

      while (attempts < LOADING_CONFIG.MAX_ATTEMPTS) {
        if (userState.getTokenState()) {
          const [productsData, loadedProductTypes, loadedCategories] = await Promise.all([
            CatalogAPI.getProducts(),
            CatalogAPI.getProductTypes(),
            CatalogAPI.getCategories(),
          ]);

          if (productsData) {
            productsState.updateProducts(productsData.products);
            this.productSorting.updateProductCount(productsData.products.length);

            if (loadedProductTypes && loadedCategories) {
              this.handleProductTypes(loadedProductTypes, productsData, loadedCategories);
            }

            if (loadedCategories) {
              this.handleCategories(loadedCategories);
            }

            this.isLoading = false;
            this.render();
            return;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, LOADING_CONFIG.DELAY));
        attempts += 1;
      }

      throw new Error('Failed to get authentication token');
    } catch (error) {
      console.error('Error loading products:', error);
      this.isLoading = false;
      productsState.updateProducts([]);
      this.productFilters.updateFilters({ checkbox: [], range: [], dropdown: [] });
      this.selectedFilters.updateFilterConfigs({ checkbox: [], range: [], dropdown: [] });
      this.render();
    }
  }

  private handleFilterChange = async (): Promise<void> => {
    this.isLoading = true;
    this.render();

    const selectedFilters = filterState.getSelectedFilters();
    const productsData = await CatalogAPI.getProducts(selectedFilters);

    if (productsData) {
      productsState.updateProducts(productsData.products);
      this.productSorting.updateProductCount(productsData.products.length);
    }

    this.isLoading = false;
    this.render();
  };

  private render(): void {
    while (this.component.firstChild) this.component.firstChild.remove();

    this.component.append(this.breadcrumbs.getElement());

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

    filtersSection.append(this.selectedFilters.getElement());

    if (this.categories) filtersSection.append(this.categories.getElement());
    filtersSection.append(this.productFilters.getElement());

    if (this.isLoading) {
      this.productFilters.getElement().append(this.filtersLoader.getElement());
    } else {
      this.filtersLoader.getElement().remove();
    }

    const productListSection = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.PRODUCT_LIST_SECTION,
    }).getElement();

    const productListContainer = new ElementBuilder({
      tag: 'div',
      className: CATALOG_STYLES.PRODUCT_LIST_CONTAINER,
    }).getElement();

    productListContainer.append(this.productList.getElement());
    if (this.isLoading) productListContainer.append(this.productListLoader.getElement());

    productListSection.append(this.productSorting.getElement(), productListContainer);
    catalogContainer.append(filtersSection, productListSection);

    this.component.append(title, catalogContainer);
  }
}
