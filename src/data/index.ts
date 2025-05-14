import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
import { SUBHEADER_PROMO_TEXT } from '@/constants/constants';
import { InputType } from '@/types/enums';

export const PROMO_ITEMS = [
  { icon: fastDeliveryIcon, text: SUBHEADER_PROMO_TEXT.DELIVERY },
  { icon: freshProductsIcon, text: SUBHEADER_PROMO_TEXT.FRESH },
  { icon: wholesaleSale, text: SUBHEADER_PROMO_TEXT.WHOLESALE },
  { icon: naturalIngredients, text: SUBHEADER_PROMO_TEXT.INGREDIENTS },
];

export const INPUTS_AUTHORIZATION_DATA = [
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
    labelText: 'Пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
    callback: (): void => console.log('Primary button clicked'),
  },
];
