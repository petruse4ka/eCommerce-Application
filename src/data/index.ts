import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import almondFlour from '@/assets/icons/footer-almond.svg';
import sameDayDelivery from '@/assets/icons/footer-delivery.svg';
import handMade from '@/assets/icons/footer-love.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
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
import { CheckboxText, DeliveryText, InputType } from '@/types/enums';
import type { Guarantees, Packages, SelectOption } from '@/types/interfaces';

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
    labelText: 'Имя',
    placeholder: 'Укажите имя',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'lastName',
    labelText: 'Фамилия',
    placeholder: 'Укажите фамилию',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'dateOfBirth',
    labelText: 'Дата рождения',
    type: InputType.DATE,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'password',
    labelText: 'Пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_ADDRESS_DATA = [
  {
    id: 'Country',
    labelText: 'Страна',
    placeholder: 'Россия',
    type: InputType.TEXT,
    isDisabled: true,
    callback: (): void => {},
  },
  {
    id: 'City',
    labelText: 'Город',
    placeholder: 'Укажите город',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'Street',
    labelText: 'Улица',
    placeholder: 'Укажите улицу',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'PostalCode',
    labelText: 'Почтовый индекс',
    placeholder: 'Укажите почтовый индекс',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
];

export const CHECKBOXES_REGISTRATION_DATA = [
  {
    id: 'is-same-addresses',
    labelText: CheckboxText.SAME_ADDRESSES,
  },
  {
    id: `is-default-address-shipping`,
    labelText: CheckboxText.DEFAULT_SAVE,
  },
  {
    id: `is-default-address-billing`,
    labelText: CheckboxText.DEFAULT_SAVE,
  },
];

export const INPUTS_AUTHORIZATION_DATA = [
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
  },
  {
    id: 'password',
    labelText: 'Пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
];

export const INPUTS_EDIT_USER_INFO_DATA = [
  {
    id: 'firstName',
    labelText: 'Имя',
    placeholder: 'Укажите имя',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'lastName',
    labelText: 'Фамилия',
    placeholder: 'Укажите фамилию',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'dateOfBirth',
    labelText: 'Дата рождения',
    type: InputType.DATE,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_EDIT_USER_PASSWORD = [
  {
    id: 'currentPassword',
    labelText: 'Текущий пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
  {
    id: 'newPassword',
    labelText: 'Новый пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
  {
    id: 'repeatNewPassword',
    labelText: 'Повторите новый пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
];

export const PACKAGES: Packages[] = [
  {
    ...PACKAGES_TEXTS.PACKAGES.READY_PACK,
    icon: readyIcon,
    gradient: ['bg-gradient-to-br', 'from-peach', 'to-peach-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.CREATE_OWN,
    icon: customIcon,
    gradient: ['bg-gradient-to-br', 'from-red', 'to-red-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.INDIVIDUAL_PACK,
    icon: stampIcon,
    gradient: ['bg-gradient-to-br', 'from-green', 'to-green-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.WEDDING_PACK,
    icon: weddingIcon,
    gradient: ['bg-gradient-to-br', 'from-orange', 'to-orange-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.CORPORATE_PACK,
    icon: corporateIcon,
    gradient: ['bg-gradient-to-br', 'from-mint', 'to-mint-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.WHOLESALE_PACK,
    icon: wholesaleIcon,
    gradient: ['bg-gradient-to-br', 'from-lilac', 'to-lilac-light'],
  },
];

export const GUARANTEES: Guarantees[] = [
  {
    ...GUARANTEES_TEXTS.GUARANTEES.INGREDIENTS,
    image: ingerientsIcon,
  },
  {
    ...GUARANTEES_TEXTS.GUARANTEES.PACKAGING,
    image: packagingIcon,
  },
  {
    ...GUARANTEES_TEXTS.GUARANTEES.DELIVERY,
    image: deliveryIcon,
  },
  {
    ...GUARANTEES_TEXTS.GUARANTEES.ANONYMOUS,
    image: anonymousIcon,
  },
];

export const SORTING_OPTIONS: SelectOption[] = [
  { value: '', text: 'Выберите сортировку...' },
  { value: 'price asc', text: 'Цена: по возрастанию' },
  { value: 'price desc', text: 'Цена: по убыванию' },
  { value: 'name.ru asc', text: 'Название: от А-Я' },
  { value: 'name.ru desc', text: 'Название: от Я-А' },
];

export const DELIVERY_ITEMS = [
  { ICON: payDeliveryIcon, TEXT: DeliveryText.PAY },
  { ICON: selfDeliveryIcon, TEXT: DeliveryText.SELF_DELIVERY },
  { ICON: anonimDeliveryIcon, TEXT: DeliveryText.ANONIM_PRESENT },
];
