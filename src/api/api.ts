import { API_ENDPOINT, API_METHODS, CONTENT_TYPE } from '@/types/enum';
import type { AuthResponse, FetchInfo } from '@/types/interfaces';

export default class API {
  private clientCredentials: string;
  private authToken: string;

  constructor() {
    this.clientCredentials = btoa(
      import.meta.env['VITE_CTP_CLIENT_ID'] + ':' + import.meta.env['VITE_CTP_CLIENT_SECRET']
    );
    this.authToken = '';

    void this.authentication();
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  private async authentication(): Promise<void> {
    const fetchInfo = {
      path: import.meta.env['VITE_CTP_AUTH_URL'] + API_ENDPOINT.authentication,
      method: API_METHODS.POST,
      headers: {
        Authorization: `Basic ${this.clientCredentials}`,
        'Content-Type': CONTENT_TYPE.urlencoded,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    };

    this.authToken = await this.fetchAPI<AuthResponse>(fetchInfo).then(
      (response) => response.access_token
    );
  }

  private async fetchAPI<T>(fetchInfo: FetchInfo): Promise<T> {
    return await fetch(fetchInfo.path, {
      method: fetchInfo.method,
      headers: fetchInfo.headers,
      body: fetchInfo.body,
    })
      .then((response): Promise<T> => response.json())
      .catch((error: string): never => {
        throw new Error(error);
      });
  }
}
