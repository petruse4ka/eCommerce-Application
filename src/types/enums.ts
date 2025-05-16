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
  AUTHENTICATION = `${OATH}token`,
  REGISTRATION = '/me/signup',
  LOGIN = '/me/login',
  USER = '/customers/token',
}

export enum ContentType {
  URLENCODED = 'application/x-www-form-urlencoded',
  JSON = 'application/json',
}

export enum ErrorMessages {
  CHECK_YEAR = 'Проверьте корректность года рождения.',
  DATE_FORMAT = 'Введите дату в формате: ГГГГ-ММ-ДД.',
  EMPTY_INPUT = 'Поле обязательно к заполнению.',
  INVALID_AGE = 'Регистрация доступна только пользователям старше 13 лет. Спасибо за понимание!',
  INVALID_DOMAIN = 'Неверный формат домена',
  INVALID_EMAIL = 'Используйте латинские буквы, цифры и специальные символы. Символ «@» обязателен.',
  INVALID_FIRST_CHAR = 'Первый символ должен быть буквой или цифрой.',
  INVALID_PASSWORD = 'Пароль может содержать только латинские буквы, цифры и специальные символы.',
  ONE_DIGIT = 'одну цифру',
  ONE_LOWER_LETTER = 'одну строчную букву',
  ONE_UPPER_LETTER = 'одну заглавную букву',
  ONLY_LETTERS = 'Допустимы только буквы.',
  PASSWORD_MUST_CONTAIN = 'Пароль должен содержать как минимум',
  POSTAL_CODE_FORMAT = 'Почтовый индекс должен состоять из 6 цифр.',
  PASSWORD_LENGTH = '8 символов',
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
}
