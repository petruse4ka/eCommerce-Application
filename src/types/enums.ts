export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  SEARCH = 'search',
  TEL = 'tel',
  EMAIL = 'email',
  SELECT = 'select',
}

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export enum ApiEndpoint {
  OATH = '/oauth/',
  AUTHENTICATION = '/anonymous/token',
  REGISTRATION = '/me/signup',
  LOGIN = '/me/login',
  USER = '/customers/token',
  ME = '/me',
  PRODUCTS = '/products',
  CHANGE_PASS = '/customers/password',
  PRODUCT_TYPES = '/product-types',
  CATEGORIES = '/categories',
}

export enum ContentType {
  URLENCODED = 'application/x-www-form-urlencoded',
  JSON = 'application/json',
}

export enum ErrorMessages {
  CHECK_YEAR = 'Проверьте корректность года рождения',
  DATE_FORMAT = 'Введите дату в формате: ДД-ММ-ГГГГ',
  EMPTY_INPUT = 'Поле обязательно к заполнению',
  INVALID_AGE = 'Регистрация доступна только пользователям старше 13 лет',
  INVALID_DOMAIN = 'Неверный формат домена',
  INVALID_EMAIL = 'Используйте буквы, цифры и специальные символы. Символ «@» обязателен',
  INVALID_FIRST_CHAR = 'Первый символ должен быть буквой или цифрой',
  INVALID_USING_AT = 'Не должно быть более одного знака @',
  INVALID_USING_DOTS = 'Некорректный email',
  INVALID_PASSWORD = 'Пароль может содержать только латинские буквы, цифры и специальные символы',
  ONE_DIGIT = 'одну цифру',
  ONE_LOWER_LETTER = 'одну строчную букву',
  ONE_UPPER_LETTER = 'одну заглавную букву',
  ONLY_LETTERS = 'Допустимы только буквы и дефис',
  PASSWORD_MUST_CONTAIN = 'Пароль должен содержать минимум',
  POSTAL_CODE_FORMAT = 'Почтовый индекс должен состоять из 6 цифр',
  PASSWORD_LENGTH = '8 символов',
  INVALID_SPACE = 'Значение не должно содержать пробелы',
  ERROR_REPEAT_PASSWORD = 'Новый пароль не совпадает',
}

export enum Route {
  HOME = '#/',
  LOGIN = '#/login',
  REGISTRATION = '#/register',
  ERROR = '#/error',
  ABOUT = '#/about',
  CONTACTS = '#/contacts',
  DELIVERY = '#/delivery',
  TERMS = '#/terms',
  RETURNS = '#/returns',
  ACCOUNT = '#/account',
  CATALOG = '#/catalog',
  PRODUCT = '#/product',
}

export enum AlertStatus {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export enum AlertText {
  REGISTRATION_SUCCESS = 'Вы успешно зарегистрировались!',
  AUTHORIZATION_SUCCESS = 'Вы успешно авторизовались!',
  LOGOUT_SUCCESS = 'Вы успешно вышли из системы!',
  ACCOUNT_CREDENTIALS_ERROR = 'Учетная запись клиента с указанными учетными данными не найдена.',
  DUPLICATE_FIELD = 'Пользователь с такой почтой уже существует.',
  ERROR_DEFAULT = 'Проблемы на сервере. Пожалуйста, попробуйте позже',
  CHANGE_SUCCESS = 'Данные пользователя успешно изменены',
  PASSWORD_CHANGE_SUCCESS = 'Пароль успешно изменен',
  INVALID_CURRENT_PASSWORD = 'Текущий пароль не совпадает',
  DELETE_ADDRESS_SUCCESS = 'Адрес успешно удален',
  CHANGE_ADDRESS_SUCCESS = 'Данные адреса успешно изменены',
  SET_DEFAULT_ADDRESS = 'Адрес успешно установлен по умолчанию',
  DELETE_DEFAULT_ADDRESS = 'Адрес успешно удален по умолчанию',
  ADD_ADDRESS_SUCCESS = 'Новый адрес добавлен',
}

export enum CheckboxText {
  DEFAULT_SAVE = 'Сохранить адрес по умолчанию',
  SAME_ADDRESSES = 'Использовать одинаковые адреса',
}

export enum DeliveryText {
  PAY = 'Доставка от 400 руб. в день заказа с 12 до 21. Бесплатно при заказе на сумму от 2000 руб',
  SELF_DELIVERY = 'Самовывоз - бесплатно через 3 часа после оплаты заказа',
  ANONIM_PRESENT = 'Можем преподнести как анонимный подарок',
}

export enum FilterType {
  CHECKBOX = 'checkbox',
  RANGE = 'range',
  DROPDOWN = 'dropdown',
  PRICE = 'price',
  CATEGORY = 'category',
}

export enum DropdownOptions {
  DEFAULT = 'Выберите...',
  FALSE = 'Нет',
  TRUE = 'Да',
}

export enum TabAccount {
  INFO = 'Личная информация',
  ADDRESSES = 'Адреса',
  CHANGE_PASS = 'Сменить пароль',
}

export enum AddressType {
  SHIPPING = 'shipping',
  BILLING = 'billing',
}

export enum AddressTypeText {
  SHIPPING = 'Адреса доставки',
  BILLING = 'Адреса для расчетов',
  DEFAULT = 'По умолчанию',
  NONE = 'Адресов нет',
}

export enum AddressKey {
  COUNTRY = 'Страна',
  CITY = 'Город',
  STREET = 'Улица',
  POSTAL_CODE = 'Почтовый индекс',
}

export enum UserInfoKey {
  FIRST_NAME = 'Имя',
  LAST_NAME = 'Фамилия',
  DATA_OF_BIRTH = 'Дата рождения',
  EMAIL = 'E-mail',
}

export enum ModalTitle {
  CHANGE = 'Редактирование адреса',
  CHANGE_USER_INFO = 'Редактирование личной информации',
  NEW = 'Новый адрес',
  CHANGE_PASSWORD = 'Смена пароля',
}
