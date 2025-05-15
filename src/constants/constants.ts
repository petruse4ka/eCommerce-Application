import { Route } from '@/types/enums';
import type { MenuItem } from '@/types/interfaces';

export const MIN_AGE = 13;
export const MAX_AGE = 130;
export const MIN_PASSWORD_LENGTH = 8;

export const SUBHEADER_PROMO_TEXT = {
  DELIVERY: 'Быстрая доставка',
  FRESH: 'Гарантия свежести',
  WHOLESALE: 'Оптовые поставки',
  INGREDIENTS: 'Натуральные ингредиенты',
};

export const AUTHORIZATION_MENU_TEXT = {
  LOGIN: 'Войти',
  REGISTRATION: 'Регистрация',
};

export const MENU_TEXT = {
  HOME: 'Главная',
  ABOUT: 'О нас',
  CONTACTS: 'Контакты',
};

export const ERRORPAGE_TEXTS = {
  HOME: 'Вернуться домой',
  SORRY: 'Извините, страница не найдена',
};

export const UNDER_CONSTRUCTION_TEXTS = {
  HOME: 'Вернуться домой',
  SORRY: 'Эта страница ещё в работе, но скоро всё будет готово!',
};

export const MENU_ITEMS: MenuItem[] = [
  { name: MENU_TEXT.HOME, route: Route.HOME },
  { name: MENU_TEXT.ABOUT, route: Route.ABOUT },
  { name: MENU_TEXT.CONTACTS, route: Route.CONTACTS },
];
