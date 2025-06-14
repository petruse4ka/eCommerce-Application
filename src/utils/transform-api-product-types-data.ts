import { CATALOG_TEXTS, FILTER_RANGES } from '@/constants';
import { DROPDOWN_OPTIONS } from '@/constants';
import { FilterType } from '@/types/enums';
import type {
  CheckboxFilter,
  CheckboxOption,
  FilterConfigs,
  Product,
  ProductTypeAttribute,
  ProductTypeResponse,
  RangeFilter,
} from '@/types/interfaces';

export default class TransformApiProductTypesData {
  public static transformProductTypes(
    response: ProductTypeResponse,
    products: Product[],
    categories: Array<{ id: string; name: { [key: string]: string } }>
  ): FilterConfigs {
    const checkboxFilters: FilterConfigs['checkbox'] = [];
    const dropdownFilters: FilterConfigs['dropdown'] = [];
    const rangeFilters: FilterConfigs['range'] = [];

    const priceFilter = this.createPriceFilter(products);
    if (priceFilter) {
      rangeFilters.push(priceFilter);
    }

    const categoryFilter = this.createCategoryFilter(categories);
    if (categoryFilter) {
      checkboxFilters.push(categoryFilter);
    }

    this.handleProductTypeAttributes(response, checkboxFilters, dropdownFilters, rangeFilters);

    return {
      checkbox: checkboxFilters,
      range: rangeFilters,
      dropdown: dropdownFilters,
    };
  }

  private static handleProductTypeAttributes(
    response: ProductTypeResponse,
    checkboxFilters: FilterConfigs['checkbox'],
    dropdownFilters: FilterConfigs['dropdown'],
    rangeFilters: FilterConfigs['range']
  ): void {
    for (const productType of response.results) {
      for (const attribute of productType.attributes) {
        if (!attribute.isSearchable) continue;

        const filterId = attribute.name;
        if (this.isFilterHandled(filterId, checkboxFilters, dropdownFilters, rangeFilters)) {
          continue;
        }

        const filterTitle = attribute.label['ru'] || attribute.name;

        this.handleAttribute(
          attribute,
          filterId,
          filterTitle,
          checkboxFilters,
          dropdownFilters,
          rangeFilters
        );
      }
    }
  }

  private static isFilterHandled(
    filterId: string,
    checkboxFilters: FilterConfigs['checkbox'],
    dropdownFilters: FilterConfigs['dropdown'],
    rangeFilters: FilterConfigs['range']
  ): boolean {
    return (
      checkboxFilters.some((filter) => filter.id === filterId) ||
      rangeFilters.some((filter) => filter.id === filterId) ||
      dropdownFilters.some((filter) => filter.id === filterId)
    );
  }

  private static handleAttribute(
    attribute: ProductTypeAttribute,
    filterId: string,
    filterTitle: string,
    checkboxFilters: FilterConfigs['checkbox'],
    dropdownFilters: FilterConfigs['dropdown'],
    rangeFilters: FilterConfigs['range']
  ): void {
    switch (attribute.type.name) {
      case 'set': {
        this.handleSetType(attribute, filterId, filterTitle, checkboxFilters);
        break;
      }
      case 'boolean': {
        this.handleBooleanType(filterId, filterTitle, dropdownFilters);
        break;
      }
      case 'number': {
        this.handleNumberType(filterId, filterTitle, rangeFilters);
        break;
      }
    }
  }

  private static handleSetType(
    attribute: ProductTypeAttribute,
    filterId: string,
    filterTitle: string,
    checkboxFilters: FilterConfigs['checkbox']
  ): void {
    if (attribute.type.elementType?.name === 'enum') {
      const options = this.createCheckboxOptions(attribute.type.elementType.values || []);

      checkboxFilters.push({
        id: filterId,
        type: FilterType.CHECKBOX,
        options,
        title: filterTitle,
      });
    }
  }

  private static handleBooleanType(
    filterId: string,
    filterTitle: string,
    dropdownFilters: FilterConfigs['dropdown']
  ): void {
    dropdownFilters.push({
      id: filterId,
      type: FilterType.DROPDOWN,
      options: [
        { value: '', text: DROPDOWN_OPTIONS.DEFAULT },
        { value: 'true', text: DROPDOWN_OPTIONS.TRUE },
        { value: 'false', text: DROPDOWN_OPTIONS.FALSE },
      ],
      title: filterTitle,
    });
  }

  private static handleNumberType(
    filterId: string,
    filterTitle: string,
    rangeFilters: FilterConfigs['range']
  ): void {
    rangeFilters.push({
      id: filterId,
      type: FilterType.RANGE,
      min: FILTER_RANGES.DEFAULT.MIN,
      max: FILTER_RANGES.DEFAULT.MAX,
      title: filterTitle,
    });
  }

  private static createCheckboxOptions(
    values: Array<{ key: string; label: string }>
  ): CheckboxOption[] {
    return values.map((value) => ({
      value: value.key,
      text: value.label,
    }));
  }

  private static createPriceFilter(products: Product[]): RangeFilter | null {
    const minPrice = FILTER_RANGES.PRICE.MIN;
    let maxPrice = FILTER_RANGES.PRICE.MIN;

    for (const product of products) {
      const variant = product.masterData?.current.masterVariant || product.masterVariant;

      if (variant?.prices?.length) {
        for (const price of variant.prices) {
          const fractionDigits = price.value.fractionDigits || 2;
          const priceDivider = 10 ** fractionDigits;
          const amount = price.value.centAmount / priceDivider;
          maxPrice = Math.max(maxPrice, amount);
        }
      }
    }

    if (maxPrice === FILTER_RANGES.PRICE.MIN) {
      maxPrice = FILTER_RANGES.PRICE.MAX;
    }

    return {
      id: CATALOG_TEXTS.PRICE_ID,
      type: FilterType.RANGE,
      min: minPrice,
      max: Math.ceil(maxPrice),
      title: CATALOG_TEXTS.PRICE,
    };
  }

  private static createCategoryFilter(
    categories: Array<{ id: string; name: { [key: string]: string } }>
  ): CheckboxFilter | null {
    const options: CheckboxOption[] = categories.map((category) => ({
      value: category.id,
      text: category.name['ru'] || category.id,
    }));

    return {
      id: CATALOG_TEXTS.CATEGORY_ID,
      type: FilterType.CHECKBOX,
      options,
      title: CATALOG_TEXTS.CATEGORY,
    };
  }
}
