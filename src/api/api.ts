import Alert from '@/components/alert/alert';
import { Router } from '@/router/router';
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
    return await fetch(
      `${import.meta.env['VITE_CTP_API_URL']}/${import.meta.env['VITE_CTP_PROJECT_KEY']}${ApiEndpoint.REGISTRATION}`,
      {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${await this.authentication()}`,
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed. Please check your input and try again.');
        }

        Alert.render({
          textContent: AlertText.REGISTRATION_SUCCESS,
          status: AlertStatus.SUCCESS,
          visibleTime: 3000,
        });
        return response.json();
      })
      .then((body: CustomerResponse) => {
        userState.setAuthorizationState(true);
        Router.followRoute(Route.HOME);
        return body.customer.id;
      })
      .catch((error: Error) => {
        console.log(error.message);
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
        if (!response.ok) {
          throw new Error('Login failed. Please check your credentials and try again.');
        }

        Alert.render({
          textContent: AlertText.AUTHORIZATION_SUCCESS,
          status: AlertStatus.SUCCESS,
          visibleTime: 3000,
        });

        return response.json();
      })
      .then((body: CustomerResponse) => {
        userState.setAuthorizationState(true);
        Router.followRoute(Route.HOME);
        return body.customer.id;
      })
      .catch((error: Error) => {
        console.log(error.message);
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
        if ('access_token' in body) {
          return body.access_token;
        } else {
          throw new Error(body.error);
        }
      })
      .catch((error: Error) => {
        throw new Error(error.message);
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
      .then((body: AuthResponse) => body.access_token)
      .catch((error: string): never => {
        throw new Error(error);
      });
  }
}
