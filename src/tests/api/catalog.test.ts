import CatalogAPI from '@/api/catalog';
import type { ProductResponse } from '@/types/interfaces';

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

describe('CatalogAPI', () => {
  test('should fetch products successfully', async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await CatalogAPI.getProducts();

    expect(result).toBeDefined();
    expect(result?.products).toHaveLength(1);
    expect(result?.products[0].name).toBe('Тестовый продукт');
  });

  test('should handle fetch error', async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await CatalogAPI.getProducts();

    expect(result).toBeUndefined();
  });
});
