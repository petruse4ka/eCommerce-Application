import { Route } from '@/types/enums';
import { Language } from '@/types/enums';
import type { MenuItem } from '@/types/interfaces';
import { LanguageSelector } from '@/utils/language-selector';

const languageSelector = LanguageSelector.getInstance();
const locale = languageSelector.translations;

export const VALIDATE_CONST = {
  MIN_AGE: 13,
  MAX_AGE: 130,
  MIN_PASSWORD_LENGTH: 8,
  MAX_INPUT_LENGTH: 50,
};

export const DEFAULT_OPTIONS_COUNT = 5;

export const DEFAULT_CURRENCY = '₽';

export const MAX_DESCRIPTION_LENGTH = 150;

export const DEFAULT_PRODUCTS_PER_PAGE = 12;

export const LOADING_CONFIG = {
  MAX_ATTEMPTS: 10,
  DELAY: 500,
};

export const FILTER_RANGES = {
  DEFAULT: {
    MIN: 0,
    MAX: 150,
    STEP: 10,
  },
  PRICE: {
    MIN: 0,
    MAX: 100,
    STEP: 10,
  },
  WEIGHT: {
    MIN: 0,
    MAX: 100,
    STEP: 10,
  },
};

export const SUBHEADER_PROMO_TEXT = {
  DELIVERY: locale.subheaderPromoDelivery,
  FRESH: locale.subheaderPromoFresh,
  WHOLESALE: locale.subheaderPromoWholesale,
  INGREDIENTS: locale.subheaderPromoIngredients,
};

export const AUTHORIZATION_MENU_TEXT = {
  LOGIN: locale.authMenuLogin,
  REGISTRATION: locale.authMenuRegister,
  ACCOUNT: locale.authMenuAccount,
  LOGOUT: locale.authMenuLogout,
};

export const MENU_TEXT = {
  HOME: locale.menuHome,
  CATALOG: locale.menuCatalog,
  ABOUT: locale.menuAbout,
  CONTACTS: locale.menuContacts,
};

export const FOOTER_TEXTS = {
  PROMO_TITLE: locale.footerPromoTitle,
  MENU_TITLE: locale.footerMenuTitle,
  TEAM_TITLE: locale.footerTeamTitle,
  COPYRIGHT: locale.footerCopyright,
  FOOTER_PROMO_TEXT: {
    LOVE: locale.footerPromoLove,
    DELIVERY: locale.footerPromoDelivery,
    INGREDIENTS: locale.footerPromoIngredients,
  },
  FOOTER_MENU_TEXT: {
    ABOUT: locale.footerMenuAbout,
    DELIVERY: locale.footerMenuDelivery,
    TERMS: locale.footerMenuTerms,
    RETURNS: locale.footerMenuReturns,
    CONTACTS: locale.footerMenuContacts,
  },
};

export const AUTHORIZATION_MENU_ITEMS: MenuItem[] = [
  { name: AUTHORIZATION_MENU_TEXT.REGISTRATION, route: Route.REGISTRATION },
  { name: AUTHORIZATION_MENU_TEXT.LOGIN, route: Route.LOGIN },
];

export const UNAUTHORIZED_MENU_ITEMS: MenuItem[] = [
  { name: AUTHORIZATION_MENU_TEXT.ACCOUNT, route: Route.ACCOUNT },
  { name: AUTHORIZATION_MENU_TEXT.LOGOUT, route: Route.HOME },
];

export const ERROR_PAGE_TEXTS = {
  HOME: locale.errorHome,
  SORRY: locale.errorSorry,
};

export const UNDER_CONSTRUCTION_TEXTS = {
  HOME: locale.constructionHome,
  SORRY: locale.constructionSorry,
};

export const MENU_ITEMS: MenuItem[] = [
  { name: MENU_TEXT.HOME, route: Route.HOME },
  { name: MENU_TEXT.CATALOG, route: Route.CATALOG },
  { name: MENU_TEXT.ABOUT, route: Route.ABOUT },
  { name: MENU_TEXT.CONTACTS, route: Route.CONTACTS },
];

export const FOOTER_MENU_ITEMS: MenuItem[] = [
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.ABOUT, route: Route.ABOUT },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.DELIVERY, route: Route.DELIVERY },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.TERMS, route: Route.TERMS },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.RETURNS, route: Route.RETURNS },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.CONTACTS, route: Route.CONTACTS },
];

