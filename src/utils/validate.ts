import { ErrorMessages } from '@/types/enum';

export function validateEMail(str: string): string | null {
  if (str.trim() === '') return ErrorMessages.EMPTY_INPUT;
  if (!/@/.test(str)) return ErrorMessages.INVALID_EMAIL;

  const rightDomain = /@[\d.A-Za-zЁА-яё-]+\.[A-Za-zЁА-яё]{2,}$/;
  if (!rightDomain.test(str)) return ErrorMessages.INVALID_DOMAIN;

  if (/[^\dA-Za-zЁА-яё]/.test(str[0])) return ErrorMessages.INVALID_FIRST_CHAR;

  const emailRegex =
    /^[\dA-Za-zЁА-яё][\w!#$%&*+./=?^`{|}~ЁА-яё’-]*@[\d.A-Za-zЁА-яё-]+\.[A-Za-zЁА-яё]{2,}$/;
  if (emailRegex.test(str)) return null;

  return ErrorMessages.INVALID_EMAIL;
}

export function validatePassword(str: string): string | null {
  const nonLatinRegex = /[^\d!#$%&*+.:=?@A-Za-z{}-]/;
  if (nonLatinRegex.test(str)) return ErrorMessages.INVALID_PASSWORD;

  const resultArray = [];

  if (str.trim().length < ErrorMessages.MIN_PASSWORD_LENGTH) {
    resultArray.push(ErrorMessages.PASSWORD_LENGTH.replace('${}', String(ErrorMessages.MIN_PASSWORD_LENGTH)));
  }
  if (!/[A-Z]/.test(str)) resultArray.push(ErrorMessages.ONE_UPPER_LETTER);
  if (!/[a-z]/.test(str)) resultArray.push(ErrorMessages.ONE_LOWER_LETTER);
  if (!/\d/.test(str)) resultArray.push(ErrorMessages.ONE_DIGIT);

  let result: string | null = null;
  if (resultArray.length > 0) {
    const colon = resultArray.length > 1 ? ':' : '';
    result = `${ErrorMessages.PASSWORD_MUST_CONTAIN}${colon} ${resultArray.join(', ')}.`;
  }
  return result;
}

export function validateDateOfBirth(dateOfBirth: string): string | null {
  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) {
    return ErrorMessages.DATE_FORMAT;
  }

  const userAge = getUserAge(birthDate);
  if (userAge < 0 || userAge > ErrorMessages.MAX_AGE) {
    return ErrorMessages.CHECK_YEAR;
  } else if (userAge < ErrorMessages.MIN_AGE) {
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
  if (/^\d{6}$/.test(postalCode)) return null;
  return ErrorMessages.POSTAL_CODE_FORMAT;
}

export function validateInput(value: string, noSpecialChars: boolean = false): string | null {
  if (!value || value.trim().length === 0) {
    return ErrorMessages.EMPTY_INPUT;
  }
  if (noSpecialChars && /[^A-Za-zА-я]/.test(value)) {
    return ErrorMessages.ONLY_LETTERS;
  }
  return null;
}
