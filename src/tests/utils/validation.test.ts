import { VALIDATE_CONST } from '@/constants';
import { ERROR_MESSAGES } from '@/constants';
import {
  validateDateOfBirth,
  validateEMail,
  validateInput,
  validateNoDigitsNoSymbols,
  validatePassword,
  validatePostalCode,
} from '@/utils/validations';

describe('Email validation', () => {
  test('should accept Latin email', () => {
    expect(validateEMail('example@tut.by')).toEqual(null);
  });

  test('should accept Cyrillic email', () => {
    expect(validateEMail('пример@мэйл.ру')).toEqual(null);
  });

  test('should accept long email', () => {
    expect(
      validateEMail(
        'verylongemailaddress12345@example-thelongestlistofthelongeststuffatthelongestdomainnameatlonglast.com'
      )
    ).toEqual(null);
  });

  test('should accept short email', () => {
    expect(validateEMail('a@b.ru')).toEqual(null);
  });

  test('should accept double domain', () => {
    expect(validateEMail('info@company.com.by')).toEqual(null);
  });

  test('should reject empty input', () => {
    expect(validateEMail('')).toBe(ERROR_MESSAGES.EMPTY_INPUT);
  });
});

describe('Email validation', () => {
  test('should reject email without @', () => {
    expect(validateEMail('exampletut.by')).toBe(ERROR_MESSAGES.INVALID_EMAIL);
  });

  test('should reject email with invalid domain', () => {
    expect(validateEMail('example@tut,by')).toBe(ERROR_MESSAGES.INVALID_DOMAIN);
  });

  test('should reject email starting with dot', () => {
    expect(validateEMail('.user@mail.com')).toBe(ERROR_MESSAGES.INVALID_FIRST_CHAR);
  });

  test('should reject email with no domain extension', () => {
    expect(validateEMail('name@domain')).toBe(ERROR_MESSAGES.INVALID_DOMAIN);
  });

  test('should reject email with special characters in domain', () => {
    expect(validateEMail('name@dom!ain.com')).toBe(ERROR_MESSAGES.INVALID_DOMAIN);
  });
});

describe('Password validation', () => {
  test('should accept valid password', () => {
    expect(validatePassword('aA8asdf$#-')).toEqual(null);
  });

  test('should reject empty password', () => {
    expect(validatePassword('')).toBe(ERROR_MESSAGES.EMPTY_INPUT);
  });

  test('should reject non-Latin password', () => {
    expect(validatePassword('пароль')).toBe(ERROR_MESSAGES.INVALID_PASSWORD);
  });

  test('should reject password without uppercase letter', () => {
    expect(validatePassword('a1234567')).toBe(
      `${ERROR_MESSAGES.PASSWORD_MUST_CONTAIN} ${ERROR_MESSAGES.ONE_UPPER_LETTER}.`
    );
  });
});

describe('Password validation', () => {
  test('should reject password without lowercase letter', () => {
    expect(validatePassword('A1234567')).toBe(
      `${ERROR_MESSAGES.PASSWORD_MUST_CONTAIN} ${ERROR_MESSAGES.ONE_LOWER_LETTER}.`
    );
  });

  test('should reject password without number', () => {
    expect(validatePassword('ABCDEFabcdef')).toBe(
      `${ERROR_MESSAGES.PASSWORD_MUST_CONTAIN} ${ERROR_MESSAGES.ONE_DIGIT}.`
    );
  });

  test('should reject password without uppercase and number', () => {
    expect(validatePassword('asdfghjk')).toBe(
      `${ERROR_MESSAGES.PASSWORD_MUST_CONTAIN}: ${ERROR_MESSAGES.ONE_UPPER_LETTER}, ${ERROR_MESSAGES.ONE_DIGIT}.`
    );
  });

  test('should reject password shorter than 8 characters', () => {
    expect(validatePassword('aA8')).toBe(
      `${ERROR_MESSAGES.PASSWORD_MUST_CONTAIN} ${ERROR_MESSAGES.PASSWORD_LENGTH.replace('${}', String(VALIDATE_CONST.MIN_PASSWORD_LENGTH))}.`
    );
  });

  test('should reject password with multiple rule violations', () => {
    expect(validatePassword('pass')).toBe(
      `${ERROR_MESSAGES.PASSWORD_MUST_CONTAIN}: ${ERROR_MESSAGES.PASSWORD_LENGTH.replace(
        '${}',
        String(VALIDATE_CONST.MIN_PASSWORD_LENGTH)
      )}, ${ERROR_MESSAGES.ONE_UPPER_LETTER}, ${ERROR_MESSAGES.ONE_DIGIT}.`
    );
  });
});

describe('Date of birth validation', () => {
  test('should accept valid date', () => {
    expect(validateDateOfBirth('2000-12-01')).toEqual(null);
  });

  test('should reject wrong format', () => {
    expect(validateDateOfBirth('привет')).toBe(ERROR_MESSAGES.DATE_FORMAT);
  });

  test('should reject empty input', () => {
    expect(validateDateOfBirth('')).toBe(ERROR_MESSAGES.DATE_FORMAT);
  });

  test('should reject dates in the future', () => {
    expect(validateDateOfBirth('9999-12-01')).toBe(ERROR_MESSAGES.CHECK_YEAR);
  });

  test('should reject dates very far in the past ', () => {
    expect(validateDateOfBirth('1099-12-01')).toBe(ERROR_MESSAGES.CHECK_YEAR);
  });

  test(`should reject age less than ${VALIDATE_CONST.MIN_AGE}`, () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - VALIDATE_CONST.MIN_AGE + 1);
    expect(validateDateOfBirth(pastDate.toISOString())).toBe(ERROR_MESSAGES.INVALID_AGE);
  });

  test(`should reject ${VALIDATE_CONST.MIN_AGE} age if the birthday month/day is later than the current date`, () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - VALIDATE_CONST.MIN_AGE);
    pastDate.setMonth(11);
    pastDate.setDate(31);
    expect(validateDateOfBirth(pastDate.toISOString())).toBe(ERROR_MESSAGES.INVALID_AGE);
  });
});

describe('Postal code validation', () => {
  test('should accept valid postal code', () => {
    expect(validatePostalCode('181412')).toEqual(null);
  });

  test('should reject more than 6 digits', () => {
    expect(validatePostalCode('1814121')).toBe(ERROR_MESSAGES.POSTAL_CODE_FORMAT);
  });

  test('should reject less than 6 digits', () => {
    expect(validatePostalCode('18141')).toBe(ERROR_MESSAGES.POSTAL_CODE_FORMAT);
  });

  test('should reject invalid characters', () => {
    expect(validatePostalCode('index!')).toBe(ERROR_MESSAGES.POSTAL_CODE_FORMAT);
  });
});

describe('Default input validation', () => {
  test('should accept single character', () => {
    expect(validateInput('a')).toEqual(null);
  });

  test('should accept special characters', () => {
    expect(validateInput('#$&?')).toEqual(null);
  });

  test('should reject empty input', () => {
    expect(validateInput('')).toBe(ERROR_MESSAGES.EMPTY_INPUT);
  });

  test('should reject digits only', () => {
    expect(validateNoDigitsNoSymbols('123456')).toBe(ERROR_MESSAGES.ONLY_LETTERS);
  });

  test('should reject special characters only', () => {
    expect(validateNoDigitsNoSymbols('###')).toBe(ERROR_MESSAGES.ONLY_LETTERS);
  });
});
