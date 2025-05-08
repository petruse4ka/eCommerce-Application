export function validateEMail(string_: string): string | null {
  if (string_.trim() === '') return 'Поле обязательно к заполнению.';
  if (/[^\dA-Za-zЁА-яё]/.test(string_[0]))
    return 'Неверный формат email! Первым символом должна быть буква или цифра.';
  const emailRegex =
    /^[\dA-Za-zЁА-яё][\w!#$%&*+./=?^`{|}~ЁА-яё’-]*@[\d.A-Za-zЁА-яё-]+\.[A-Za-zЁА-яё]{2,}$/;
  if (emailRegex.test(string_)) return null;
  return 'Неверный формат email! Допускаются латиница и кириллица, цифры, специальные символы. Знак «@» обязателен!';
}

export function validatePassword(string_: string): string | null {
  const nonLatinRegex = /[^\d!#$%&*+.:=?@A-Za-z{}-]/;
  if (nonLatinRegex.test(string_))
    return 'Пароль может содержать только цифры, латинские и специальные символы.';

  let result = '';
  const resultArray = [];
  if (!/[A-Z]/.test(string_)) resultArray.push('одну заглавную букву');
  if (!/[a-z]/.test(string_)) resultArray.push('одну строчную букву');
  if (!/\d/.test(string_)) resultArray.push('одну цифру');

  if (resultArray.length > 0)
    result = 'Пароль должен содержать как минимум: ' + resultArray.join(', ');
  const minLengthOfPassword = 8;
  if (string_.trim().length < minLengthOfPassword) {
    const prefix = (result.length > 0 && '. Его длина') || 'Длина пароля ';
    result += `${prefix} должна быть минимум ${minLengthOfPassword} символов.`;
  }
  return result || null;
}

export function validateDateOfBirth(dateOfBirth: string): string | null {
  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) {
    return 'Формат даты: ГГГГ-ММ-ДД';
  }
  const userAge = getUserAge(birthDate);
  let result = '';
  if (userAge < 0 || userAge > 130) {
    result = 'Проверьте, как введен год рождения. ';
  } else if (userAge < 13) {
    result = 'Допустимый возраст пользователя - старше 13 лет.';
  } else {
    return null;
  }
  return result;
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
