import { userState } from '@/store/user-state';
import { AddressType } from '@/types/enums';
import type { AddressInfo, UserInfo } from '@/types/interfaces';

export default class TransformApiData {
  public static transformUserInfo(): UserInfo | void {
    const userInfo = userState.getUserInfoState();

    if (userInfo) {
      const { firstName, lastName, dateOfBirth, email } = userInfo;

      return {
        Имя: firstName,
        Фамилия: lastName,
        'Дата рождения': dateOfBirth,
        Почта: email,
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
            Страна: 'Россия',
            Город: city,
            Улица: streetName,
            'Почтовый индекс': postalCode,
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
}
