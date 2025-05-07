import { validateEMail } from '@/utils/validate';

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
  expect(validateEMail('')).toBe('Field must be filled in');
});
it('email validation of input without @', () => {
  expect(validateEMail('exampletut.by')).toBe(
    'Incorrect email format! Latin and Cyrillic characters, numbers, special characters and the obligatory "@" sign are allowed.'
  );
});
it('email validation of invalid input', () => {
  expect(validateEMail('example@tut,by')).toBe(
    'Incorrect email format! Latin and Cyrillic characters, numbers, special characters and the obligatory "@" sign are allowed.'
  );
});
it('email validation of beginning with dot', () => {
  expect(validateEMail('.user@mail.com')).toBe(
    'Incorrect email format!  The first character must be a letter or a number.'
  );
});
it('email validation without domain', () => {
  expect(validateEMail('name@domain')).toBe(
    'Incorrect email format! Latin and Cyrillic characters, numbers, special characters and the obligatory "@" sign are allowed.'
  );
});
it('email validation with wrong characters', () => {
  expect(validateEMail('name@dom!ain.com')).toBe(
    'Incorrect email format! Latin and Cyrillic characters, numbers, special characters and the obligatory "@" sign are allowed.'
  );
});