export const BTN_TEXT = {
  REGISTRATION_PAGE: locale.btnRegistrationPage,
  REGISTRATION_REDIRECT: locale.btnRegistrationRedirect,
  LOGIN_PAGE: locale.btnLoginPage,
  LOGIN_REDIRECT: locale.btnLoginRedirect,
  EDIT: locale.btnEdit,
  DELETE: locale.btnDelete,
  SET_PRIMARY: locale.btnSetPrimary,
  DELETE_PRIMARY: locale.btnDeletePrimary,
  SAVE_CHANGES: locale.btnSaveChanges,
  ADD_NEW_ADDRESS: locale.btnAddNewAddress,
  CHECKOUT: locale.btnCheckout,
  APPLY: locale.btnApply,
  CLEAR_CART: locale.btnClearCart,
  FINISH_CART: locale.btnFinishCart,
};

export const INTRO_TEXTS = {
  NAME: locale.introName,
  SINCE: locale.introSince,
  TITLE: locale.introTitle,
  CATCH_PHRASE: locale.introCatchPhrase,
};

export const PACKAGES_TEXTS = {
  TITLE: locale.packagesTitle,
  PACKAGES: {
    READY_PACK: {
      TITLE: locale.packagesReadyPackTitle,
      DESCRIPTION: locale.packagesReadyPackDescription,
    },
    CREATE_OWN: {
      TITLE: locale.packagesCreateOwnTitle,
      DESCRIPTION: locale.packagesCreateOwnDescription,
    },
    INDIVIDUAL_PACK: {
      TITLE: locale.packagesIndividualPackTitle,
      DESCRIPTION: locale.packagesIndividualPackDescription,
    },
    WEDDING_PACK: {
      TITLE: locale.packagesWeddingPackTitle,
      DESCRIPTION: locale.packagesWeddingPackDescription,
    },
    CORPORATE_PACK: {
      TITLE: locale.packagesCorporatePackTitle,
      DESCRIPTION: locale.packagesCorporatePackDescription,
    },
    WHOLESALE_PACK: {
      TITLE: locale.packagesWholesalePackTitle,
      DESCRIPTION: locale.packagesWholesalePackDescription,
    },
  },
};

export const GUARANTEES_TEXTS = {
  TITLE: locale.guaranteesTitle,
  GUARANTEES: {
    INGREDIENTS: {
      TITLE: locale.guaranteesIngredientsTitle,
      DESCRIPTION: locale.guaranteesIngredientsDescription,
    },
    PACKAGING: {
      TITLE: locale.guaranteesPackagingTitle,
      DESCRIPTION: locale.guaranteesPackagingDescription,
    },
    DELIVERY: {
      TITLE: locale.guaranteesDeliveryTitle,
      DESCRIPTION: locale.guaranteesDeliveryDescription,
    },
    ANONYMOUS: {
      TITLE: locale.guaranteesAnonymousTitle,
      DESCRIPTION: locale.guaranteesAnonymousDescription,
    },
  },
};

export const FIELDSET_LABELS = {
  PERSONAL_DATA: locale.fieldsetPersonalData,
  SHIPPING: locale.fieldsetShipping,
  BILLING: locale.fieldsetBilling,
};

export const PAGE_TITLES = {
  CATALOG: locale.pageCatalog,
  ACCOUNT: locale.pageAccount,
  REGISTRATION: locale.pageRegistration,
};

