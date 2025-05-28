import type { Macarons, ProductResponse } from '@/types/interfaces';

export default class TransformApiProductsData {
  public static transformProducts(response: ProductResponse): Macarons[] {
    const products: Macarons[] = [];

    for (const product of response.results) {
      const variants = [
        product.masterData.current.masterVariant,
        ...(product.masterData.current.variants || []),
      ];

      if (variants.length > 0) {
        for (const variant of variants) {
          const nameAttribute = variant.attributes?.find((attribute) => attribute.name === 'name');
          const descAttribute = variant.attributes?.find(
            (attribute) => attribute.name === 'description'
          );

          products.push({
            name: typeof nameAttribute?.value === 'string' ? nameAttribute.value : '',
            description:
              typeof descAttribute?.value === 'object' && 'ru' in descAttribute.value
                ? descAttribute.value['ru']
                : '',
            image: variant.images?.[0]?.url || '',
            price: variant.prices[0]?.value.centAmount / 100 || 0,
            discountedPrice: variant.prices[0]?.discounted?.value.centAmount
              ? variant.prices[0].discounted.value.centAmount / 100
              : undefined,
          });
        }
      }
    }

    return products;
  }
}
