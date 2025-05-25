import type { ButtonType, InputType, Route } from './enums';

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
  disabled?: boolean;
  eventType?: string;
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

export interface CustomerResponse {
  customer: {
    id: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
  };
}

export interface InputComponent {
  placeholder?: string;
  className?: string | string[];
  id: string;
  type: InputType;
  callback?: (event: Event) => void;
  labelText: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  value?: string;
  eventType?: string;
  attributes?: Record<string, string>;
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
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface AuthorizationBody {
  email: string;
  password: string;
}

export interface MenuItem {
  name: string;
  route: Route;
}

export interface Packages {
  title: string;
  description: string;
  icon: string;
  gradient: string[];
}

export interface Macarons {
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
}

export interface Guarantees {
  title: string;
  description: string;
  image: string;
}

export interface ErrorInfo {
  code: string;
  message: string;
  duplicateValue: string;
  field: string;
}

export interface ErrorResponse {
  statusCode: number;
  messages: string;
  errors: ErrorInfo[];
  error: string;
  error_description: string;
}

export interface SelectOption {
  value: string;
  text: string;
}

export interface CheckboxOption {
  value: string;
  text: string;
}

export interface CheckboxFiltersParameters {
  title: string;
  options: CheckboxOption[];
  filterId: string;
}
