import { VALIDATE_CONST } from '@/constants/constants';
import { ErrorMessages } from '@/types/enums';
import type { ValidationFunction } from '@/types/types';

const validators: Record<string, ValidationFunction> = {
  email: validateEMail,
  password: validatePassword,
  dateOfBirth: validateDateOfBirth,
  firstName: validateNoDigitsNoSymbols,
  lastName: validateNoDigitsNoSymbols,
  shippingPostalcode: validatePostalCode,
  shippingCity: validateNoDigitsNoSymbols,
  shippingStreet: validateInput,
  billingPostalcode: validatePostalCode,
  billingCity: validateNoDigitsNoSymbols,
  billingStreet: validateInput,
};

export function getValidator(type: string): ValidationFunction | undefined {
  return validators[type];
}

export function validateEMail(string_: string): string | null {
  if (string_.trim() === '') return ErrorMessages.EMPTY_INPUT;
  if (/ /.test(string_)) return ErrorMessages.INVALID_SPACE;
  if (/[^\dA-Za-zЁА-яё]/.test(string_[0])) return ErrorMessages.INVALID_FIRST_CHAR;
  if (!/@/.test(string_)) return ErrorMessages.INVALID_EMAIL;

  const rightDomain = /@[\dA-Za-zЁА-яё][\d.A-Za-zЁА-яё-]*\.[A-Za-zЁА-яё]{2,}$/;
  if (!rightDomain.test(string_)) return ErrorMessages.INVALID_DOMAIN;

  const emailRegex = /^[\dA-Za-zЁА-яё][\w!#$%&'-\]^`{|}~ЁА-яё-]+\.[A-Za-zЁА-яё]{2,}$/;
  if (emailRegex.test(string_)) return null;

  return ErrorMessages.INVALID_EMAIL;
}

export function validatePassword(string_: string): string | null {
  if (string_.trim() === '') return ErrorMessages.EMPTY_INPUT;
  const nonLatinRegex = /[^\w!#$%&*+.:=?@^{}-]/;
  if (string_.trim() !== string_) return ErrorMessages.INVALID_SPACE;
  if (nonLatinRegex.test(string_)) return ErrorMessages.INVALID_PASSWORD;

  const resultArray = [];

  if (string_.trim().length < VALIDATE_CONST.MIN_PASSWORD_LENGTH) {
    resultArray.push(
      ErrorMessages.PASSWORD_LENGTH.replace('${}', String(VALIDATE_CONST.MIN_PASSWORD_LENGTH))
    );
  }
  if (!/[A-Z]/.test(string_)) resultArray.push(ErrorMessages.ONE_UPPER_LETTER);
  if (!/[a-z]/.test(string_)) resultArray.push(ErrorMessages.ONE_LOWER_LETTER);
  if (!/\d/.test(string_)) resultArray.push(ErrorMessages.ONE_DIGIT);

  let result: string | null = null;
  if (resultArray.length > 0) {
    const colon = resultArray.length > 1 ? ':' : '';
    result = `${ErrorMessages.PASSWORD_MUST_CONTAIN}${colon} ${resultArray.join(', ')}.`;
  }
  return result;
}

export function validateDateOfBirth(dateOfBirth: string): string | null {
  const birthDate = new Date(dateOfBirth);

  if (birthDate.toDateString().trim() === '') return ErrorMessages.EMPTY_INPUT;

  if (Number.isNaN(birthDate.getTime())) {
    return ErrorMessages.DATE_FORMAT;
  }

  const userAge = getUserAge(birthDate);
  if (userAge < 0 || userAge > VALIDATE_CONST.MAX_AGE) {
    return ErrorMessages.CHECK_YEAR;
  } else if (userAge < VALIDATE_CONST.MIN_AGE) {
    return ErrorMessages.INVALID_AGE;
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
  if (postalCode.trim() === '') return ErrorMessages.EMPTY_INPUT;
  if (postalCode.trim() !== postalCode) return ErrorMessages.INVALID_SPACE;
  if (/^\d{6}$/.test(postalCode)) return null;
  return ErrorMessages.POSTAL_CODE_FORMAT;
}

export function validateInput(value: string): string | null {
  if (value.trim().length === 0) {
    return ErrorMessages.EMPTY_INPUT;
  }
  return null;
}

export function validateNoDigitsNoSymbols(value: string): string | null {
  if (validateInput(value)) return validateInput(value);
  if (/[^A-Za-zА-я-]/.test(value)) {
    return ErrorMessages.ONLY_LETTERS;
  }
  return null;
}
