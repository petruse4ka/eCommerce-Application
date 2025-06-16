export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  SEARCH = 'search',
  TEL = 'tel',
  EMAIL = 'email',
  SELECT = 'select',
}

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export enum ApiEndpoint {
  OATH = '/oauth/',
  AUTHENTICATION = '/anonymous/token',
  REGISTRATION = '/me/signup',
  LOGIN = '/me/login',
  USER = '/customers/token',
  ME = '/me',
  PRODUCTS = '/products',
  CHANGE_PASS = '/customers/password',
  PRODUCT_TYPES = '/product-types',
  CATEGORIES = '/categories',
  CART = '/carts',
  CART_CUSTOMER = `${CART}/customer-id`,
}

export enum ContentType {
  URLENCODED = 'application/x-www-form-urlencoded',
  JSON = 'application/json',
}

export enum Route {
  HOME = '#/',
  LOGIN = '#/login',
  REGISTRATION = '#/register',
  ERROR = '#/error',
  ABOUT = '#/about',
  CONTACTS = '#/contacts',
  DELIVERY = '#/delivery',
  TERMS = '#/terms',
  RETURNS = '#/returns',
  ACCOUNT = '#/account',
  CATALOG = '#/catalog',
  PRODUCT = '#/product',
  CART = '#/cart',
}

export enum AlertStatus {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export enum FilterType {
  CHECKBOX = 'checkbox',
  RANGE = 'range',
  DROPDOWN = 'dropdown',
  PRICE = 'price',
  CATEGORY = 'category',
}

export enum AddressType {
  SHIPPING = 'shipping',
  BILLING = 'billing',
}

export enum Language {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
  DUTCH = 'nl',
  BELARUS = 'by',
}

export enum CartStateKey {
  CART_INFO = 'cartInfo',
  UPDATE_CART_LINE = 'updateCartLine',
  ITEMS_COUNT = 'itemsCount',
}

export enum AlertTime {
  DEFAULT = 3000,
}
