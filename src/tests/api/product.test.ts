import { getProductData } from '@/api/product';
import { userState } from '@/store/user-state';
import type { Product, ProductVariantView } from '@/types/interfaces';

const mockResponse: Product = {
  id: 'test-product-id',
  key: 'test-key',
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
        images: [],
        attributes: [
          { name: 'name', value: 'Тестовый продукт' },
          { name: 'description', value: { ru: 'Тестовое описание' } },
        ],
      },
      variants: [],
    },
  },
};

const transformedResponse: ProductVariantView = {
  id: 'test-product-id',
  attributes: [
    { name: 'name', value: 'Тестовый продукт' },
    { name: 'description', value: { ru: 'Тестовое описание' } },
  ],
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
  images: [],
};

describe('ProductAPI', () => {
  beforeEach(() => {
    userState.setTokenState('test-token');
  });

  test('should fetch product successfully', async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getProductData.getProduct('test-key');

    expect(result).toBeDefined();
    expect(result).toEqual(transformedResponse);
  });

  test('should handle fetch error', async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getProductData.getProduct('test-key');

    expect(result).toBeUndefined();
  });

  test('should handle error response', async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    const result = await getProductData.getProduct('test-key');

    expect(result).toBeUndefined();
  });
});
