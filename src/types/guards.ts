import type { ErrorInfo, ProductResponse, ProductTypeResponse } from './interfaces';

export function isErrorInfo(object: unknown): object is ErrorInfo {
  return typeof object === 'object' && object !== null && 'code' in object && 'field' in object;
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

export function isProductTypeResponse(data: unknown): data is ProductTypeResponse {
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
