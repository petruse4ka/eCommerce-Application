import type {
  Addresses,
  CategoryResponse,
  ErrorInfo,
  ProductResponse,
  ProductTypeResponse,
  UserInfoBody,
} from './interfaces';

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

export function isUserAddress(id: string, userAddress: Addresses): id is keyof Addresses {
  return id in userAddress;
}

export function isAddresses(object: unknown): object is Addresses {
  return (
    typeof object === 'object' &&
    object !== null &&
    'country' in object &&
    'city' in object &&
    'streetName' in object &&
    'postalCode' in object
  );
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
