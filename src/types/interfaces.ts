import type { AddressKey, ButtonType, FilterType, InputType, Route, UserInfoKey } from './enums';

export interface ElementParameters {
  tag: string;
  className: string | string[];
  textContent?: string;
  callback?: (event: Event) => void;
  eventType?: string;
  attributes?: Record<string, string>;
  id?: string;
}

export interface InputParameters extends ElementParameters {
  type: InputType;
  id: string;
  name?: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  eventType?: string;
  min?: string;
  max?: string;
  step?: string;
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

export interface Customer {
  addresses: Addresses[];
  authenticationMode: string;
  billingAddressIds: string[];
  createdAt: string;
  createdBy: { clientId: string; isPlatformClient: boolean };
  customerGroupAssignments: [];
  dateOfBirth: string;
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: { clientId: string; isPlatformClient: boolean };
  lastName: string;
  password: string;
  shippingAddressIds: string[];
  stores: [];
  version: number;
  versionModifiedAt: string;
}

export interface CustomerResponse {
  customer: Customer;
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
  id?: string;
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

export interface Products {
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  fractionDigits?: number;
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

export interface RangeFilter {
  id: string;
  type: FilterType.RANGE;
  min: number;
  max: number;
  title: string;
}

export interface DropdownFilter {
  id: string;
  type: FilterType.DROPDOWN;
  options: SelectOption[];
  title: string;
}

export interface CheckboxFilter {
  id: string;
  type: FilterType.CHECKBOX;
  options: CheckboxOption[];
  title: string;
}

export interface FilterConfigs {
  checkbox: CheckboxFilter[];
  range: RangeFilter[];
  dropdown: DropdownFilter[];
}

export interface ProductResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
}

export interface Product {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  productType: {
    typeId: string;
    id: string;
  };
  masterData?: {
    current: {
      name: { [key: string]: string };
      description?: { [key: string]: string };
      categories: Category[];
      categoryOrderHints: Record<string, string>;
      slug: { [key: string]: string };
      metaTitle?: { [key: string]: string };
      metaDescription?: { [key: string]: string };
      masterVariant: ProductVariant;
      variants: ProductVariant[];
    };
  };
  masterVariant?: ProductVariant;
}

export interface Category {
  typeId: string;
  id: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images?: Image[];
  attributes?: Attribute[];
}

export interface Price {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  key: string;
  country: string;
  discounted?: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: {
      typeId: string;
      id: string;
    };
  };
}

export interface Image {
  url: string;
  label?: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface Attribute {
  name: string;
  value:
    | boolean
    | number
    | string
    | { [key: string]: string }
    | Array<{ key: string; label: string }>;
}

export interface AddressInfo {
  [AddressKey.COUNTRY]: string;
  [AddressKey.CITY]: string;
  [AddressKey.STREET]: string;
  [AddressKey.POSTAL_CODE]: string;
  isDefault: boolean;
}

export interface UserInfo {
  [UserInfoKey.FIRST_NAME]: string;
  [UserInfoKey.LAST_NAME]: string;
  [UserInfoKey.DATA_OF_BIRTH]: string;
  [UserInfoKey.EMAIL]: string;
}

export interface ProductTypeResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductType[];
}

export interface ProductType {
  id: string;
  version: number;
  versionModifiedAt: string;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  name: string;
  description: string;
  classifier: string;
  attributes: ProductTypeAttribute[];
  key: string;
}

export interface ProductTypeAttribute {
  name: string;
  label: {
    [key: string]: string;
  };
  inputTip: {
    [key: string]: string;
  };
  isRequired: boolean;
  type: {
    name: string;
    elementType?: {
      name: string;
      values?: Array<{
        key: string;
        label: string;
      }>;
    };
  };
  attributeConstraint: string;
  isSearchable: boolean;
  inputHint: string;
  displayGroup: string;
  level: string;
}

export interface CategoryResponse {
  results: Array<{
    id: string;
    name: { [key: string]: string };
  }>;
}

export interface FilterValue {
  key: string;
  value: string;
  type: FilterType;
}

export interface FilterRequest {
  [key: string]: Set<FilterValue>;
}
