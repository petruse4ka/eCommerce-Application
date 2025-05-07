export function validateEMail(string_: string): string | null {
  if (string_.trim() === '') return 'Field must be filled in';
  if (/[^\dA-Za-zЁА-яё]/.test(string_[0]))
    return 'Incorrect email format!  The first character must be a letter or a number.';
  const emailRegex =
    /^[\dA-Za-zЁА-яё][\w!#$%&*+./=?^`{|}~ЁА-яё’-]*@[\d.A-Za-zЁА-яё-]+\.[A-Za-zЁА-яё]{2,}$/;
  if (emailRegex.test(string_)) return null;
  return 'Incorrect email format! Latin and Cyrillic characters, numbers, special characters and the obligatory "@" sign are allowed.';
}

export function validatePassword(string_: string): string | null {
  const nonLatinRegex = /[^\d!#$%&*+.:=?@A-Za-z{}-]/;
  if (nonLatinRegex.test(string_))
    return 'Password must contain only Latin and special characters and numbers';

  let result = '';
  const resultArray = [];
  if (!/[A-Z]/.test(string_)) resultArray.push('one upper case letter');
  if (!/[a-z]/.test(string_)) resultArray.push('one lower case letter');
  if (!/\d/.test(string_)) resultArray.push('one number');

  if (resultArray.length > 0) result = 'Password must contain at least: ' + resultArray.join(', ');
  const minLengthOfPassword = 8;
  if (string_.trim().length < minLengthOfPassword) {
    const prefix = (result.length > 0 && '. It`s') || 'Password';
    result += `${prefix} length must be ${minLengthOfPassword} characters and more.`;
  }
  return result || null;
}
