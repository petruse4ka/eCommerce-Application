import { CATALOG_TEXTS } from '@/constants';
import { FilterType } from '@/types/enums';
import type { ProductTypeResponse } from '@/types/interfaces';
import TransformApiProductTypesData from '@/utils/transform-api-product-types-data';

const mockProductTypeResponse: ProductTypeResponse = {
  limit: 20,
  offset: 0,
  count: 1,
  total: 1,
  results: [
    {
      id: 'test-product-id',
      version: 1,
      versionModifiedAt: '2025-05-28T15:56:44.526Z',
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
      name: 'Тестовое название',
      description: 'Тестовое описание',
      key: 'test-type-key',
      classifier: 'test-classifier',
      attributes: [
        {
          name: 'test-enum',
          label: { ru: 'Тестовый Enum' },
          isRequired: true,
          isSearchable: true,
          inputTip: { ru: '' },
          attributeConstraint: 'None',
          inputHint: 'SingleLine',
          displayGroup: 'Other',
          level: '1',
          type: {
            name: 'set',
            elementType: {
              name: 'enum',
              values: [
                { key: 'key', label: 'Тестовое значение 1' },
                { key: 'anotherkey', label: 'Тестовое значение 2' },
              ],
            },
          },
        },
      ],
    },
  ],
};

const mockCategories = [
  {
    id: 'test-category',
    name: { ru: 'Тестовая категория' },
  },
];

describe('TransformApiProductTypesData', () => {
  test('should transform product types to filter configs', () => {
    const result = TransformApiProductTypesData.transformProductTypes(
      mockProductTypeResponse,
      [],
      mockCategories
    );

    expect(result.checkbox).toHaveLength(2);
    expect(result.range).toHaveLength(1);
    expect(result.dropdown).toHaveLength(0);

    const priceFilter = result.range.find((filter) => filter.id === CATALOG_TEXTS.PRICE_ID);
    expect(priceFilter).toBeDefined();
    expect(priceFilter?.type).toBe(FilterType.RANGE);

    const categoryFilter = result.checkbox.find(
      (filter) => filter.id === CATALOG_TEXTS.CATEGORY_ID
    );
    expect(categoryFilter).toBeDefined();
    expect(categoryFilter?.type).toBe(FilterType.CHECKBOX);
    expect(categoryFilter?.options).toHaveLength(1);
  });
});
