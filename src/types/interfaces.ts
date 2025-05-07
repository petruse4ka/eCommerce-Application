export interface FetchInfo {
  path: string;
  method: string;
  headers: Record<string, string>;
  body: URLSearchParams | string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}
