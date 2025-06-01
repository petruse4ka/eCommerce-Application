import { filterState } from '@/store/filter-state';
import { productsState } from '@/store/products-state';
import { userState } from '@/store/user-state';
import { ApiEndpoint, ApiMethods, ContentType, FilterType } from '@/types/enums';
import { isCategoryResponse, isProductResponse, isProductTypeResponse } from '@/types/guards';
import type { FilterRequest, Product, Products, ProductTypeResponse } from '@/types/interfaces';
import TransformApiProductsData from '@/utils/transform-api-product-data';

export default class CatalogAPI {
  private static fractionDigits: number = 2;

  public static initialize(): void {
    productsState.subscribe(() => {
      const products = productsState.getProducts();
      if (products.length > 0 && products[0].fractionDigits) {
        CatalogAPI.fractionDigits = products[0].fractionDigits;
      }
    });
  }

  public static async getProducts(filters: FilterRequest = {}): Promise<{
    products: Products[];
    productData: Product[];
  } | void> {
    const token = userState.getTokenState();

    try {
      const queryParameters = CatalogAPI.handleFilters(filters);
      const currentSort = filterState.getCurrentSort();
      if (currentSort) queryParameters.append('sort', currentSort);

      const searchQuery = filterState.getSearchQuery();
      if (searchQuery) {
        const queryText = `*${searchQuery}*`;
        queryParameters.append('text.ru', queryText);
        queryParameters.append('fuzzy', 'true');
        queryParameters.append('fuzzyLevel', '2');
      }
      queryParameters.append('limit', '500');
      const url = `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}/product-projections/search?${queryParameters.toString()}`;

      const response = await fetch(url, {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data: unknown = await response.json();

      if (isProductResponse(data)) {
        return {
          products: TransformApiProductsData.transformProducts(data),
          productData: data.results,
        };
      }

      throw new Error('Invalid product response format');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  public static async getProductTypes(): Promise<ProductTypeResponse | void> {
    const token = userState.getTokenState();

    try {
      const response = await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.PRODUCT_TYPES}`,
        {
          method: ApiMethods.GET,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': ContentType.JSON,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data: unknown = await response.json();

      if (isProductTypeResponse(data)) {
        return data;
      }

      throw new Error('Invalid product type response format');
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  }

  public static async getCategories(): Promise<Array<{
    id: string;
    name: { [key: string]: string };
  }> | void> {
    const token = userState.getTokenState();

    try {
      const response = await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.CATEGORIES}`,
        {
          method: ApiMethods.GET,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': ContentType.JSON,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data: unknown = await response.json();

      if (isCategoryResponse(data)) {
        return data.results;
      }

      throw new Error('Invalid category response format');
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  private static handleFilters(filters: FilterRequest): URLSearchParams {
    const queryParameters = new URLSearchParams();

    for (const [filterId, options] of Object.entries(filters)) {
      const values = [...options].map((option) => option.key).filter((value) => value !== '');

      if (values.length === 0) continue;

      const filterValue = values.map((value) => `"${value}"`).join(',');
      const firstOption = [...options][0];

      if (filterId === 'price') {
        const [min, max] = values[0].split('-');
        const priceMultiplier = 10 ** CatalogAPI.fractionDigits;

        const minCents = Math.floor(Number(min) * priceMultiplier);
        const maxCents = Math.ceil(Number(max) * priceMultiplier);
        queryParameters.append(
          'filter',
          `variants.price.centAmount:range(${minCents} to ${maxCents})`
        );
      } else if (filterId === 'category') {
        queryParameters.append('filter', `categories.id:${filterValue}`);
      } else
        switch (firstOption.type) {
          case FilterType.RANGE: {
            const [min, max] = values[0].split('-');
            queryParameters.append(
              'filter',
              `variants.attributes.${filterId}:range(${min} to ${max})`
            );

            break;
          }
          case FilterType.DROPDOWN: {
            queryParameters.append('filter', `variants.attributes.${filterId}:"${values[0]}"`);

            break;
          }
          case FilterType.CHECKBOX: {
            queryParameters.append('filter', `variants.attributes.${filterId}.key:${filterValue}`);

            break;
          }
        }
    }

    return queryParameters;
  }
}
