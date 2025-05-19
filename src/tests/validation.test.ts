import { VALIDATE_CONST } from '@/constants/constants';
import { ErrorMessages } from '@/types/enums';
import {
  validateDateOfBirth,
  validateEMail,
  validateInput,
  validateNoDigitsNoSymbols,
  validatePassword,
  validatePostalCode,
} from '@/utils/validations';

/********** email validation test ***************/

it('email validation of rigth Latin input', () => {
  expect(validateEMail('example@tut.by')).toEqual(null);
});
it('email validation of rigth Cyrillic input', () => {
  expect(validateEMail('пример@мэйл.ру')).toEqual(null);
});
it('email validation of long input', () => {
  expect(
    validateEMail(
      'verylongemailaddress12345@example-thelongestlistofthelongeststuffatthelongestdomainnameatlonglast.com'
    )
  ).toEqual(null);
});
it('email validation of short input', () => {
  expect(validateEMail('a@b.ru')).toEqual(null);
});
it('email validation of double domain', () => {
  expect(validateEMail('info@company.com.by')).toEqual(null);
});

it('email validation of empty input', () => {
  expect(validateEMail('')).toBe(ErrorMessages.EMPTY_INPUT);
});
it('email validation of input without @', () => {
  expect(validateEMail('exampletut.by')).toBe(ErrorMessages.INVALID_EMAIL);
});
it('email validation of invalid input', () => {
  expect(validateEMail('example@tut,by')).toBe(ErrorMessages.INVALID_DOMAIN);
});
it('email validation of beginning with dot', () => {
  expect(validateEMail('.user@mail.com')).toBe(ErrorMessages.INVALID_FIRST_CHAR);
});
it('email validation without domain', () => {
  expect(validateEMail('name@domain')).toBe(ErrorMessages.INVALID_DOMAIN);
});
it('domain validation with wrong characters', () => {
  expect(validateEMail('name@dom!ain.com')).toBe(ErrorMessages.INVALID_DOMAIN);
});

/********** password validation test ***************/

it('password validation for right password', () => {
  expect(validatePassword('aA8asdf$#-')).toEqual(null);
});
it('password validation of empty input', () => {
  expect(validatePassword('')).toBe(ErrorMessages.EMPTY_INPUT);
});
it('password validation of nonLatinic input', () => {
  expect(validatePassword('пароль')).toBe(ErrorMessages.INVALID_PASSWORD);
});
it('password validation for password without upper character', () => {
  expect(validatePassword('a1234567')).toBe(
    'Пароль должен содержать минимум одну заглавную букву.'
  );
});
it('password validation for password without lower character', () => {
  expect(validatePassword('A1234567')).toBe('Пароль должен содержать минимум одну строчную букву.');
});
it('password validation for password without number', () => {
  expect(validatePassword('ABCDEFabcdef')).toBe('Пароль должен содержать минимум одну цифру.');
});
it('password validation for password without upper character and number', () => {
  expect(validatePassword('asdfghjk')).toBe(
    'Пароль должен содержать минимум: одну заглавную букву, одну цифру.'
  );
});
it('password validation for length of password less then 8 characters', () => {
  expect(validatePassword('aA8')).toBe('Пароль должен содержать минимум 8 символов.');
});
it('password validation for all wrong parameters', () => {
  expect(validatePassword('pass')).toBe(
    'Пароль должен содержать минимум: 8 символов, одну заглавную букву, одну цифру.'
  );
});

/********** validateDateOfBirth test ***************/

it('validateDateOfBirth with right input', () => {
  expect(validateDateOfBirth('2000-12-01')).toEqual(null);
});

it('validateDateOfBirth with wrong format', () => {
  expect(validateDateOfBirth('привет')).toBe(ErrorMessages.DATE_FORMAT);
});
it('validateDateOfBirth with empty input', () => {
  expect(validateDateOfBirth('привет')).toBe(ErrorMessages.DATE_FORMAT);
});

it('validateDateOfBirth with 2050 year', () => {
  expect(validateDateOfBirth('2050-12-01')).toBe(ErrorMessages.CHECK_YEAR);
});
it('validateDateOfBirth with 1814 year', () => {
  expect(validateDateOfBirth('1814-12-01')).toBe(ErrorMessages.CHECK_YEAR);
});
it(`validateDateOfBirth with age less than ${VALIDATE_CONST.MIN_AGE}`, () => {
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - VALIDATE_CONST.MIN_AGE + 1);
  expect(validateDateOfBirth(pastDate.toISOString())).toBe(ErrorMessages.INVALID_AGE);
});
it(`validateDateOfBirth with age ${VALIDATE_CONST.MIN_AGE} later in this year`, () => {
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - VALIDATE_CONST.MIN_AGE);
  pastDate.setMonth(11);
  pastDate.setDate(31);
  expect(validateDateOfBirth(pastDate.toISOString())).toBe(ErrorMessages.INVALID_AGE);
});

/********** PostalCode validation test ***************/

it('validatePostalCode', () => {
  expect(validatePostalCode('181412')).toEqual(null);
});
it('isValidPostalCode: 7 digits', () => {
  expect(validatePostalCode('1814121')).toBe(ErrorMessages.POSTAL_CODE_FORMAT);
});
it('isValidPostalCode: 5 digits', () => {
  expect(validatePostalCode('18141')).toBe(ErrorMessages.POSTAL_CODE_FORMAT);
});
it('isValidPostalCode: invalid input', () => {
  expect(validatePostalCode('index!')).toBe(ErrorMessages.POSTAL_CODE_FORMAT);
});

/********** Other validation test***************/
it('validateInput: right input with one char', () => {
  expect(validateInput('a')).toEqual(null);
});
it('validateInput: any special chars', () => {
  expect(validateInput('#$&?')).toEqual(null);
});

it('validateInput: empty input', () => {
  expect(validateInput('')).toBe(ErrorMessages.EMPTY_INPUT);
});
it('validateInput: digit lock', () => {
  expect(validateNoDigitsNoSymbols('123456')).toBe(ErrorMessages.ONLY_LETTERS);
});
it('validateInput: special chars lock', () => {
  expect(validateNoDigitsNoSymbols('###')).toBe(ErrorMessages.ONLY_LETTERS);
});
