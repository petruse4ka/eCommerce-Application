import {
  validateDateOfBirth,
  validateEMail,
  validateInput,
  validatePassword,
  validatePostalCode,
} from '@/utils/validate';

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
  expect(validateEMail('')).toBe('Поле обязательно к заполнению.');
});
it('email validation of input without @', () => {
  expect(validateEMail('exampletut.by')).toBe(
    'Неверный формат email! Допускаются латиница и кириллица, цифры, специальные символы. Знак «@» обязателен!'
  );
});
it('email validation of invalid input', () => {
  expect(validateEMail('example@tut,by')).toBe(
    'Неверный формат email! Допускаются латиница и кириллица, цифры, специальные символы. Знак «@» обязателен!'
  );
});
it('email validation of beginning with dot', () => {
  expect(validateEMail('.user@mail.com')).toBe(
    'Неверный формат email! Первым символом должна быть буква или цифра.'
  );
});
it('email validation without domain', () => {
  expect(validateEMail('name@domain')).toBe(
    'Неверный формат email! Допускаются латиница и кириллица, цифры, специальные символы. Знак «@» обязателен!'
  );
});
it('email validation with wrong characters', () => {
  expect(validateEMail('name@dom!ain.com')).toBe(
    'Неверный формат email! Допускаются латиница и кириллица, цифры, специальные символы. Знак «@» обязателен!'
  );
});

it('password validation of empty input', () => {
  expect(validatePassword('')).toBe(
    'Пароль должен содержать как минимум: одну заглавную букву, одну строчную букву, одну цифру. Его длина должна быть минимум 8 символов.'
  );
});
it('password validation of nonLatinic input', () => {
  expect(validatePassword('пароль')).toBe(
    'Пароль может содержать только цифры, латинские и специальные символы.'
  );
});
it('password validation for password without upper character', () => {
  expect(validatePassword('a1234567')).toBe(
    'Пароль должен содержать как минимум: одну заглавную букву'
  );
});
it('password validation for password without lower character', () => {
  expect(validatePassword('A1234567')).toBe(
    'Пароль должен содержать как минимум: одну строчную букву'
  );
});
it('password validation for password without number', () => {
  expect(validatePassword('ABCDEFabcdef')).toBe('Пароль должен содержать как минимум: одну цифру');
});
it('password validation for password without upper character and number', () => {
  expect(validatePassword('asdfghjk')).toBe(
    'Пароль должен содержать как минимум: одну заглавную букву, одну цифру'
  );
});
it('password validation for length of password less then 8 characters', () => {
  expect(validatePassword('aA8')).toBe('Длина пароля  должна быть минимум 8 символов.');
});
it('password validation for all wrong parameters', () => {
  expect(validatePassword('pass')).toBe(
    'Пароль должен содержать как минимум: одну заглавную букву, одну цифру. Его длина должна быть минимум 8 символов.'
  );
});
it('password validation for right password', () => {
  expect(validatePassword('aA8asdf$#-')).toEqual(null);
});

it('validateDateOfBirth with right input', () => {
  expect(validateDateOfBirth('2000-12-01')).toEqual(null);
});
it('validateDateOfBirth with wrong format', () => {
  expect(validateDateOfBirth('привет')).toBe('Формат даты: ГГГГ-ММ-ДД');
});
it('validateDateOfBirth with empty input', () => {
  expect(validateDateOfBirth('привет')).toBe('Формат даты: ГГГГ-ММ-ДД');
});

it('validateDateOfBirth with 2050 year', () => {
  expect(validateDateOfBirth('2050-12-01')).toBe('Проверьте, как введен год рождения.');
});
it('validateDateOfBirth with 1814 year', () => {
  expect(validateDateOfBirth('1814-12-01')).toBe('Проверьте, как введен год рождения.');
});
it('validateDateOfBirth with age less than 13', () => {
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - 12);
  expect(validateDateOfBirth(pastDate.toISOString())).toBe(
    'Допустимый возраст пользователя - старше 13 лет.'
  );
});
it('validateDateOfBirth with age 13 later in this year', () => {
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - 13);
  pastDate.setMonth(11);
  pastDate.setDate(31);
  expect(validateDateOfBirth(pastDate.toISOString())).toBe(
    'Допустимый возраст пользователя - старше 13 лет.'
  );
});

it('validatePostalCode', () => {
  expect(validatePostalCode('181412')).toEqual(null);
});
it('isValidPostalCode: 7 digits', () => {
  expect(validatePostalCode('1814121')).toBe('Почтовый индекс должен содержать ровно 6 цифр!');
});
it('isValidPostalCode: 5 digits', () => {
  expect(validatePostalCode('18141')).toBe('Почтовый индекс должен содержать ровно 6 цифр!');
});
it('isValidPostalCode: invalid input', () => {
  expect(validatePostalCode('index!')).toBe('Почтовый индекс должен содержать ровно 6 цифр!');
});

it('validateInput: empty input', () => {
  expect(validateInput('')).toBe('Поле не должно быть пустым!');
});
it('validateInput: digit lock', () => {
  expect(validateInput('123456', true)).toBe('Допустимы только буквы!');
});
it('validateInput: special chars lock', () => {
  expect(validateInput('###', true)).toBe('Допустимы только буквы!');
});
it('validateInput: right input', () => {
  expect(validateInput('a', true)).toEqual(null);
});
it('validateInput: any chars', () => {
  expect(validateInput('###')).toEqual(null);
});
