import type { Product, ProductResponse, Products, ProductVariantView } from '@/types/interfaces';

export default class TransformApiProductsData {
  public static transformProducts(response: ProductResponse): Products[] {
    const products: Products[] = [];

    for (const product of response.results) {
      const masterVariant = product.masterData?.current?.masterVariant || product.masterVariant;

      if (masterVariant) {
        const nameAttribute = masterVariant.attributes?.find(
          (attribute) => attribute.name === 'name'
        );
        const descAttribute = masterVariant.attributes?.find(
          (attribute) => attribute.name === 'description'
        );

        const fractionDigits = masterVariant.prices[0]?.value.fractionDigits || 2;
        const priceDivider = 10 ** fractionDigits;

        products.push({
          name: typeof nameAttribute?.value === 'string' ? nameAttribute.value : '',
          description:
            typeof descAttribute?.value === 'object' && 'ru' in descAttribute.value
              ? descAttribute.value['ru']
              : '',
          image: masterVariant.images?.[0]?.url || '',
          price: masterVariant.prices[0]?.value.centAmount / priceDivider || 0,
          discountedPrice: masterVariant.prices[0]?.discounted?.value.centAmount
            ? masterVariant.prices[0].discounted.value.centAmount / priceDivider
            : undefined,
          fractionDigits,
          imagesCount: masterVariant.images?.length || 0,
        });
      }
    }

    return products;
  }

  public static transformProduct(response: Product): ProductVariantView {
    if (response.masterData) {
      const masterVariant = response.masterData.current.masterVariant;
      const { attributes, prices, images } = masterVariant;

      return {
        attributes,
        prices,
        images,
      };
    }
    return { attributes: [], prices: [], images: [] };
  }
}
