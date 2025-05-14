import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import almondFlour from '@/assets/icons/footer-almond.svg';
import sameDayDelivery from '@/assets/icons/footer-delivery.svg';
import handMade from '@/assets/icons/footer-love.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
import { FOOTER_TEXTS, SUBHEADER_PROMO_TEXT } from '@/constants/constants';

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
