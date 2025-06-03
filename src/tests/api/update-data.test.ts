import APIUpdateData from '@/api/update-data';
import { userState } from '@/store/user-state';
import { ApiMethods, ContentType } from '@/types/enums';
import type { Addresses, AddressWithId, PasswordBody } from '@/types/interfaces';

const mockCustomerResponse = {
  customer: {
    id: 'test-id',
    version: 1,
    email: 'ivan@test.com',
    firstName: 'Иван',
    lastName: 'Иванов',
    dateOfBirth: '2000-10-10',
    addresses: [
      {
        id: 'test-address',
        country: 'RU',
        city: 'Тестовый Город',
        streetName: 'Тестовая Улица',
        postalCode: '12345',
      },
    ],
    defaultShippingAddressId: 'test-address',
    defaultBillingAddressId: 'test-address',
    shippingAddressIds: ['test-address'],
    billingAddressIds: ['test-address'],
  },
};

beforeEach(() => {
  userState.setTokenState('test-token');
});

describe('APIUpdateData', () => {
  describe('userUpdateAddress', () => {
    const mockAddress: AddressWithId = {
      id: 'test-address',
      country: 'RU',
      city: 'Тестовый Город',
      streetName: 'Тестовая Улица',
      postalCode: '12345',
    };

    it('should update address successfully', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCustomerResponse),
      });

      await APIUpdateData.userUpdateAddress(mockAddress);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/me'),
        expect.objectContaining({
          method: ApiMethods.POST,
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': ContentType.JSON,
          },
        })
      );
    });
  });
});

describe('APIUpdateData', () => {
  describe('deleteAddress', () => {
    it('should delete address successfully', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCustomerResponse),
      });

      await APIUpdateData.deleteAddress('test-address');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/me'),
        expect.objectContaining({
          method: ApiMethods.POST,
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': ContentType.JSON,
          },
        })
      );
    });
  });
});

describe('APIUpdateData', () => {
  describe('APIUpdateData', () => {
    const mockAddress: Addresses = {
      country: 'RU',
      city: 'Тестовый Город',
      streetName: 'Тестовая Улица',
      postalCode: '12345',
    };

    it('should add new address successfully', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCustomerResponse),
      });

      await APIUpdateData.userAddNewAddress('addShippingAddressId', mockAddress);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/me'),
        expect.objectContaining({
          method: ApiMethods.POST,
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': ContentType.JSON,
          },
        })
      );
    });
  });
});

describe('APIUpdateData', () => {
  describe('changeUserPassword', () => {
    const mockPasswordBody: PasswordBody = {
      currentPassword: 'testPassword123',
      newPassword: 'newTestPassword123',
      repeatNewPassword: 'newTestPassword123',
    };

    it('should change password successfully', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCustomerResponse),
      });

      await APIUpdateData.changeUserPassword(mockPasswordBody);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/password'),
        expect.objectContaining({
          method: ApiMethods.POST,
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': ContentType.JSON,
          },
        })
      );
    });
  });
});
