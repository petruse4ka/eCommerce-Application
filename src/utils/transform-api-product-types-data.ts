import { DropdownOptions, FilterType } from '@/types/enums';
import type {
  CheckboxOption,
  FilterConfigs,
  ProductTypeAttribute,
  ProductTypeResponse,
} from '@/types/interfaces';

export default class TransformApiProductTypesData {
  public static transformProductTypes(response: ProductTypeResponse): FilterConfigs {
    const checkboxFilters: FilterConfigs['checkbox'] = [];
    const dropdownFilters: FilterConfigs['dropdown'] = [];
    const rangeFilters: FilterConfigs['range'] = [];

    for (const productType of response.results) {
      for (const attribute of productType.attributes) {
        if (!attribute.isSearchable) continue;

        const filterId = attribute.name;
        const existingFilter =
          checkboxFilters.find((filter) => filter.id === filterId) ||
          rangeFilters.find((filter) => filter.id === filterId) ||
          dropdownFilters.find((filter) => filter.id === filterId);

        if (existingFilter) {
          continue;
        }

        const filterTitle = attribute.label['ru'] || attribute.name;

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
    }

    return {
      checkbox: checkboxFilters,
      range: rangeFilters,
      dropdown: dropdownFilters,
    };
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
        { value: '', text: DropdownOptions.DEFAULT },
        { value: 'true', text: DropdownOptions.TRUE },
        { value: 'false', text: DropdownOptions.FALSE },
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
      min: 0,
      max: 1000,
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
}
