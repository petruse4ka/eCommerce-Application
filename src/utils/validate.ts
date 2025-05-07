export function validateEMail(string_: string): string | null {
  if (string_.trim() === '') return 'Field must be filled in';
  if (/[^\dA-Za-zЁА-яё]/.test(string_[0]))
    return 'Incorrect email format!  The first character must be a letter or a number.';
  const emailRegex =
    /^[\dA-Za-zЁА-яё][\w!#$%&*+./=?^`{|}~ЁА-яё’-]*@[\d.A-Za-zЁА-яё-]+\.[A-Za-zЁА-яё]{2,}$/;
  if (emailRegex.test(string_)) return null;
  return 'Incorrect email format! Latin and Cyrillic characters, numbers, special characters and the obligatory "@" sign are allowed.';
}
