import { userState } from '@/store/user-state';
import { ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import { isProductResponse } from '@/types/guards';
import type { ProductResponse } from '@/types/interfaces';

export default class CatalogAPI {
  public static async getProducts(): Promise<ProductResponse | void> {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: unknown = await response.json();

      if (isProductResponse(data)) {
        return data;
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
}
