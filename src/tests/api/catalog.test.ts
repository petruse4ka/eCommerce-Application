import CatalogAPI from '@/api/catalog';
import { filterState } from '@/store/filter-state';
import { productsState } from '@/store/products-state';
import { userState } from '@/store/user-state';
import { ApiMethods, ContentType } from '@/types/enums';
import type { ProductResponse } from '@/types/interfaces';

const mockResponse: ProductResponse = {
  limit: 20,
  offset: 0,
  count: 1,
  total: 1,
  results: [
    {
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
  beforeEach(() => {
    filterState.setSearchQuery('');
    productsState.updateProducts([]);
    userState.setTokenState('test-token');
  });

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

describe('CatalogAPI', () => {
  it('should handle search query correctly', async () => {
    filterState.setSearchQuery('test');

    const mockResponse = {
      limit: 20,
      offset: 0,
      count: 0,
      total: 0,
      results: [],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await CatalogAPI.getProducts();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('text.ru=*test*'),
      expect.any(Object)
    );
  });
});

describe('CatalogAPI', () => {
  it('should fetch categories successfully', async () => {
    const mockResponse = {
      results: [
        {
          id: 'test-category',
          name: { ru: 'Тестовая Категория' },
        },
      ],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await CatalogAPI.getCategories();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/categories'),
      expect.objectContaining({
        method: ApiMethods.GET,
        headers: {
          Authorization: 'Bearer test-token',
          'Content-Type': ContentType.JSON,
        },
      })
    );

    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(result?.[0].id).toBe('test-category');
  });

  it('should handle error response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
    });

    const result = await CatalogAPI.getCategories();

    expect(result).toBeUndefined();
  });
});
