import { userState } from '@/store/user-state';
import { ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import { isCategoryResponse, isProductResponse, isProductTypeResponse } from '@/types/guards';
import type { Product, Products, ProductTypeResponse } from '@/types/interfaces';
import TransformApiProductsData from '@/utils/transform-api-product-data';

export default class CatalogAPI {
  public static async getProducts(): Promise<{
    products: Products[];
    productData: Product[];
  } | void> {
    const token = userState.getTokenState();

    try {
      const response = await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.PRODUCTS}`,
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
}
