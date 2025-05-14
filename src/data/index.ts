import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import almondFlour from '@/assets/icons/footer-almond.svg';
import sameDayDelivery from '@/assets/icons/footer-delivery.svg';
import handMade from '@/assets/icons/footer-love.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
import { FOOTER_TEXTS, SUBHEADER_PROMO_TEXT } from '@/constants/constants';

export const PROMO_ITEMS = [
  { icon: fastDeliveryIcon, text: SUBHEADER_PROMO_TEXT.DELIVERY },
  { icon: freshProductsIcon, text: SUBHEADER_PROMO_TEXT.FRESH },
  { icon: wholesaleSale, text: SUBHEADER_PROMO_TEXT.WHOLESALE },
  { icon: naturalIngredients, text: SUBHEADER_PROMO_TEXT.INGREDIENTS },
];

export const FOOTER_PROMO_ITEMS = [
  { icon: handMade, text: FOOTER_TEXTS.FOOTER_PROMO_TEXT.LOVE },
  { icon: sameDayDelivery, text: FOOTER_TEXTS.FOOTER_PROMO_TEXT.DELIVERY },
  { icon: almondFlour, text: FOOTER_TEXTS.FOOTER_PROMO_TEXT.INGREDIENTS },
];
