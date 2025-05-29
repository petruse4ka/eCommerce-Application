import { FilterId } from './enums';
import type { ProductResponse } from './interfaces';

export function isErrorInfo(object: unknown): object is { code: string; field: string } {
  return typeof object === 'object' && object !== null && 'code' in object && 'field' in object;
}

export function isFilterId(id: string): id is FilterId {
  for (const value of Object.values(FilterId)) {
    if (value === id) return true;
  }
  return false;
}

export function isProductResponse(data: unknown): data is ProductResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'limit' in data &&
    'offset' in data &&
    'count' in data &&
    'total' in data &&
    'results' in data &&
    Array.isArray(data.results)
  );
}
