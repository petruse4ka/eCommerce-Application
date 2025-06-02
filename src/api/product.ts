import { userState } from '@/store/user-state';
import { ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import type { Product, ProductVariantView } from '@/types/interfaces';
import TransformApiProductsData from '@/utils/transform-api-product-data';

export const getProductData = {
  async getProduct(key: string): Promise<ProductVariantView | void> {
    const token = userState.getTokenState();

    return await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.PRODUCTS}/key=${key}`,
      {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((body: Product): ProductVariantView => TransformApiProductsData.transformProduct(body))
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  },
};
