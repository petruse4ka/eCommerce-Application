import Alert from '@/components/alert';
import Router from '@/router';
import { userState } from '@/store/user-state';
import {
  AlertStatus,
  AlertText,
  AlertTime,
  ApiEndpoint,
  ApiMethods,
  ContentType,
} from '@/types/enums';
import { Route } from '@/types/enums';
import type {
  AuthorizationBody,
  AuthResponse,
  CustomerResponse,
  ErrorInfo,
  ErrorResponse,
  RegistrationBody,
} from '@/types/interfaces';
import ApiErrors from '@/utils/api-errors';

import APICart from './cart';

const clientCredentials = btoa(
  import.meta.env['VITE_CTP_CLIENT_ID'] + ':' + import.meta.env['VITE_CTP_CLIENT_SECRET']
);

export default class API {
  public static async userRegistration(bodyUser: RegistrationBody): Promise<string | void> {
    let token = userState.getTokenState();

    if (token === '') {
      token = await this.authentication();
    }

    return await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.REGISTRATION}`,
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
      .then((body: CustomerResponse | ErrorResponse) => {
        if ('errors' in body) {
          throw new Error(JSON.stringify(body.errors));
        } else {
          Alert.render({
            textContent: AlertText.REGISTRATION_SUCCESS,
            status: AlertStatus.SUCCESS,
            visibleTime: AlertTime.DEFAULT,
          });

          void API.userSignInResponse({
            userInfo: {
              email: bodyUser.email,
              password: bodyUser.password,
            },
            isLogin: false,
          });

          Router.followRoute(Route.HOME);

          return body.customer.id;
        }
      });
  }

  public static async userSignInResponse(body: {
    userInfo: AuthorizationBody;
    isLogin: boolean;
  }): Promise<void> {
    const { userInfo, isLogin } = body;
    const token = userState.getTokenState();
    await this.userAuthentication(userInfo);
    const fetchBody = { ...userInfo };

    if (token) {
      return await fetch(
        `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.LOGIN}`,
        {
          method: ApiMethods.POST,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': ContentType.JSON,
          },
          body: JSON.stringify(fetchBody),
        }
      )
        .then((response) => response.json())
        .then((body: CustomerResponse) => {
          if (isLogin) {
            Alert.render({
              textContent: AlertText.AUTHORIZATION_SUCCESS,
              status: AlertStatus.SUCCESS,
              visibleTime: AlertTime.DEFAULT,
            });
            Router.followRoute(Route.HOME);
          }
          userState.setUserInfoState(body.customer);
          userState.setAuthorizationState(true);
          void APICart.getCart();
        });
    }
  }

  public static async authentication(): Promise<string> {
    return await fetch(
      import.meta.env['VITE_CTP_AUTH_URL'] +
        ApiEndpoint.OATH +
        import.meta.env['VITE_CTP_PROJECT_KEY'] +
        ApiEndpoint.AUTHENTICATION,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Basic ${clientCredentials}`,
          'Content-Type': ContentType.URLENCODED,
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
      }
    )
      .then((response) => response.json())
      .then((body: AuthResponse) => {
        const { access_token: token } = body;
        userState.setTokenState(token);
        return token;
      });
  }

  public static async userAuthentication(body: AuthorizationBody): Promise<string | void> {
    return await fetch(
      import.meta.env['VITE_CTP_AUTH_URL'] +
        ApiEndpoint.OATH +
        import.meta.env['VITE_CTP_PROJECT_KEY'] +
        ApiEndpoint.USER,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Basic ${clientCredentials}`,
          'Content-Type': ContentType.URLENCODED,
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: body.email,
          password: body.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((body: AuthResponse | ErrorResponse) => {
        if ('error' in body) {
          throw new Error(body.error);
        } else {
          const { access_token: token } = body;
          userState.setTokenState(token);
          return token;
        }
      })
      .catch((error: ErrorInfo) => {
        const errorInfo = ApiErrors.getErrorInfo(error.message);

        Alert.render({
          textContent: errorInfo,
          status: AlertStatus.ERROR,
          visibleTime: AlertTime.DEFAULT,
        });

        throw new Error(error.message);
      });
  }
}
