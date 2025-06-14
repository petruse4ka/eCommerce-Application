import { beforeEach, describe, expect, it, vi } from 'vitest';

import { USER_INFO_KEY } from '@/constants';
import { userState } from '@/store/user-state';
import { AddressType } from '@/types/enums';
import type { AddressWithId, Customer, PasswordBody } from '@/types/interfaces';
import type { UserInfoBody } from '@/types/interfaces';
import TransformApiData from '@/utils/transform-api-data';

const customer: Customer = {
  id: 'test-id',
  version: 1,
  firstName: 'Иван',
  lastName: 'Иванов',
  dateOfBirth: '2000-10-10',
  email: 'ivan@test.com',
  addresses: [
    {
      id: 'test-address',
      streetName: 'Тестовая Улица',
      city: 'Тестовый Город',
      postalCode: '12345',
      country: 'RU',
    },
  ],
  billingAddressIds: ['test-address'],
  shippingAddressIds: ['test-address'],
  defaultBillingAddressId: 'test-address',
  defaultShippingAddressId: 'test-address',
  authenticationMode: 'Password',
  createdAt: '2025-05-28T15:56:44.526Z',
  createdBy: { clientId: 'test-client', isPlatformClient: false },
  customerGroupAssignments: [],
  lastMessageSequenceNumber: 1,
  lastModifiedAt: '2025-05-28T15:56:44.526Z',
  lastModifiedBy: { clientId: 'test-client', isPlatformClient: false },
  versionModifiedAt: '2025-05-28T15:56:44.526Z',
  isEmailVerified: false,
  password: 'hashed-password',
  stores: [],
};

describe('Transform API data', () => {
  beforeEach(() => {
    vi.spyOn(userState, 'getUserInfoState').mockReturnValue(customer);
  });

  describe('transformUserInfo', () => {
    it('should transform user info correctly', () => {
      const result = TransformApiData.transformUserInfo();
      expect(result).toEqual({
        [USER_INFO_KEY.FIRST_NAME]: 'Иван',
        [USER_INFO_KEY.LAST_NAME]: 'Иванов',
        [USER_INFO_KEY.DATA_OF_BIRTH]: '2000-10-10',
        [USER_INFO_KEY.EMAIL]: 'ivan@test.com',
      });
    });
  });
});

describe('Transform API data', () => {
  describe('transformUserAddresses', () => {
    it('should transform addresses correctly', () => {
      const result = TransformApiData.transformUserAddresses();
      expect(result).toEqual({
        [AddressType.SHIPPING]: [
          {
            id: 'test-address',
            isDefault: true,
            Город: 'Тестовый Город',
            Страна: 'Россия',
            Улица: 'Тестовая Улица',
            'Почтовый индекс': '12345',
          },
        ],
        [AddressType.BILLING]: [
          {
            id: 'test-address',
            isDefault: true,
            Город: 'Тестовый Город',
            Страна: 'Россия',
            Улица: 'Тестовая Улица',
            'Почтовый индекс': '12345',
          },
        ],
      });
    });
  });
});

describe('Transform API data', () => {
  describe('transformUserUpdateInfo', () => {
    it('should transform update info correctly', () => {
      const updateBody: UserInfoBody = {
        firstName: 'Иван',
        lastName: 'Иванов',
        email: 'ivan@test.com',
        dateOfBirth: '2000-10-10',
      };
      const result = TransformApiData.transformUserUpdateInfo(updateBody);
      expect(result).toEqual({
        version: 1,
        actions: [
          { action: 'setFirstName', firstName: 'Иван' },
          { action: 'setLastName', lastName: 'Иванов' },
          { action: 'changeEmail', email: 'ivan@test.com' },
          { action: 'setDateOfBirth', dateOfBirth: '2000-10-10' },
        ],
      });
    });
  });

  describe('transformUserPasswordChange', () => {
    it('should transform password change request correctly', () => {
      const passwordBody: PasswordBody = {
        currentPassword: 'testPassword123',
        newPassword: 'newTestPassword123',
        repeatNewPassword: 'newPassword123',
      };
      const result = TransformApiData.transformUserPasswordChange(passwordBody);
      expect(result).toEqual({
        id: 'test-id',
        version: 1,
        currentPassword: 'testPassword123',
        newPassword: 'newTestPassword123',
      });
    });
  });
});

describe('Transform API data', () => {
  describe('transformUserUpdateAddress', () => {
    it('should transform address update request correctly', () => {
      const addressBody: AddressWithId = {
        id: 'test-address',
        city: 'Новый Город',
        postalCode: '54321',
        streetName: 'Новая Улица',
        country: 'RU',
      };
      const result = TransformApiData.transformUserUpdateAddress(addressBody);
      expect(result).toEqual({
        version: 1,
        actions: [
          {
            action: 'changeAddress',
            addressId: 'test-address',
            address: {
              country: 'RU',
              city: 'Новый Город',
              postalCode: '54321',
              streetName: 'Новая Улица',
            },
          },
        ],
      });
    });
  });
});

describe('Transform API data', () => {
  describe('transformUserDeleteAddress', () => {
    it('should transform address deletion request correctly', () => {
      const result = TransformApiData.transformUserDeleteAddress('test-address');
      expect(result).toEqual({
        version: 1,
        actions: [
          {
            action: 'removeAddress',
            addressId: 'test-address',
          },
        ],
      });
    });
  });
});

describe('Transform API data', () => {
  describe('transformUserSetAddress', () => {
    it('should transform set address request correctly', () => {
      const result = TransformApiData.transformUserSetAddress(
        'test-address',
        'setDefaultBillingAddress'
      );
      expect(result).toEqual({
        version: 1,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId: 'test-address',
          },
        ],
      });
    });
  });
});
