import { VALIDATE_CONST } from '@/constants';
import { ERROR_MESSAGES } from '@/constants';
import type { ValidationFunction } from '@/types/types';

export const validators: Record<string, ValidationFunction> = {
  email: validateEMail,
  password: validatePassword,
  dateOfBirth: validateDateOfBirth,
  firstName: validateNoDigitsNoSymbols,
  lastName: validateNoDigitsNoSymbols,
  shippingPostalCode: validatePostalCode,
  shippingCity: validateNoDigitsNoSymbols,
  shippingStreet: validateInput,
  billingPostalCode: validatePostalCode,
  billingCity: validateNoDigitsNoSymbols,
  billingStreet: validateInput,
  newPassword: validatePassword,
  currentPassword: validatePassword,
  repeatNewPassword: validatePassword,
  postalCode: validatePostalCode,
  city: validateNoDigitsNoSymbols,
  streetName: validateInput,
};

export function getValidator(type: string): ValidationFunction | undefined {
  return validators[type];
}

export function validateEMail(string_: string): string | null {
  if (string_.trim() === '') return ERROR_MESSAGES.EMPTY_INPUT;
  if (/ /.test(string_)) return ERROR_MESSAGES.INVALID_SPACE;
  if (/[^\dA-Za-zЁА-яё]/.test(string_[0])) return ERROR_MESSAGES.INVALID_FIRST_CHAR;
  if (!/@/.test(string_)) return ERROR_MESSAGES.INVALID_EMAIL;

  const rightDomain = /@[\dA-Za-zЁА-яё][\d.A-Za-zЁА-яё-]*\.[A-Za-zЁА-яё]{2,}$/;
  if (!rightDomain.test(string_)) return ERROR_MESSAGES.INVALID_DOMAIN;

  const matches = string_.match(/@/g);
  if (matches && matches.length > 1) return ERROR_MESSAGES.INVALID_USING_AT;

  if (/\.{2}/.test(string_)) return ERROR_MESSAGES.INVALID_USING_DOTS;
  if (/\.@/.test(string_)) return ERROR_MESSAGES.INVALID_USING_DOTS;

  const emailRegex = /^[\dA-Za-zЁА-яё][\w!#$%&'-\]^`{|}~ЁА-яё-]+\.[A-Za-zЁА-яё]{2,}$/;
  if (emailRegex.test(string_)) return null;

  return ERROR_MESSAGES.INVALID_EMAIL;
}

export function validatePassword(string_: string): string | null {
  if (string_.trim() !== string_) return ERROR_MESSAGES.INVALID_SPACE;
  if (string_.trim() === '') return ERROR_MESSAGES.EMPTY_INPUT;
  const nonLatinRegex = /[^\w!#$%&*+.:=?@^{}-]/;
  if (nonLatinRegex.test(string_)) return ERROR_MESSAGES.INVALID_PASSWORD;

  const resultArray = [];

  if (string_.trim().length < VALIDATE_CONST.MIN_PASSWORD_LENGTH) {
    resultArray.push(
      ERROR_MESSAGES.PASSWORD_LENGTH.replace('${}', String(VALIDATE_CONST.MIN_PASSWORD_LENGTH))
    );
  }
  if (!/[A-Z]/.test(string_)) resultArray.push(ERROR_MESSAGES.ONE_UPPER_LETTER);
  if (!/[a-z]/.test(string_)) resultArray.push(ERROR_MESSAGES.ONE_LOWER_LETTER);
  if (!/\d/.test(string_)) resultArray.push(ERROR_MESSAGES.ONE_DIGIT);

  let result: string | null = null;
  if (resultArray.length > 0) {
    const colon = resultArray.length > 1 ? ':' : '';
    result = `${ERROR_MESSAGES.PASSWORD_MUST_CONTAIN}${colon} ${resultArray.join(', ')}.`;
  }
  return result;
}

export function validateDateOfBirth(dateOfBirth: string): string | null {
  const birthDate = new Date(dateOfBirth);

  if (birthDate.toDateString().trim() === '') return ERROR_MESSAGES.EMPTY_INPUT;

  if (Number.isNaN(birthDate.getTime())) {
    return ERROR_MESSAGES.DATE_FORMAT;
  }

  const userAge = getUserAge(birthDate);
  if (userAge < 0 || userAge > VALIDATE_CONST.MAX_AGE) {
    return ERROR_MESSAGES.CHECK_YEAR;
  } else if (userAge < VALIDATE_CONST.MIN_AGE) {
    return ERROR_MESSAGES.INVALID_AGE;
  } else {
    return null;
  }
}

function getUserAge(birthDate: Date): number {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
}

export function validatePostalCode(postalCode: string): string | null {
  if (postalCode.trim() === '') return ERROR_MESSAGES.EMPTY_INPUT;
  if (postalCode.trim() !== postalCode) return ERROR_MESSAGES.INVALID_SPACE;
  if (/^\d{6}$/.test(postalCode)) return null;
  return ERROR_MESSAGES.POSTAL_CODE_FORMAT;
}

export function validateInput(value: string): string | null {
  if (value.trim().length === 0) {
    return ERROR_MESSAGES.EMPTY_INPUT;
  }
  return null;
}

export function validateNoDigitsNoSymbols(value: string): string | null {
  if (validateInput(value)) return validateInput(value);
  if (/[^A-Za-zА-я-]/.test(value)) {
    return ERROR_MESSAGES.ONLY_LETTERS;
  }
  return null;
}
