import type { ButtonType, InputType } from './enums';

export interface ElementParameters {
  tag: string;
  className: string | string[];
  textContent?: string;
  callback?: (event: Event) => void;
  eventType?: string;
  attributes?: Record<string, string>;
}

export interface InputParameters extends ElementParameters {
  type: InputType;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
}

export interface ImageParameters extends ElementParameters {
  source: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface LinkParameters extends ElementParameters {
  href: string;
  target: '_blank' | '_self';
}

export interface ButtonParameters extends ElementParameters {
  type: ButtonType;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}
