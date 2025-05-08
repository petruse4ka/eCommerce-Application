import { API_ENDPOINT, API_METHODS, CONTENT_TYPE } from '@/types/enum';
import type { AuthResponse } from '@/types/interfaces';

const clientCredentials = btoa(
  import.meta.env['VITE_CTP_CLIENT_ID'] + ':' + import.meta.env['VITE_CTP_CLIENT_SECRET']
);

export default class API {
  constructor() {}

  public static async authentication(): Promise<string> {
    return await fetch(import.meta.env['VITE_CTP_AUTH_URL'] + API_ENDPOINT.authentication, {
      method: API_METHODS.POST,
      headers: {
        Authorization: `Basic ${clientCredentials}`,
        'Content-Type': CONTENT_TYPE.urlencoded,
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
