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
  id: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
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

export interface RegistrationResponse {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
}

export interface InputComponent {
  placeholder?: string;
  className?: string | string[];
  id: string;
  type: InputType;
  callback: (event: Event) => void;
  labelText: string;
  isRequired?: boolean;
  value?: string;
}

export interface Addresses {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface RegistrationBody {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  addresses: Addresses[];
}
