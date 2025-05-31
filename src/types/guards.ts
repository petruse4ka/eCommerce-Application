import { FilterId } from './enums';
import type { UserInfoBody } from './interfaces';

export function isErrorInfo(object: unknown): object is { code: string; field: string } {
  return typeof object === 'object' && object !== null && 'code' in object && 'field' in object;
}

export function isFilterId(id: string): id is FilterId {
  for (const value of Object.values(FilterId)) {
    if (value === id) return true;
  }
  return false;
}

export function isUserInfo(id: string, userInfo: UserInfoBody): id is keyof UserInfoBody {
  return id in userInfo;
}
