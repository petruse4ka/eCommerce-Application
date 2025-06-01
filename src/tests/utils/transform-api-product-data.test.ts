import type { ProductResponse } from '@/types/interfaces';
import TransformApiProductsData from '@/utils/transform-api-product-data';

const mockResponse: ProductResponse = {
  limit: 20,
  offset: 0,
  count: 1,
  total: 1,
  results: [
    {
      id: 'test-product-id',
      version: 1,
      versionModifiedAt: '2025-05-28T15:56:44.526Z',
      lastMessageSequenceNumber: 1,
      createdAt: '2025-05-28T15:56:44.526Z',
      lastModifiedAt: '2025-05-28T15:56:44.526Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: { typeId: 'user', id: 'test-id' },
      },
      createdBy: {
        isPlatformClient: true,
        user: { typeId: 'user', id: 'test-id' },
      },
      productType: { typeId: 'product-type', id: 'test-id' },
      masterData: {
        current: {
          name: { ru: 'Тестовый продукт' },
          description: { ru: 'Тестовое описание' },
          categories: [],
          categoryOrderHints: {},
          slug: { ru: 'test-product' },
          masterVariant: {
            id: 1,
            sku: 'test-sku',
            key: 'test-key',
            prices: [
              {
                id: 'test-price',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'RUB',
                  centAmount: 1000,
                  fractionDigits: 2,
                },
                key: 'test-key',
                country: 'RU',
                discounted: {
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'RUB',
                    centAmount: 800,
                    fractionDigits: 2,
                  },
                  discount: {
                    typeId: 'test-discount',
                    id: 'test-id',
                  },
                },
              },
            ],
            images: [
              {
                url: 'test-image.jpg',
                dimensions: { w: 100, h: 100 },
              },
            ],
            attributes: [
              { name: 'name', value: 'Тестовый продукт' },
              { name: 'description', value: { ru: 'Тестовое описание' } },
            ],
          },
          variants: [],
        },
      },
    },
  ],
};

describe('TransformApiProductsData', () => {
  test('should transform API response to products array', () => {
    const result = TransformApiProductsData.transformProducts(mockResponse);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      name: 'Тестовый продукт',
      description: 'Тестовое описание',
      image: 'test-image.jpg',
      price: 10,
      discountedPrice: 8,
      fractionDigits: 2,
      imagesCount: 1,
    });
  });
});
