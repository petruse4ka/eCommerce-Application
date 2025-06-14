import { Route } from '@/types/enums';
import type { MenuItem } from '@/types/interfaces';

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
  DELIVERY: 'Быстрая доставка',
  FRESH: 'Гарантия свежести',
  WHOLESALE: 'Оптовые поставки',
  INGREDIENTS: 'Натуральные ингредиенты',
};

export const AUTHORIZATION_MENU_TEXT = {
  LOGIN: 'Войти',
  REGISTRATION: 'Регистрация',
  ACCOUNT: 'Личный кабинет',
  LOGOUT: 'Выйти',
};

export const MENU_TEXT = {
  HOME: 'Главная',
  CATALOG: 'Каталог',
  ABOUT: 'О нас',
  CONTACTS: 'Контакты',
};

export const FOOTER_TEXTS = {
  PROMO_TITLE: 'Наши преимущества',
  MENU_TITLE: 'Полезная информация',
  TEAM_TITLE: 'Наши кондитеры',
  COPYRIGHT: 'JS/FE 2024Q4 | RS School',
  FOOTER_PROMO_TEXT: {
    LOVE: 'Приготовлено c любовью',
    DELIVERY: 'Доставка в день заказа',
    INGREDIENTS: '100% миндальная мука',
  },
  FOOTER_MENU_TEXT: {
    ABOUT: 'О компании',
    DELIVERY: 'Доставка и оплата',
    TERMS: 'Условия конфиденциальности',
    RETURNS: 'Возврат заказа',
    CONTACTS: 'Наши контакты',
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
  REGISTRATION_PAGE: 'Зарегистрироваться',
  REGISTRATION_REDIRECT: 'Перейти к регистрации',
  LOGIN_PAGE: 'Вход',
  LOGIN_REDIRECT: 'Перейти к авторизации',
  EDIT: 'Редактировать',
  DELETE: 'Удалить',
  SET_PRIMARY: 'Сделать по умолчанию',
  DELETE_PRIMARY: 'Отменить по умолчанию',
  SAVE_CHANGES: 'Сохранить изменения',
  ADD_NEW_ADDRESS: 'Добавить новый адрес',
  CHECKOUT: 'Оформить заказ',
  APPLY: 'Применить',
  CLEAR_CART: 'Очистить корзину',
  FINISH_CART: 'Спасибо за заказ',
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
      title: 'Готовые наборы',
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
  TITLE: 'Мы обо всем позаботились',
  GUARANTEES: {
    INGREDIENTS: {
      title: 'Лучшие ингредиенты',
      description:
        'Мы используем только премиальные ингредиенты, отборную муку, натуральные красители и свежие начинки',
    },
    PACKAGING: {
      title: 'Красивая упаковка',
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

export const FIELDSET_LABELS = {
  PERSONAL_DATA: 'Персональные данные',
  SHIPPING: 'Адрес доставки',
  BILLING: 'Расчетный адрес',
};

export const PAGE_TITLES = {
  CATALOG: 'Каталог',
  ACCOUNT: 'Личный Кабинет',
};

export const CATALOG_TEXTS = {
  TOTAL_PRODUCTS: 'Всего товаров',
  SORTY_BY: 'Сортировка',
  SEARCH_PLACEHOLDER: 'Поиск...',
  PRODUCT_TYPE_FILTER: 'Тип десерта',
  TASTE_FILTER: 'Вкус',
  DIET_FILTER: 'Диета',
  FILLING_FILTER: 'Наполнитель',
  TOPPING_FILTER: 'Глазурь',
  PROMO_FILTER: 'Спецпредложение',
  PRICE_FILTER: 'Цена',
  WEIGHT_FILTER: 'Вес',
  SHOW_MORE: 'Показать еще ↓',
  SHOW_LESS: 'Скрыть ↑',
  RANGE_FROM: 'от',
  RANGE_TO: 'до',
  CLEAR_ALL: 'Удалить все фильтры',
  APPLIED_FILTERS: 'Выбранные фильтры',
  NO_APPLIED_FILTERS:
    'В данный момент ни один фильтр не выбран. Вы можете выбрать фильтры в списке снизу',
  SHOW_FILTERS: 'Показать фильтры',
  HIDE_FILTERS: 'Скрыть фильтры',
  LOADING_PRODUCTS: 'Обновляем каталог...',
  LOADING_FILTERS: 'Обновляем фильтры...',
  NO_PRODUCTS: 'К сожалению, по выбранным фильтрам в данной категории продуктов не найдено.',
  NO_FILTERS: 'Подходящие фильтры отсутствуют',
  PRICE: 'Цена',
  PRICE_ID: 'price',
  CATEGORY: 'Категория',
  CATEGORY_ID: 'category',
  PROMO_TAG: 'Акция',
  SHORT_SEARCH_QUERY: 'Используйте более 2 символов для поиска',
  HOME: 'Главная',
  CATALOG: 'Каталог',
  ALL_CATEGORIES: 'Все продукты',
  ERROR_LOADING_PRODUCTS: 'Произошла ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.',
  PAGE: 'Страница',
  OUT: 'из',
  ADD_TO_CART: 'В корзину',
  ADDING_TO_CART: 'Кладем в корзину...',
  ADDED_TO_CART: 'Товар в корзине',
};

export const PRODUCT_ATTRIBUTES = {
  WEIGHT: 'Вес',
  FLAVORS: 'Вкус',
  DIET: 'Диета',
  TOPING: 'Глазурь',
  FILLING: 'Начинка',
};

export const PRODUCT_TEXT = {
  BASKET: 'В корзину',
  TOTAL: 'Итого по данной позиции: ',
  CURRENCY: DEFAULT_CURRENCY,
  DESCRIPTION: 'Описание',
  GRAMM: 'г',
  ERROR_ADDRESS:
    'Увы, этот десерт закончился, но загляните в каталог — там вас ждут другие вкусные находки!',
  CATALOG: 'В каталог',
  LOADING_PRODUCT: 'Загружаем продукт...',
};

export const DEFAULT_QUANTITY_AMOUNT = 1;

export const CART_TEXT = {
  TITLE: 'Ваша корзина',
  PRICE: 'Стоимость: ',
  TOTAL_TITLE: 'Итого',
  PRODUCTS_PRICE: 'Стоимость товаров',
  SALE: 'Скидка',
  DELIVERY: 'Доставка',
  TOTAL_PRICE: 'К оплате',
  EMPTY: 'Пока здесь пусто, но всё впереди!\nНайдите то, что вам действительно нужно.',
  CATALOG: 'В каталог',
  PROMO_CODE_APPLY: 'Применен промокод',
  LOADING_TOTAL: 'Обновляем стоимость...',
  MODAL_TEXT: 'Ваш заказ успешно принят! Мы свяжемся с вами для подтверждения информации',
};

export const PROMO_CODE_TEXT = 'SALE10 - промокод на первую покупку';

export const PROMO_PLACEHOLDER = 'Введите промокод';
