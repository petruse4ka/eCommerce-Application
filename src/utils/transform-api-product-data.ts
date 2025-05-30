import type { Macarons, Product, ProductResponse, ProductVariantView } from '@/types/interfaces';

export default class TransformApiProductsData {
  public static transformProducts(response: ProductResponse): Macarons[] {
    const products: Macarons[] = [];

    for (const product of response.results) {
      const masterVariant = product.masterData.current.masterVariant;

      if (masterVariant) {
        const nameAttribute = masterVariant.attributes?.find(
          (attribute) => attribute.name === 'name'
        );
        const descAttribute = masterVariant.attributes?.find(
          (attribute) => attribute.name === 'description'
        );

        products.push({
          name: typeof nameAttribute?.value === 'string' ? nameAttribute.value : '',
          description:
            typeof descAttribute?.value === 'object' && 'ru' in descAttribute.value
              ? descAttribute.value['ru']
              : '',
          image: masterVariant.images?.[0]?.url || '',
          price: masterVariant.prices[0]?.value.centAmount / 100 || 0,
          discountedPrice: masterVariant.prices[0]?.discounted?.value.centAmount
            ? masterVariant.prices[0].discounted.value.centAmount / 100
            : undefined,
        });
      }
    }

    return products;
  }

  public static transformProduct(response: Product): ProductVariantView {
    const masterVariant = response.masterData.current.masterVariant;
    const { attributes, prices, images } = masterVariant;

    return {
      attributes,
      prices,
      images,
    };
  }
}
