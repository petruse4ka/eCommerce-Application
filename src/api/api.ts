import { ApiEndpoint, ApiMethods, ContentType } from '@/types/enums';
import type { AuthResponse } from '@/types/interfaces';

const clientCredentials = btoa(
  import.meta.env['VITE_CTP_CLIENT_ID'] + ':' + import.meta.env['VITE_CTP_CLIENT_SECRET']
);

export default class API {
  public static async authentication(): Promise<string> {
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
