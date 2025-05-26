import Alert from '@/components/alert';
import Router from '@/router';
import { userState } from '@/store/user-state';
import { AlertStatus, AlertText, ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import { Route } from '@/types/enums';
import type {
  AuthorizationBody,
  AuthResponse,
  CustomerResponse,
  ErrorResponse,
  RegistrationBody,
} from '@/types/interfaces';

const clientCredentials = btoa(
  import.meta.env['VITE_CTP_CLIENT_ID'] + ':' + import.meta.env['VITE_CTP_CLIENT_SECRET']
);

export default class API {
  public static async userRegistration(body: RegistrationBody): Promise<string | void> {
    const token = await this.authentication();

    return await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.REGISTRATION}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(body),
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
            visibleTime: 3000,
          });

          userState.setUserInfoState(body.customer);
          userState.setAuthorizationState(true);
          Router.followRoute(Route.HOME);

          return body.customer.id;
        }
      });
  }

  public static async userSignInResponse(body: AuthorizationBody): Promise<string | void> {
    const token = await this.userAuthentication(body);

    return await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.LOGIN}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        Alert.render({
          textContent: AlertText.AUTHORIZATION_SUCCESS,
          status: AlertStatus.SUCCESS,
          visibleTime: 3000,
        });

        return response.json();
      })
      .then((body: CustomerResponse) => {
        userState.setUserInfoState(body.customer);
        userState.setAuthorizationState(true);
        Router.followRoute(Route.HOME);
        return body.customer.id;
      });
  }

  private static async userAuthentication(body: AuthorizationBody): Promise<string> {
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
          return body.access_token;
        }
      });
  }

  private static async authentication(): Promise<string> {
    return await fetch(import.meta.env['VITE_CTP_AUTH_URL'] + ApiEndpoint.AUTHENTICATION, {
      method: ApiMethods.POST,
      headers: {
        Authorization: `Basic ${clientCredentials}`,
        'Content-Type': ContentType.URLENCODED,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    })
      .then((response) => response.json())
      .then((body: AuthResponse) => body.access_token);
  }
}
