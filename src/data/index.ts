import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
import { SUBHEADER_PROMO_TEXT } from '@/constants/constants';

export const PROMO_ITEMS = [
  { icon: fastDeliveryIcon, text: SUBHEADER_PROMO_TEXT.DELIVERY },
  { icon: freshProductsIcon, text: SUBHEADER_PROMO_TEXT.FRESH },
  { icon: wholesaleSale, text: SUBHEADER_PROMO_TEXT.WHOLESALE },
  { icon: naturalIngredients, text: SUBHEADER_PROMO_TEXT.INGREDIENTS },
];
