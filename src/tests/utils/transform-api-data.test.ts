import { userState } from '@/store/user-state';
import { AddressKey, UserInfoKey } from '@/types/enums';
import type { Customer } from '@/types/interfaces';
import TransformApiData from '@/utils/transform-api-data';

const customer: Customer = {
  addresses: [
    {
      id: 'mtl2gAee',
      streetName: 'mockStreet',
      postalCode: '123456',
      city: 'mockCity',
      country: 'RU',
    },
  ],
  authenticationMode: 'Password',
  billingAddressIds: ['mtl2gAee'],
  createdAt: '2025-05-26T09:10:42.193Z',
  createdBy: {
    clientId: 'mockId',
    isPlatformClient: false,
  },
  customerGroupAssignments: [],
  dateOfBirth: '2000-05-05',
  defaultBillingAddressId: 'mtl2gAee',
  defaultShippingAddressId: 'mtl2gAee',
  email: 'mock@mock.mock',
  firstName: 'mockFirstName',
  id: 'mockId',
  isEmailVerified: false,
  lastMessageSequenceNumber: 1,
  lastModifiedAt: '2025-05-26T09:10:42.193Z',
  lastModifiedBy: {
    clientId: 'mockId',
    isPlatformClient: false,
  },
  lastName: 'mockLastName',
  password: '****mock',
  shippingAddressIds: ['mtl2gAee'],
  stores: [],
  version: 1,
  versionModifiedAt: '2025-05-26T09:10:42.193Z',
};

describe('Transform API data', () => {
  vi.spyOn(userState, 'getUserInfoState').mockReturnValue(customer);

  test('transformation of personal information', () => {
    const result = TransformApiData.transformUserInfo();
    expect(result).toEqual({
      [UserInfoKey.FIRST_NAME]: 'mockFirstName',
      [UserInfoKey.LAST_NAME]: 'mockLastName',
      [UserInfoKey.DATA_OF_BIRTH]: '2000-05-05',
      [UserInfoKey.EMAIL]: 'mock@mock.mock',
    });
  });

  test('transformation of addresses information', () => {
    const result = TransformApiData.transformUserAddresses();
    expect(result).toEqual({
      billing: [
        {
          [AddressKey.COUNTRY]: 'Россия',
          [AddressKey.CITY]: 'mockCity',
          [AddressKey.STREET]: 'mockStreet',
          [AddressKey.POSTAL_CODE]: '123456',
          isDefault: true,
        },
      ],
      shipping: [
        {
          [AddressKey.COUNTRY]: 'Россия',
          [AddressKey.CITY]: 'mockCity',
          [AddressKey.STREET]: 'mockStreet',
          [AddressKey.POSTAL_CODE]: '123456',
          isDefault: true,
        },
      ],
    });
  });
});
