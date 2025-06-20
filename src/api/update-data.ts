import Alert from '@/components/alert';
import { ALERT_TEXT } from '@/constants';
import { userState } from '@/store/user-state';
import { AlertStatus, AlertTime, ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import type {
  AddAddressBody,
  Addresses,
  AddressWithId,
  Customer,
  ErrorInfo,
  ErrorResponse,
  PasswordBody,
  UserInfoBody,
} from '@/types/interfaces';
import TransformApiData from '@/utils/transform-api-data';

import API from '.';

export default class APIUpdateData {
  public static async userUpdateInfo(body: UserInfoBody): Promise<void> {
    const token = userState.getTokenState();

    await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.ME}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(TransformApiData.transformUserUpdateInfo(body)),
      }
    )
      .then((response) => response.json())
      .then((body: Customer | ErrorResponse) => {
        if ('error' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          userState.setUserInfoState(body);

          Alert.render({
            textContent: ALERT_TEXT.CHANGE_SUCCESS,
            status: AlertStatus.SUCCESS,
            visibleTime: AlertTime.DEFAULT,
          });
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: ALERT_TEXT.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: AlertTime.DEFAULT,
        });
      });
  }

  public static async userUpdateAddress(body: AddressWithId): Promise<void> {
    const token = userState.getTokenState();

    await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.ME}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(TransformApiData.transformUserUpdateAddress(body)),
      }
    )
      .then((response) => response.json())
      .then((body: Customer | ErrorResponse) => {
        if ('error' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          userState.setUserInfoState(body);

          Alert.render({
            textContent: ALERT_TEXT.CHANGE_ADDRESS_SUCCESS,
            status: AlertStatus.SUCCESS,
            visibleTime: AlertTime.DEFAULT,
          });
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: ALERT_TEXT.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: AlertTime.DEFAULT,
        });
      });
  }

  public static async changeUserPassword(body: PasswordBody): Promise<void> {
    const token = userState.getTokenState();
    const bodyUser = TransformApiData.transformUserPasswordChange(body);

    if (bodyUser) {
      await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.CHANGE_PASS}`,
        {
          method: ApiMethods.POST,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': ContentType.JSON,
          },
          body: JSON.stringify(bodyUser),
        }
      )
        .then((response) => response.json())
        .then(async (body: Customer | ErrorResponse) => {
          if ('errors' in body) {
            throw new Error(JSON.stringify(body.errors));
          } else {
            const userInfo = {
              email: body.email,
              password: bodyUser.newPassword,
            };
            await API.userAuthentication(userInfo);
            API.userSignInResponse({
              userInfo,
              isLogin: false,
            }).catch((error: ErrorInfo) => {
              console.error(error);
            });

            Alert.render({
              textContent: ALERT_TEXT.PASSWORD_CHANGE_SUCCESS,
              status: AlertStatus.SUCCESS,
              visibleTime: AlertTime.DEFAULT,
            });
          }
        });
    }
  }

  public static async deleteAddress(
    id: string,
    AlertContent: (typeof ALERT_TEXT)[keyof typeof ALERT_TEXT] = ALERT_TEXT.DELETE_ADDRESS_SUCCESS
  ): Promise<void> {
    const token = userState.getTokenState();

    await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.ME}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(TransformApiData.transformUserDeleteAddress(id)),
      }
    )
      .then((response) => response.json())
      .then((body: Customer | ErrorResponse) => {
        if ('error' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          userState.setUserInfoState(body);

          Alert.render({
            textContent: AlertContent,
            status: AlertStatus.SUCCESS,
            visibleTime: AlertTime.DEFAULT,
          });
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: ALERT_TEXT.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: AlertTime.DEFAULT,
        });
      });
  }

  public static async setAddressDefault(id: string, action: string): Promise<void> {
    const token = userState.getTokenState();

    await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.ME}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(TransformApiData.transformUserSetAddress(id, action)),
      }
    )
      .then((response) => response.json())
      .then((body: Customer | ErrorResponse) => {
        if ('error' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          userState.setUserInfoState(body);

          Alert.render({
            textContent: ALERT_TEXT.SET_DEFAULT_ADDRESS,
            status: AlertStatus.SUCCESS,
            visibleTime: AlertTime.DEFAULT,
          });
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: ALERT_TEXT.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: AlertTime.DEFAULT,
        });
      });
  }

  public static async userAddNewAddress(
    action: string,
    body: Addresses,
    isAlert: boolean = true
  ): Promise<void> {
    const token = userState.getTokenState();

    await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.ME}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(TransformApiData.transformUserAddAddress(body)),
      }
    )
      .then((response) => response.json())
      .then((body: Customer | ErrorResponse) => {
        if ('error' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          userState.setUserInfoState(body);
          const address = body.addresses.at(-1);

          if (address !== undefined) {
            const id = address.id;
            void APIUpdateData.addShippingOrBillingAddress({ action, id, isAlert });
          }
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: ALERT_TEXT.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: AlertTime.DEFAULT,
        });
      });
  }

  public static async addShippingOrBillingAddress(parameters: AddAddressBody): Promise<void> {
    const token = userState.getTokenState();

    await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.ME}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(
          TransformApiData.transformUserSetAddress(parameters.id, parameters.action)
        ),
      }
    )
      .then((response) => response.json())
      .then((body: Customer | ErrorResponse) => {
        if ('error' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          userState.setUserInfoState(body);
          if (parameters.isAlert) {
            Alert.render({
              textContent: ALERT_TEXT.ADD_ADDRESS_SUCCESS,
              status: AlertStatus.SUCCESS,
              visibleTime: AlertTime.DEFAULT,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.render({
          textContent: ALERT_TEXT.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: AlertTime.DEFAULT,
        });
      });
  }
}
