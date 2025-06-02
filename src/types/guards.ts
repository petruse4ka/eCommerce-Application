
import { FilterId } from './enums';
import type { CategoryResponse, ErrorInfo, PasswordBody, ProductResponse, ProductTypeResponse, UserInfoBody } from './interfaces';

export function isErrorInfo(object: unknown): object is { code: string; field: string } {
  return typeof object === 'object' && object !== null && 'code' in object && 'field' in object;
}

export function isErrorItem(object: unknown): object is { code: string; field: string } {
  return typeof object === 'object' && object !== null && 'code' in object;
}

export function isFilterId(id: string): id is FilterId {
  for (const value of Object.values(FilterId)) {
    if (value === id) return true;
  }
  return false;
}


export function isErrorInfo(data: unknown): data is ErrorInfo {
  return (
    typeof data === 'object' &&
    data !== null &&
    'statusCode' in data &&
    'message' in data &&
    'errors' in data
  );
}

export function isUserInfo(id: string, userInfo: UserInfoBody): id is keyof UserInfoBody {
  return id in userInfo;
}

export function isPasswordInfo(id: string, passwordInfo: PasswordBody): id is keyof PasswordBody {
  return id in passwordInfo;
}

export function isProductResponse(data: unknown): data is ProductResponse {
  return (
    typeof data === 'object' && data !== null && 'results' in data && Array.isArray(data.results)
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

export function isCategoryResponse(data: unknown): data is CategoryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    Array.isArray(data.results) &&
    data.results.every((category) => 'id' in category && 'name' in category)
  );
}
