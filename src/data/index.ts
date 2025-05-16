import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import almondFlour from '@/assets/icons/footer-almond.svg';
import sameDayDelivery from '@/assets/icons/footer-delivery.svg';
import handMade from '@/assets/icons/footer-love.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
import FormAuthorization from '@/components/forms/authorization';
import { FOOTER_TEXTS, SUBHEADER_PROMO_TEXT } from '@/constants/constants';
import { InputType } from '@/types/enums';

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
    id: 'first-name',
    labelText: 'Ваше имя',
    placeholder: 'Укажите имя',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
  {
    id: 'last-name',
    labelText: 'Ваша фамилия',
    placeholder: 'Укажите фамилию',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
  {
    id: 'date-of-birth',
    labelText: 'День рождения',
    type: InputType.DATE,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
  {
    id: 'password',
    labelText: 'Придумайте пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
  {
    id: 'city',
    labelText: 'Ваш город',
    placeholder: 'Укажите город',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
  {
    id: 'street',
    labelText: 'Ваша улица',
    placeholder: 'Укажите улицу',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
  {
    id: 'postal-code',
    labelText: 'Ваш почтовый индекс',
    placeholder: 'Укажите почтовый индекс',
    type: InputType.NUMBER,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
];

export const INPUTS_AUTHORIZATION_DATA = [
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
    callback: (event: Event): void => {
      FormAuthorization.inputErrorHandler(event, 'email');
    },
  },
  {
    id: 'password',
    labelText: 'Пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
    callback: (event: Event): void => {
      FormAuthorization.inputErrorHandler(event, 'password');
    },
  },
];
