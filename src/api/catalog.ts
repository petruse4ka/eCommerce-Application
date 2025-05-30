import { userState } from '@/store/user-state';
import { ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import { isProductResponse } from '@/types/guards';
import type { Macarons } from '@/types/interfaces';
import TransformApiProductsData from '@/utils/transform-api-product-data';

export default class CatalogAPI {
  public static async getProducts(): Promise<Macarons[] | void> {
    const token = userState.getTokenState();

    try {
      const response = await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.PRODUCTS}?where=masterData(published=true)`,
        {
          method: ApiMethods.GET,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': ContentType.JSON,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: unknown = await response.json();

      if (isProductResponse(data)) {
        return TransformApiProductsData.transformProducts(data);
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
}
