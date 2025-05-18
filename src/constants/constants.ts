import { Route } from '@/types/enums';
import type { MenuItem } from '@/types/interfaces';

export const VALIDATE_CONST = {
  MIN_AGE: 13,
  MAX_AGE: 130,
  MIN_PASSWORD_LENGTH: 8,
  MAX_INPUT_LENGTH: 50,
};

export const SUBHEADER_PROMO_TEXT = {
  DELIVERY: 'Быстрая доставка',
  FRESH: 'Гарантия свежести',
  WHOLESALE: 'Оптовые поставки',
  INGREDIENTS: 'Натуральные ингредиенты',
};

export const AUTHORIZATION_MENU_TEXT = {
  LOGIN: 'Войти',
  REGISTRATION: 'Регистрация',
  ACCOUNT: 'Личный Кабинет',
  LOGOUT: 'Выйти',
};

export const MENU_TEXT = {
  HOME: 'Главная',
  ABOUT: 'О нас',
  CONTACTS: 'Контакты',
};

export const FOOTER_TEXTS = {
  PROMO_TITLE: 'Наши Преимущества',
  MENU_TITLE: 'Полезная информация',
  TEAM_TITLE: 'Наши Кондитеры',
  COPYRIGHT: 'JS/FE 2024Q4 | RS School',
  FOOTER_PROMO_TEXT: {
    LOVE: 'Приготовлено c любовью',
    DELIVERY: 'Доставка в день заказа',
    INGREDIENTS: '100% миндальная мука',
  },
  FOOTER_MENU_TEXT: {
    ABOUT: 'О компании',
    DELIVERY: 'Доставка и оплата',
    TERMS: 'Условия Конфиденциальности',
    RETURNS: 'Возврат заказа',
    CONTACTS: 'Наши контакты',
  },
};

export const AUTHORIZATION_MENU_ITEMS: MenuItem[] = [
  { name: AUTHORIZATION_MENU_TEXT.LOGIN, route: Route.LOGIN },
  { name: AUTHORIZATION_MENU_TEXT.REGISTRATION, route: Route.REGISTRATION },
];

export const UNAUTHORIZED_MENU_ITEMS: MenuItem[] = [
  { name: AUTHORIZATION_MENU_TEXT.ACCOUNT, route: Route.ABOUT },
  { name: AUTHORIZATION_MENU_TEXT.LOGOUT, route: Route.HOME },
];

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

export const FOOTER_MENU_ITEMS: MenuItem[] = [
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.ABOUT, route: Route.ABOUT },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.DELIVERY, route: Route.DELIVERY },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.TERMS, route: Route.TERMS },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.RETURNS, route: Route.RETURNS },
  { name: FOOTER_TEXTS.FOOTER_MENU_TEXT.CONTACTS, route: Route.CONTACTS },
];

export const BTN_TEXT = {
  REGISTRATION_PAGE: 'Зарегистрироваться',
  LOGIN_PAGE: 'Вход',
};

export const INTRO_TEXTS = {
  NAME: 'MACARONSHOP',
  SINCE: 'since 2013',
  TITLE: 'Настоящая любовь',
  CATCH_PHRASE:
    'Пирожные макарон и другие десерты из натуральных ингредиентов, приготовленные с любовью',
};

export const PACKAGES_TEXTS = {
  TITLE: 'Предложения для самых искушенных',
  PACKAGES: {
    READY_PACK: {
      title: 'Готовые Наборы',
      description: 'Готовые наборы со скидкой. Вы можете подобрать набор на подходящий случай',
    },
    CREATE_OWN: {
      title: 'Соберите свой набор',
      description: 'Выберите количество макарун и уникальные вкусы',
    },
    INDIVIDUAL_PACK: {
      title: 'Набор с индивидуальной печатью',
      description: 'Соберите набор макарун с уникальным дизайном',
    },
    WEDDING_PACK: {
      title: 'Свадебные предложения',
      description: 'Нежные макаруны с разными вкусами для украшения вашего торжества',
    },
    CORPORATE_PACK: {
      title: 'Корпоративные подарки',
      description: 'От 85р. за штуку с уникальным дизайном для ваших коллег и партнеров',
    },
    WHOLESALE_PACK: {
      title: 'Оптовые поставки',
      description: 'Уникальные предложения для кофеен, кафе, отелей и других бизнесов',
    },
  },
};

export const GUARANTEES_TEXTS = {
  TITLE: 'Мы обо всем позаботилсь',
  GUARANTEES: {
    INGREDIENTS: {
      title: 'Лучшие Ингредиенты',
      description:
        'Мы используем только премиальные ингредиенты, отборную муку, натуральные красители и свежие начинки',
    },
    PACKAGING: {
      title: 'Красивая Упаковка',
      description:
        'Каждый заказ оформляем в элегантную и стильную упаковку, которая подчеркнёт изысканность макарун',
    },
    DELIVERY: {
      title: 'Доставка в день заказа',
      description:
        'Мы доставляем ваш заказ в тот же день, чтобы вы могли наслаждаться ими именно тогда, когда хочется',
    },
    ANONYMOUS: {
      title: 'Анонимная доставка',
      description:
        'Если вам нужна максимальная конфиденциальность, мы обеспечим анонимную доставку – без логотипов и лишних вопросов',
    },
  },
};
