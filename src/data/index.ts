import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import almondFlour from '@/assets/icons/footer-almond.svg';
import sameDayDelivery from '@/assets/icons/footer-delivery.svg';
import handMade from '@/assets/icons/footer-love.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
import cafe from '@/assets/images/about/cafe.png';
import DaniilPhoto from '@/assets/images/about/daniil.png';
import KonstantinPhoto from '@/assets/images/about/kostya.png';
import MargoPhoto from '@/assets/images/about/margarita.png';
import OlgaPhoto from '@/assets/images/about/olga.png';
import anonymousIcon from '@/assets/images/guarantees/anonymous.png';
import deliveryIcon from '@/assets/images/guarantees/delivery.png';
import ingerientsIcon from '@/assets/images/guarantees/ingredients.png';
import packagingIcon from '@/assets/images/guarantees/packaging.png';
import corporateIcon from '@/assets/images/packages/corporate.png';
import customIcon from '@/assets/images/packages/custom.png';
import readyIcon from '@/assets/images/packages/ready.png';
import stampIcon from '@/assets/images/packages/stamp.png';
import weddingIcon from '@/assets/images/packages/wedding.png';
import wholesaleIcon from '@/assets/images/packages/wholesale.png';
import anonimDeliveryIcon from '@/assets/images/product/anonimDeliveryIcon.png';
import payDeliveryIcon from '@/assets/images/product/payDeliveryIcon.png';
import selfDeliveryIcon from '@/assets/images/product/selfDeliveryIcon.png';
import { FOOTER_TEXTS, GUARANTEES_TEXTS, PACKAGES_TEXTS, SUBHEADER_PROMO_TEXT } from '@/constants';
import { CHECKBOX_TEXT, DELIVERY_TEXT } from '@/constants';
import { ABOUT_STYLE } from '@/styles/pages/about';
import { InputType } from '@/types/enums';
import type { About, Guarantees, Packages, SelectOption } from '@/types/interfaces';
import { LanguageSelector } from '@/utils/language-selector';

const languageSelector = LanguageSelector.getInstance();
const locale = languageSelector.translations;

export const PROMO_ITEMS = [
  { ICON: fastDeliveryIcon, TEXT: SUBHEADER_PROMO_TEXT.DELIVERY },
  { ICON: freshProductsIcon, TEXT: SUBHEADER_PROMO_TEXT.FRESH },
  { ICON: wholesaleSale, TEXT: SUBHEADER_PROMO_TEXT.WHOLESALE },
  { ICON: naturalIngredients, TEXT: SUBHEADER_PROMO_TEXT.INGREDIENTS },
];

export const FOOTER_PROMO_ITEMS = [
  { ICON: handMade, TEXT: FOOTER_TEXTS.FOOTER_PROMO_TEXT.LOVE },
  { ICON: sameDayDelivery, TEXT: FOOTER_TEXTS.FOOTER_PROMO_TEXT.DELIVERY },
  { ICON: almondFlour, TEXT: FOOTER_TEXTS.FOOTER_PROMO_TEXT.INGREDIENTS },
];

export const TEAM = [
  { NAME: 'Konstantin Petrov', NICKNAME: 'petruse4ka', GITHUB: 'https://github.com/petruse4ka' },
  { NAME: 'Daniil Biver', NICKNAME: 'tearzday', GITHUB: 'https://github.com/tearzday' },
  { NAME: 'Olga Paklonskaya', NICKNAME: 'pokolga', GITHUB: 'https://github.com/pokolga' },
  {
    NAME: 'Marharyta Malets',
    NICKNAME: 'margaryta-maletz',
    GITHUB: 'https://github.com/margaryta-maletz',
  },
];

export const SCHOOL_URL = 'https://rs.school/';