export const CATALOG_TEXTS = {
  TOTAL_PRODUCTS: locale.catalogTotalProducts,
  SORT_BY: locale.catalogSortBy,
  SEARCH_PLACEHOLDER: locale.catalogSearchPlaceholder,
  PRODUCT_TYPE_FILTER: locale.catalogFiltersProductType,
  TASTE_FILTER: locale.catalogFiltersTaste,
  DIET_FILTER: locale.catalogFiltersDiet,
  FILLING_FILTER: locale.catalogFiltersFilling,
  TOPPING_FILTER: locale.catalogFiltersTopping,
  PROMO_FILTER: locale.catalogFiltersPromo,
  PRICE_FILTER: locale.catalogFiltersPrice,
  WEIGHT_FILTER: locale.catalogFiltersWeight,
  SHOW_MORE: locale.catalogShowMore,
  SHOW_LESS: locale.catalogShowLess,
  RANGE_FROM: locale.catalogRangeFrom,
  RANGE_TO: locale.catalogRangeTo,
  CLEAR_ALL: locale.catalogClearAll,
  APPLIED_FILTERS: locale.catalogAppliedFilters,
  NO_APPLIED_FILTERS: locale.catalogNoAppliedFilters,
  SHOW_FILTERS: locale.catalogShowFilters,
  HIDE_FILTERS: locale.catalogHideFilters,
  LOADING_PRODUCTS: locale.catalogLoadingProducts,
  LOADING_FILTERS: locale.catalogLoadingFilters,
  NO_PRODUCTS: locale.catalogNoProducts,
  NO_FILTERS: locale.catalogNoFilters,
  PRICE: locale.catalogPrice,
  PRICE_ID: 'price',
  CATEGORY: locale.catalogCategory,
  CATEGORY_ID: 'category',
  PROMO_TAG: locale.catalogPromoTag,
  SHORT_SEARCH_QUERY: locale.catalogShortSearchQuery,
  HOME: locale.catalogHome,
  CATALOG: locale.catalogCatalog,
  ALL_CATEGORIES: locale.catalogAllCategories,
  ERROR_LOADING_PRODUCTS: locale.catalogErrorLoadingProducts,
  PAGE: locale.catalogPage,
  OUT: locale.catalogOut,
  ADD_TO_CART: locale.catalogAddToCart,
  ADDING_TO_CART: locale.catalogAddingToCart,
  ADDED_TO_CART: locale.catalogAddedToCart,
};

export const PRODUCT_ATTRIBUTES = {
  WEIGHT: locale.productAttributesWeight,
  FLAVORS: locale.productAttributesFlavors,
  DIET: locale.productAttributesDiet,
  TOPING: locale.productAttributesToping,
  FILLING: locale.productAttributesFilling,
};

export const PRODUCT_TEXT = {
  BASKET: locale.productTextBasket,
  TOTAL: locale.productTextTotal,
  CURRENCY: DEFAULT_CURRENCY,
  DESCRIPTION: locale.productTextDescription,
  GRAMM: locale.productTextGramm,
  ERROR_ADDRESS: locale.productTextErrorAddress,
  CATALOG: locale.productTextCatalog,
  LOADING_PRODUCT: locale.productTextLoadingProduct,
  REMOVE: locale.productTextRemove,
  REMOVING: locale.productTextRemoving,
};

export const DEFAULT_QUANTITY_AMOUNT = 1;

export const CART_TEXT = {
  TITLE: locale.cartTextTitle,
  PRICE: locale.cartTextPrice,
  TOTAL_TITLE: locale.cartTextTotalTitle,
  PRODUCTS_PRICE: locale.cartTextProductsPrice,
  SALE: locale.cartTextSale,
  DELIVERY: locale.cartTextDelivery,
  TOTAL_PRICE: locale.cartTextTotalPrice,
  EMPTY: locale.cartTextEmpty,
  CATALOG: locale.cartTextCatalog,
  PROMO_CODE_APPLY: locale.cartTextPromoCodeApply,
  LOADING_TOTAL: locale.cartTextLoadingTotal,
  MODAL_TEXT: locale.cartTextModalText,
  LOADING_DELETE_PRODUCT: locale.cartTextLoadingDeleteProduct,
  LOADING_DELETE_CART: locale.cartTextLoadingDeleteProductCart,
};

export const PROMO_CODE_TEXT = locale.promoCodeText;

export const PROMO_PLACEHOLDER = locale.promoPlaceholder;

export const PROMO_HEADER_TEXT = locale.promoCodeTextHeader;

export const LANGUAGES = {
  [Language.ENGLISH]: 'English',
  [Language.RUSSIAN]: 'Русский',
  [Language.BELARUS]: 'Беларускi',
  [Language.DUTCH]: 'Nederlands',
};

