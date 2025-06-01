import Alert from '@/components/alert';
import { userState } from '@/store/user-state';
import { AlertStatus, AlertText, ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import type { AddressWithId, Customer, ErrorResponse, UserInfoBody } from '@/types/interfaces';
import TransformApiData from '@/utils/transform-api-data';

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
            textContent: AlertText.DELETE_ADDRESS_SUCCESS,
            status: AlertStatus.SUCCESS,
            visibleTime: 3000,
          });
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: AlertText.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: 3000,
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
            textContent: AlertText.CHANGE_SUCCESS,
            status: AlertStatus.SUCCESS,
            visibleTime: 3000,
          });
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: AlertText.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: 3000,
        });
      });
  }

  public static async deleteAddress(id: string): Promise<void> {
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
            textContent: AlertText.DELETE_ADDRESS_SUCCESS,
            status: AlertStatus.SUCCESS,
            visibleTime: 3000,
          });
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.render({
          textContent: AlertText.ERROR_DEFAULT,
          status: AlertStatus.ERROR,
          visibleTime: 3000,
        });
      });
  }
}