export const INPUTS_REGISTRATION_DATA = [
  {
    id: 'firstName',
    labelText: locale.dataRegistrationFirstName,
    placeholder: locale.dataRegistrationFirstNamePlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'lastName',
    labelText: locale.dataRegistrationLastName,
    placeholder: locale.dataRegistrationLastNamePlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'dateOfBirth',
    labelText: locale.dataRegistrationBirthDate,
    type: InputType.DATE,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'email',
    labelText: locale.dataRegistrationEmail,
    placeholder: locale.dataRegistrationEmailPlaceholder,
    type: InputType.EMAIL,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'password',
    labelText: locale.dataRegistrationPassword,
    placeholder: locale.dataRegistrationPasswordPlaceholder,
    type: InputType.PASSWORD,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_ADDRESS_DATA = [
  {
    id: 'Country',
    labelText: locale.dataAddressCountry,
    placeholder: locale.dataAddressCountryPlaceholder,
    type: InputType.TEXT,
    isDisabled: true,
    callback: (): void => {},
  },
  {
    id: 'City',
    labelText: locale.dataAddressCity,
    placeholder: locale.dataAddressCityPlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'Street',
    labelText: locale.dataAddressStreet,
    placeholder: locale.dataAddressStreetPlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'PostalCode',
    labelText: locale.dataAddressPostalCode,
    placeholder: locale.dataAddressPostalCodePlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_CHANGE_ADDRESS_DATA = [
  {
    id: 'country',
    labelText: locale.dataAddressCountry,
    placeholder: locale.dataAddressCountryPlaceholder,
    type: InputType.TEXT,
    isDisabled: true,
    callback: (): void => {},
  },
  {
    id: 'city',
    labelText: locale.dataAddressCity,
    placeholder: locale.dataAddressCityPlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'streetName',
    labelText: locale.dataAddressStreet,
    placeholder: locale.dataAddressStreetPlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'postalCode',
    labelText: locale.dataAddressPostalCode,
    placeholder: locale.dataAddressPostalCodePlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
];

export const CHECKBOXES_REGISTRATION_DATA = [
  {
    id: 'is-same-addresses',
    labelText: CHECKBOX_TEXT.SAME_ADDRESSES,
  },
  {
    id: `is-default-address-shipping`,
    labelText: CHECKBOX_TEXT.DEFAULT_SAVE,
  },
  {
    id: `is-default-address-billing`,
    labelText: CHECKBOX_TEXT.DEFAULT_SAVE,
  },
];

export const INPUTS_AUTHORIZATION_DATA = [
  {
    id: 'email',
    labelText: locale.dataRegistrationEmail,
    placeholder: locale.dataRegistrationEmailPlaceholder,
    type: InputType.EMAIL,
    isRequired: true,
  },
  {
    id: 'password',
    labelText: locale.dataRegistrationPassword,
    placeholder: locale.dataRegistrationPasswordPlaceholder,
    type: InputType.PASSWORD,
    isRequired: true,
  },
];

export const INPUTS_EDIT_USER_INFO_DATA = [
  {
    id: 'firstName',
    labelText: locale.dataRegistrationFirstName,
    placeholder: locale.dataRegistrationFirstNamePlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'lastName',
    labelText: locale.dataRegistrationLastName,
    placeholder: locale.dataRegistrationLastNamePlaceholder,
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'dateOfBirth',
    labelText: locale.dataRegistrationBirthDate,
    type: InputType.DATE,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'email',
    labelText: locale.dataRegistrationEmail,
    placeholder: locale.dataRegistrationEmailPlaceholder,
    type: InputType.EMAIL,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_EDIT_USER_PASSWORD = [
  {
    id: 'currentPassword',
    labelText: locale.dataRegistrationCurrentPassword,
    placeholder: locale.dataRegistrationPasswordPlaceholder,
    type: InputType.PASSWORD,
    isRequired: true,
  },
  {
    id: 'newPassword',
    labelText: locale.dataRegistrationNewPassword,
    placeholder: locale.dataRegistrationPasswordPlaceholder,
    type: InputType.PASSWORD,
    isRequired: true,
  },
  {
    id: 'repeatNewPassword',
    labelText: locale.dataRegistrationRepeatNewPassword,
    placeholder: locale.dataRegistrationPasswordPlaceholder,
    type: InputType.PASSWORD,
    isRequired: true,
  },
];

export const PACKAGES: Packages[] = [
  {
    title: PACKAGES_TEXTS.PACKAGES.READY_PACK.TITLE,
    description: PACKAGES_TEXTS.PACKAGES.READY_PACK.DESCRIPTION,
    icon: readyIcon,
    gradient: ['bg-gradient-to-br', 'from-peach', 'to-peach-light'],
  },
  {
    title: PACKAGES_TEXTS.PACKAGES.CREATE_OWN.TITLE,
    description: PACKAGES_TEXTS.PACKAGES.CREATE_OWN.DESCRIPTION,
    icon: customIcon,
    gradient: ['bg-gradient-to-br', 'from-red', 'to-red-light'],
  },
  {
    title: PACKAGES_TEXTS.PACKAGES.INDIVIDUAL_PACK.TITLE,
    description: PACKAGES_TEXTS.PACKAGES.INDIVIDUAL_PACK.DESCRIPTION,
    icon: stampIcon,
    gradient: ['bg-gradient-to-br', 'from-green', 'to-green-light'],
  },
  {
    title: PACKAGES_TEXTS.PACKAGES.WEDDING_PACK.TITLE,
    description: PACKAGES_TEXTS.PACKAGES.WEDDING_PACK.DESCRIPTION,
    icon: weddingIcon,
    gradient: ['bg-gradient-to-br', 'from-orange', 'to-orange-light'],
  },
  {
    title: PACKAGES_TEXTS.PACKAGES.CORPORATE_PACK.TITLE,
    description: PACKAGES_TEXTS.PACKAGES.CORPORATE_PACK.DESCRIPTION,
    icon: corporateIcon,
    gradient: ['bg-gradient-to-br', 'from-mint', 'to-mint-light'],
  },
  {
    title: PACKAGES_TEXTS.PACKAGES.WHOLESALE_PACK.TITLE,
    description: PACKAGES_TEXTS.PACKAGES.WHOLESALE_PACK.DESCRIPTION,
    icon: wholesaleIcon,
    gradient: ['bg-gradient-to-br', 'from-lilac', 'to-lilac-light'],
  },
];

export const GUARANTEES: Guarantees[] = [
  {
    title: GUARANTEES_TEXTS.GUARANTEES.INGREDIENTS.TITLE,
    description: GUARANTEES_TEXTS.GUARANTEES.INGREDIENTS.DESCRIPTION,
    image: ingerientsIcon,
  },
  {
    title: GUARANTEES_TEXTS.GUARANTEES.PACKAGING.TITLE,
    description: GUARANTEES_TEXTS.GUARANTEES.PACKAGING.DESCRIPTION,
    image: packagingIcon,
  },
  {
    title: GUARANTEES_TEXTS.GUARANTEES.DELIVERY.TITLE,
    description: GUARANTEES_TEXTS.GUARANTEES.DELIVERY.DESCRIPTION,
    image: deliveryIcon,
  },
  {
    title: GUARANTEES_TEXTS.GUARANTEES.ANONYMOUS.TITLE,
    description: GUARANTEES_TEXTS.GUARANTEES.ANONYMOUS.DESCRIPTION,
    image: anonymousIcon,
  },
];

export const SORTING_OPTIONS: SelectOption[] = [
  { value: '', text: locale.dataSortingNoSort },
  { value: 'price asc', text: locale.dataSortingPriceAsc },
  { value: 'price desc', text: locale.dataSortingPriceDesc },
  { value: 'name.ru asc', text: locale.dataSortingNameAsc },
  { value: 'name.ru desc', text: locale.dataSortingNameDesc },
];

export const DELIVERY_ITEMS = [
  { ICON: payDeliveryIcon, TEXT: DELIVERY_TEXT.PAY },
  { ICON: selfDeliveryIcon, TEXT: DELIVERY_TEXT.SELF_DELIVERY },
  { ICON: anonimDeliveryIcon, TEXT: DELIVERY_TEXT.ANONIM_PRESENT },
];

export const ABOUT: About = {
  KONSTANTIN: {
    PersonalText: {
      name: locale.aboutKonstantinName,
      role: locale.aboutKonstantinRole,
      annotation: locale.aboutKonstantinAnnotation,
      description: [
        locale.aboutKonstantinDesc1,
        locale.aboutKonstantinDesc2,
        locale.aboutKonstantinDesc3,
      ],
      github: TEAM[0],
    },
    PersonalImageBox: {
      photo: { url: KonstantinPhoto, style: ABOUT_STYLE.PHOTO },
    },
  },
  DANIIL: {
    PersonalText: {
      name: locale.aboutDaniilName,
      role: locale.aboutDaniilRole,
      annotation: locale.aboutDaniilAnnotation,
      description: [locale.aboutDaniilDesc1, locale.aboutDaniilDesc2, locale.aboutDaniilDesc3],
      github: TEAM[1],
    },
    PersonalImageBox: {
      photo: { url: DaniilPhoto, style: ABOUT_STYLE.PHOTO },
    },
  },
  OLGA: {
    PersonalText: {
      name: locale.aboutOlgaName,
      role: locale.aboutOlgaRole,
      annotation: locale.aboutOlgaAnnotation,
      description: [locale.aboutOlgaDesc1, locale.aboutOlgaDesc2],
      github: TEAM[2],
    },
    PersonalImageBox: {
      photo: { url: OlgaPhoto, style: ABOUT_STYLE.PHOTO },
    },
  },
  MARGO: {
    PersonalText: {
      name: locale.aboutMargoName,
      role: locale.aboutMargoRole,
      annotation: locale.aboutMargoAnnotation,
      description: [locale.aboutMargoDesc1, locale.aboutMargoDesc2],
      github: TEAM[3],
    },
    PersonalImageBox: {
      photo: { url: MargoPhoto, style: ABOUT_STYLE.PHOTO },
    },
  },
  title: locale.aboutTitle,
  successRecipeTitle: locale.aboutSuccessRecipeTitle,
  text: locale.aboutText,
  tributeText: locale.aboutTributeText,
  more: locale.aboutMore,
  image: cafe,
  tributeTitle: locale.aboutTributeTitle,
  joinRS: locale.joinRS,
  ShowMore: locale.aboutShowMore,
  ShowLess: locale.aboutShowLess,
};

export const SVG_ICONS = {
  ACCOUNT_EDIT_ICON:
    'M2 17V20H10V18.11H3.9V17C3.9 16.36 7.03 14.9 10 14.9C10.96 14.91 11.91 15.04 12.83 15.28L14.35 13.76C12.95 13.29 11.5 13.03 10 13C7.33 13 2 14.33 2 17M10 4C7.79 4 6 5.79 6 8S7.79 12 10 12 14 10.21 14 8 12.21 4 10 4M10 10C8.9 10 8 9.11 8 8S8.9 6 10 6 12 6.9 12 8 11.11 10 10 10M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.86 11.14 20.21 11.14 20.42 11.35L21.7 12.63C21.91 12.84 21.91 13.19 21.7 13.4M12 18.94L18.06 12.88L20.11 14.88L14.11 20.95H12V18.94',
  HOME_EDIT_ICON:
    'M 21.0413,11.14C 21.1827,11.14 21.3173,11.1973 21.4213,11.3027L 22.6973,12.5787C 22.912,12.792 22.912,13.14 22.6973,13.3493L 21.6973,14.3493L 19.6507,12.3027L 20.6507,11.3027C 20.76,11.1973 20.9013,11.14 21.0413,11.14 Z M 19.0627,12.88L 21.1093,14.932L 15.0627,21L 13,21L 13,18.9373L 19.0627,12.88 Z M 12,5.688L 7,10.188L 7,18L 11,18L 11,20L 5,20L 5,12L 2,12L 12,3L 19.4587,9.71285L 17,12.1716L 17,10.188L 12,5.688 Z',
  SHIELD_EDIT_ICON:
    'M21.7 13.6L20.4 12.3C20.3 12.2 20.2 12.1 20 12.1C19.9 12.1 19.7 12.2 19.6 12.3L18.6 13.3L20.6 15.3L21.6 14.3C21.9 14.1 21.9 13.8 21.7 13.6M12 19.9V22H14.1L20.2 15.9L18.2 13.8L12 19.9M10 22.3C5.9 20.3 3 15.8 3 11V5L12 1L21 5V8.1L19 10.1V6.3L12 3.2L5 6.3V11.2C5 14.7 7.2 18.3 10 20.1V22.3Z',
  THEME_SELECTOR_ICON:
    'M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z',
  CART_ICON:
    'M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z',
  ACCOUNT_ICON:
    'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z',
  LOGIN_ICON:
    'M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z',
  LOGOUT_ICON:
    'M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z',
  REGISTER_ICON:
    'M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z',
  GITHUB_ICON:
    'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z',
  FIRST_ICON: 'M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z',
  LAST_ICON: 'M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z',
  NEXT_ICON: 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
  PREVIOUS_ICON: 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
  DELETE_ICON:
    'M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z',
  EDIT_ICON:
    'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
  STAR_ICON:
    'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
  STAR_OFF_ICON:
    'M22.1 21.5L2.4 1.7L1.1 3L6.9 8.8L2 9.2L7.5 14L5.9 21L12.1 17.3L18.3 21L18 19.8L20.9 22.7L22.1 21.5M15.8 17.7L12 15.4L8.2 17.7L9.2 13.4L5.9 10.5L8.4 10.3L15.8 17.7M11.2 8L10 6.8L12 2L14.8 8.6L22 9.2L16.9 13.6L15.8 12.5L18.2 10.5L13.8 10.1L12.1 6.1L11.2 8Z',
  LANGUAGE_ICON:
    'M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z',
};
