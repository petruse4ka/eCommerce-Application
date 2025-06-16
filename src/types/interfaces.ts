import type { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';

import type { AddressKey, ButtonType, FilterType, InputType, Route, UserInfoKey } from './enums';
import type { Crewman } from './types';

export interface ElementParameters {
  tag: string;
  className: string | string[];
  textContent?: string;
  callback?: (event: Event) => void | Promise<void>;
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

export interface SVGParameters extends ElementParameters {
  source: string;
  classNameIcon: string | string[];
  iconSize?: number;
  viewBox?: string;
}

export interface LinkParameters extends ElementParameters {
  href: string;
  target: '_blank' | '_self';
}

export interface ButtonParameters extends ElementParameters {
  type: ButtonType;
}

export interface customButtonParameters {
  style: keyof typeof CUSTOM_BUTTON_STYLE;
  textContent?: string;
  icon: {
    source: string;
    classNameIcon: string[];
  };
  textClassName?: string[];
  callback: () => void | Promise<void>;
}

export interface addToCartButtonParameters {
  style: keyof typeof CUSTOM_BUTTON_STYLE;
  textContent?: string;
  productId: string;
  callback?: () => void | Promise<void>;
}

export interface AddToCartStateParameters {
  loading: boolean;
  inCart: boolean;
  text: string;
  icon: string;
  alt: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

export type AddressWithId = Addresses & { id: string };

export interface Customer {
  addresses: AddressWithId[];
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
  labelText?: string;
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

export interface UserInfoBody {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

export interface PasswordBody {
  newPassword: string;
  currentPassword: string;
  repeatNewPassword: string;
}

export interface PasswordRequest {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface RegistrationBody {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  addresses: Addresses[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface AuthorizationBody {
  email: string;
  password: string;
  anonymousId?: string;
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
  id: string;
  key: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  fractionDigits?: number;
  imagesCount?: number;
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

export interface ProductApiResponse {
  products: Products[];
  productData: Product[];
}

export interface Product {
  id: string;
  key: string;
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

export interface Products {
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  fractionDigits?: number;
}

export interface Category {
  typeId: string;
  id: string;
  name: {
    [key: string]: string;
  };
  ancestors: Array<{
    typeId: string;
    id: string;
  }>;
}

export interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images?: Image[];
  attributes?: Attribute[];
}

export interface ProductVariantView {
  id: string;
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
  id: string;
}

export interface UserInfo {
  [UserInfoKey.FIRST_NAME]: string;
  [UserInfoKey.LAST_NAME]: string;
  [UserInfoKey.DATA_OF_BIRTH]: string;
  [UserInfoKey.EMAIL]: string;
}

export interface TitleProduct {
  title: string;
  description: string;
}

export interface PriceValue {
  price: number;
  oldPrice?: number;
  code: string;
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
    ancestors?: Array<{
      typeId: string;
      id: string;
    }>;
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

export interface UpdateUserInfo {
  version: number;
  actions: Record<string, string>[];
}

export interface UpdateUserAddress {
  version: number;
  actions: {
    action: string;
    addressId: string;
    address: {
      country: string;
      city: string;
      postalCode: string;
      streetName: string;
    };
  }[];
}

export interface AddAddress {
  version: number;
  actions: {
    action: string;
    address: {
      country: string;
      city: string;
      postalCode: string;
      streetName: string;
    };
  }[];
}

export interface TabInfo {
  textContent: string;
  isActive?: boolean;
  callback: () => void;
  icon?: HTMLElement;
}

export interface AddAddressBody {
  action: string;
  id: string;
  isAlert: boolean;
}

export interface CartInfo {
  id: string;
  version: number;
  lineItems: CartItemView[];
  totalPrice: number;
  totalDiscountPrice: number;
  discountCode: string | null;
}

export interface CartItem {
  id: string;
  productId: string;
  productKey: string;
  name: {
    ru: string;
  };
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  productSlug: {
    ru: string;
  };
  variant: ProductVariant;
  price: Price;
  quantity: number;
  addedAt: string;
  lastModifiedAt: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

export interface CartResponse {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  lineItems: CartItem[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: [];
  customLineItems: [];
  discountCodes: [
    {
      discountCode: {
        typeId: string;
        id: string;
        obj?: {
          code: string;
        };
      };
      state: string;
    },
  ];
  directDiscounts: [];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: [];
  origin: string;
  itemShippingAddresses: [];
  discountTypeCombination: {
    type: string;
  };
  totalLineItemQuantity: number;
  discountOnTotalPrice?: {
    discountedAmount: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
}

export interface DiscountCodeResponse {
  id: string;
  version: number;
  code: string;
  name: {
    ru: string;
  };
}

export interface CartLineItem {
  productId: string;
  quantity: number;
}

export interface CartLineItem {
  productId: string;
  quantity: number;
}

export interface CartLineItem {
  productId: string;
  quantity: number;
}

export interface CartLineItem {
  productId: string;
  quantity: number;
}

export interface AddProductBody {
  version: number;
  actions: {
    action: string;
    productId: string;
    variantId: number;
    quantity: number;
  }[];
}

export interface CartItemView {
  id: string;
  productId: string;
  name: string;
  prices: number;
  discountedPrice?: number;
  img: {
    url: string;
    alt: string | undefined;
  };
  quantity: number;
}

export interface ProductQuantityParameters {
  price: number;
  element: HTMLElement;
  text: string;
  count: number;
  secondElement?: HTMLElement;
  callback?: (count: number) => Promise<boolean>;
}

export interface ProductQuantityTransform {
  version: number;
  actions: [
    {
      action: string;
      lineItemId: string;
      quantity: number;
    },
  ];
}

export interface RemoveCartItem {
  version: number;
  actions: [
    {
      action: string;
      lineItemId: string;
    },
  ];
}

interface additionalPagesContentItem {
  type: 'text' | 'subtitle';
  content: string;
}

export interface additionalPagesData {
  TITLE: string;
  CONTENT: additionalPagesContentItem[];
  IMAGE?: string | string[];
}

export interface AddDiscountCode {
  version: number;
  actions: [
    {
      action: string;
      code: string;
    },
  ];
}

export interface PersonalText {
  name: string;
  role: string;
  description?: string[];
  github: Crewman;
}

export interface PersonalImageBox {
  photo: {
    url: string;
    style: string[];
  };
  hat?: {
    url: string;
    style: string[];
  };
}

export interface Personal {
  PersonalText: PersonalText;
  PersonalImageBox: PersonalImageBox;
}

export interface About {
  MARGO: Personal;
  KONSTANTIN: Personal;
  DANIIL: Personal;
  OLGA: Personal;
  title: string;
  text: string[] | string;
  image: string;
}