export const ERROR_MESSAGES = {
  CHECK_YEAR: locale.errorCheckYear,
  DATE_FORMAT: locale.errorDateFormat,
  EMPTY_INPUT: locale.errorEmptyInput,
  INVALID_AGE: locale.errorInvalidAge,
  INVALID_DOMAIN: locale.errorInvalidDomain,
  INVALID_EMAIL: locale.errorInvalidEmail,
  INVALID_FIRST_CHAR: locale.errorInvalidFirstChar,
  INVALID_USING_AT: locale.errorInvalidUsingAt,
  INVALID_USING_DOTS: locale.errorInvalidUsingDots,
  INVALID_PASSWORD: locale.errorInvalidPassword,
  ONE_DIGIT: locale.errorOneDigit,
  ONE_LOWER_LETTER: locale.errorOneLowerLetter,
  ONE_UPPER_LETTER: locale.errorOneUpperLetter,
  ONLY_LETTERS: locale.errorOnlyLetters,
  PASSWORD_MUST_CONTAIN: locale.errorPasswordMustContain,
  POSTAL_CODE_FORMAT: locale.errorPostalCodeFormat,
  PASSWORD_LENGTH: locale.errorPasswordLength,
  INVALID_SPACE: locale.errorInvalidSpace,
  ERROR_REPEAT_PASSWORD: locale.errorRepeatPassword,
};

export const ALERT_TEXT = {
  REGISTRATION_SUCCESS: locale.alertRegistrationSuccess,
  AUTHORIZATION_SUCCESS: locale.alertAuthorizationSuccess,
  LOGOUT_SUCCESS: locale.alertLogoutSuccess,
  ACCOUNT_CREDENTIALS_ERROR: locale.alertAccountCredentialsError,
  DUPLICATE_FIELD: locale.alertDuplicateField,
  ERROR_DEFAULT: locale.alertErrorDefault,
  CHANGE_SUCCESS: locale.alertChangeSuccess,
  PASSWORD_CHANGE_SUCCESS: locale.alertPasswordChangeSuccess,
  INVALID_CURRENT_PASSWORD: locale.alertInvalidCurrentPassword,
  DELETE_ADDRESS_SUCCESS: locale.alertDeleteAddressSuccess,
  CHANGE_ADDRESS_SUCCESS: locale.alertChangeAddressSuccess,
  SET_DEFAULT_ADDRESS: locale.alertSetDefaultAddress,
  DELETE_DEFAULT_ADDRESS: locale.alertDeleteDefaultAddress,
  ADD_ADDRESS_SUCCESS: locale.alertAddAddressSuccess,
  REMOVE_CART_ITEM: locale.alertRemoveCartItem,
  DISCOUNT_CODE_NON: locale.alertDiscountCodeNon,
};

export const CHECKBOX_TEXT = {
  DEFAULT_SAVE: locale.checkboxDefaultSave,
  SAME_ADDRESSES: locale.checkboxSameAddresses,
};

export const DELIVERY_TEXT = {
  PAY: locale.deliveryPay,
  SELF_DELIVERY: locale.deliverySelfDelivery,
  ANONIM_PRESENT: locale.deliveryAnonimPresent,
};

export const DROPDOWN_OPTIONS = {
  DEFAULT: locale.dropdownDefault,
  FALSE: locale.dropdownFalse,
  TRUE: locale.dropdownTrue,
};

export const TAB_ACCOUNT = {
  INFO: locale.tabAccountInfo,
  ADDRESSES: locale.tabAccountAddresses,
  CHANGE_PASS: locale.tabAccountChangePass,
};

export const ADDRESS_TYPE_TEXT = {
  SHIPPING: locale.addressTypeShipping,
  BILLING: locale.addressTypeBilling,
  DEFAULT: locale.addressTypeDefault,
  NONE: locale.addressTypeNone,
};

export const MODAL_TITLE = {
  CHANGE: locale.modalTitleChange,
  CHANGE_USER_INFO: locale.modalTitleChangeUserInfo,
  NEW: locale.modalTitleNew,
  CHANGE_PASSWORD: locale.modalTitleChangePassword,
  CHECKOUT_CART: locale.modalTitleCheckoutCart,
};

export const ADDRESS_KEY = {
  COUNTRY: locale.addressKeyCountry,
  CITY: locale.addressKeyCity,
  STREET: locale.addressKeyStreet,
  POSTAL_CODE: locale.addressKeyPostalCode,
};

export const USER_INFO_KEY = {
  FIRST_NAME: locale.userInfoKeyFirstName,
  LAST_NAME: locale.userInfoKeyLastName,
  DATA_OF_BIRTH: locale.userInfoKeyDataOfBirth,
  EMAIL: locale.userInfoKeyEmail,
};
