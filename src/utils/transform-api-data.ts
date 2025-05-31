import { userState } from '@/store/user-state';
import { AddressKey, AddressType, UserInfoKey } from '@/types/enums';
import { isUserInfo } from '@/types/guards';
import type { AddressInfo, UpdateUserInfo, UserInfo, UserInfoBody } from '@/types/interfaces';

export default class TransformApiData {
  public static transformUserInfo(): UserInfo | void {
    const userInfo = userState.getUserInfoState();
    if (userInfo) {
      const { firstName, lastName, dateOfBirth, email } = userInfo;

      return {
        [UserInfoKey.FIRST_NAME]: firstName,
        [UserInfoKey.LAST_NAME]: lastName,
        [UserInfoKey.DATA_OF_BIRTH]: dateOfBirth,
        [UserInfoKey.EMAIL]: email,
      };
    }
  }

  public static transformUserAddresses(): { [key in AddressType]: AddressInfo[] } {
    const userInfo = userState.getUserInfoState();

    const billingAddress = [];
    const shippingAddress = [];

    if (userInfo) {
      const {
        addresses,
        billingAddressIds,
        shippingAddressIds,
        defaultBillingAddressId,
        defaultShippingAddressId,
      } = userInfo;

      for (const address of addresses) {
        const addressId = address.id;
        if (addressId) {
          const { id, streetName, city, postalCode } = address;

          const addressTransform = {
            [AddressKey.COUNTRY]: 'Россия',
            [AddressKey.CITY]: city,
            [AddressKey.STREET]: streetName,
            [AddressKey.POSTAL_CODE]: postalCode,
            isDefault: defaultBillingAddressId === id || defaultShippingAddressId === id,
          };

          if (billingAddressIds.includes(addressId)) {
            billingAddress.push(addressTransform);
          }

          if (shippingAddressIds.includes(addressId)) {
            shippingAddress.push(addressTransform);
          }
        }
      }
    }

    return {
      [AddressType.SHIPPING]: shippingAddress,
      [AddressType.BILLING]: billingAddress,
    };
  }

  public static transformUserUpdateInfo(body: UserInfoBody): UpdateUserInfo | void {
    const actions = [];
    for (const key in body) {
      if (isUserInfo(key, body)) {
        const actionKey = key.charAt(0).toUpperCase() + key.slice(1);
        const currentBody = {
          action: key === 'email' ? `change${actionKey}` : `set${actionKey}`,
          [key]: body[key],
        };
        actions.push(currentBody);
      }
    }

    const userInfo = userState.getUserInfoState();

    if (userInfo) {
      return {
        version: Number(userInfo.version),
        actions,
      };
    }
  }
}
