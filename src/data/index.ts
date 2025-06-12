import fastDeliveryIcon from '@/assets/icons/fast-delivery.svg';
import almondFlour from '@/assets/icons/footer-almond.svg';
import sameDayDelivery from '@/assets/icons/footer-delivery.svg';
import handMade from '@/assets/icons/footer-love.svg';
import freshProductsIcon from '@/assets/icons/fresh-products.svg';
import naturalIngredients from '@/assets/icons/natural-ingredients.svg';
import wholesaleSale from '@/assets/icons/wholesale-offer.svg';
import cafe from '@/assets/images/about/cafe.png';
import DaniilPhoto from '@/assets/images/about/daniil.png';
import DaniilHat from '@/assets/images/about/hat2.png';
import KonstantinHat from '@/assets/images/about/hat7.png';
import OlgaHat from '@/assets/images/about/hat8.png';
import KonstantinPhoto from '@/assets/images/about/kostya.png';
import MargoPhoto from '@/assets/images/about/margarita.png';
import OlgaPhoto from '@/assets/images/about/olga-photo.png';
import anonymousIcon from '@/assets/images/guarantees/anonymous.png';
import deliveryIcon from '@/assets/images/guarantees/delivery.png';
import ingerientsIcon from '@/assets/images/guarantees/ingredients.png';
import packagingIcon from '@/assets/images/guarantees/packaging.png';
import corporateIcon from '@/assets/images/packages/corporate.png';
import customIcon from '@/assets/images/packages/custom.png';
import readyIcon from '@/assets/images/packages/ready.png';
import stampIcon from '@/assets/images/packages/stamp.png';
import weddingIcon from '@/assets/images/packages/wedding.png';
import wholesaleIcon from '@/assets/images/packages/wholesale.png';
import anonimDeliveryIcon from '@/assets/images/product/anonimDeliveryIcon.png';
import payDeliveryIcon from '@/assets/images/product/payDeliveryIcon.png';
import selfDeliveryIcon from '@/assets/images/product/selfDeliveryIcon.png';
import { FOOTER_TEXTS, GUARANTEES_TEXTS, PACKAGES_TEXTS, SUBHEADER_PROMO_TEXT } from '@/constants';
import { ABOUT_STYLE } from '@/styles/pages/about';
import { CheckboxText, DeliveryText, InputType } from '@/types/enums';
import type { About, Guarantees, Packages, SelectOption } from '@/types/interfaces';

export const PROMO_ITEMS = [
  { ICON: fastDeliveryIcon, TEXT: SUBHEADER_PROMO_TEXT.DELIVERY },
  { ICON: freshProductsIcon, TEXT: SUBHEADER_PROMO_TEXT.FRESH },
  { ICON: wholesaleSale, TEXT: SUBHEADER_PROMO_TEXT.WHOLESALE },
  { ICON: naturalIngredients, TEXT: SUBHEADER_PROMO_TEXT.INGREDIENTS },
];

export const FOOTER_PROMO_ITEMS = [
  { ICON: handMade, TEXT: FOOTER_TEXTS.FOOTER_PROMO_TEXT.LOVE },
  { ICON: sameDayDelivery, TEXT: FOOTER_TEXTS.FOOTER_PROMO_TEXT.DELIVERY },
  { ICON: almondFlour, TEXT: FOOTER_TEXTS.FOOTER_PROMO_TEXT.INGREDIENTS },
];

export const TEAM = [
  { NAME: 'Konstantin Petrov', NICKNAME: 'petruse4ka', GITHUB: 'https://github.com/petruse4ka' },
  { NAME: 'Daniil Biver', NICKNAME: 'tearzday', GITHUB: 'https://github.com/tearzday' },
  { NAME: 'Olga Paklonskaya', NICKNAME: 'pokolga', GITHUB: 'https://github.com/pokolga' },
  {
    NAME: 'Marharyta Malets',
    NICKNAME: 'margaryta-maletz',
    GITHUB: 'https://github.com/margaryta-maletz',
  },
];

export const SCHOOL_URL = 'https://rs.school/';

export const INPUTS_REGISTRATION_DATA = [
  {
    id: 'firstName',
    labelText: 'Имя',
    placeholder: 'Укажите имя',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'lastName',
    labelText: 'Фамилия',
    placeholder: 'Укажите фамилию',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'dateOfBirth',
    labelText: 'Дата рождения',
    type: InputType.DATE,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'password',
    labelText: 'Пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_ADDRESS_DATA = [
  {
    id: 'Country',
    labelText: 'Страна',
    placeholder: 'Россия',
    type: InputType.TEXT,
    isDisabled: true,
    callback: (): void => {},
  },
  {
    id: 'City',
    labelText: 'Город',
    placeholder: 'Укажите город',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'Street',
    labelText: 'Улица',
    placeholder: 'Укажите улицу',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'PostalCode',
    labelText: 'Почтовый индекс',
    placeholder: 'Укажите почтовый индекс',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_CHANGE_ADDRESS_DATA = [
  {
    id: 'country',
    labelText: 'Страна',
    placeholder: 'Россия',
    type: InputType.TEXT,
    isDisabled: true,
    callback: (): void => {},
  },
  {
    id: 'city',
    labelText: 'Город',
    placeholder: 'Укажите город',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'streetName',
    labelText: 'Улица',
    placeholder: 'Укажите улицу',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'postalCode',
    labelText: 'Почтовый индекс',
    placeholder: 'Укажите почтовый индекс',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
];

export const CHECKBOXES_REGISTRATION_DATA = [
  {
    id: 'is-same-addresses',
    labelText: CheckboxText.SAME_ADDRESSES,
  },
  {
    id: `is-default-address-shipping`,
    labelText: CheckboxText.DEFAULT_SAVE,
  },
  {
    id: `is-default-address-billing`,
    labelText: CheckboxText.DEFAULT_SAVE,
  },
];

export const INPUTS_AUTHORIZATION_DATA = [
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
  },
  {
    id: 'password',
    labelText: 'Пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
];

export const INPUTS_EDIT_USER_INFO_DATA = [
  {
    id: 'firstName',
    labelText: 'Имя',
    placeholder: 'Укажите имя',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'lastName',
    labelText: 'Фамилия',
    placeholder: 'Укажите фамилию',
    type: InputType.TEXT,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'dateOfBirth',
    labelText: 'Дата рождения',
    type: InputType.DATE,
    isRequired: true,
    callback: (): void => {},
  },
  {
    id: 'email',
    labelText: 'E-mail',
    placeholder: 'Укажите e-mail',
    type: InputType.EMAIL,
    isRequired: true,
    callback: (): void => {},
  },
];

export const INPUTS_EDIT_USER_PASSWORD = [
  {
    id: 'currentPassword',
    labelText: 'Текущий пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
  {
    id: 'newPassword',
    labelText: 'Новый пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
  {
    id: 'repeatNewPassword',
    labelText: 'Повторите новый пароль',
    placeholder: 'Укажите пароль',
    type: InputType.PASSWORD,
    isRequired: true,
  },
];

export const PACKAGES: Packages[] = [
  {
    ...PACKAGES_TEXTS.PACKAGES.READY_PACK,
    icon: readyIcon,
    gradient: ['bg-gradient-to-br', 'from-peach', 'to-peach-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.CREATE_OWN,
    icon: customIcon,
    gradient: ['bg-gradient-to-br', 'from-red', 'to-red-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.INDIVIDUAL_PACK,
    icon: stampIcon,
    gradient: ['bg-gradient-to-br', 'from-green', 'to-green-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.WEDDING_PACK,
    icon: weddingIcon,
    gradient: ['bg-gradient-to-br', 'from-orange', 'to-orange-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.CORPORATE_PACK,
    icon: corporateIcon,
    gradient: ['bg-gradient-to-br', 'from-mint', 'to-mint-light'],
  },
  {
    ...PACKAGES_TEXTS.PACKAGES.WHOLESALE_PACK,
    icon: wholesaleIcon,
    gradient: ['bg-gradient-to-br', 'from-lilac', 'to-lilac-light'],
  },
];

export const GUARANTEES: Guarantees[] = [
  {
    ...GUARANTEES_TEXTS.GUARANTEES.INGREDIENTS,
    image: ingerientsIcon,
  },
  {
    ...GUARANTEES_TEXTS.GUARANTEES.PACKAGING,
    image: packagingIcon,
  },
  {
    ...GUARANTEES_TEXTS.GUARANTEES.DELIVERY,
    image: deliveryIcon,
  },
  {
    ...GUARANTEES_TEXTS.GUARANTEES.ANONYMOUS,
    image: anonymousIcon,
  },
];

export const SORTING_OPTIONS: SelectOption[] = [
  { value: '', text: 'Без сортировки' },
  { value: 'price asc', text: 'Цена: по возрастанию' },
  { value: 'price desc', text: 'Цена: по убыванию' },
  { value: 'name.ru asc', text: 'Название: от А-Я' },
  { value: 'name.ru desc', text: 'Название: от Я-А' },
];

export const DELIVERY_ITEMS = [
  { ICON: payDeliveryIcon, TEXT: DeliveryText.PAY },
  { ICON: selfDeliveryIcon, TEXT: DeliveryText.SELF_DELIVERY },
  { ICON: anonimDeliveryIcon, TEXT: DeliveryText.ANONIM_PRESENT },
];

export const ABOUT: About = {
  KONSTANTIN: {
    PersonalText: {
      name: 'Константин Петров',
      role: 'Шеф-кондитер',
      description:
        '<p class="mb-2">Константин – наш бессменный шеф-кондитер и гуру JavaScript! Держит в голове стратегический план, а руку - на пульсе текущей работы. Всегда готов стать рядом в сложной ситуации и спасти подгорающие эклеры или исправить баг в коде коллеги.</p><p class="mb-2"> Родился в Москве, живёт в Нидерландах, - магистр стратегического бизнеса с 15-летним опытом управления проектами, он знает, как превратить любое начинание в успех – будь то стартап, идеально пропечённый профитроль или учебный проект в RS School.</p><p class="mb-2"> В редкие свободные часы Константин покоряет виртуальные миры в компьютерных играх, дебажит код и с энтузиазмом поднимает бокал любимого пива (особенно по пятницам – потому что стратегия требует правильного планирования!).</p>',
      github: TEAM[0],
    },
    PersonalImageBox: {
      photo: { url: KonstantinPhoto, style: ABOUT_STYLE.PHOTO },
      hat: { url: KonstantinHat, style: ABOUT_STYLE.KONSTANTIN_HAT },
    },
  },
  DANIIL: {
    PersonalText: {
      name: 'Даниил Бивер',
      role: 'Кондитер-технолог',
      description:
        '<p class="mb-2">Программный код и крем на эклер — одинаково хороши, когда за дело берётся петербуржец Даниил. С высшим образованием по фундаментальной информатике и трёхлетним коммерческим опытом HTML-верстальщика, он уверенно чувствует себя не только у плиты, но и в логике взаимодействия сложных API.</p><p class="mb-2">Он работает не с визуалом, а с начинкой — авторизовать пользователя, применить промокод, пересчитать корзину... При этом даже под давлением сохраняет хладнокровие, как заварной крем — стабильную текстуру. В каждом проекте он оставляет частичку инженерной точности и немного сладкой магии и умеет сделать это в нужное время, в правильной последовательности и обязательно с любовью к деталям. </p><p class="mb-2">Когда-то он увлекался пошивом сумок и футболок, и этот опыт научил его главному: если строчка легла криво – переделывай, пока не станет идеально. Этот принцип он успешно применяет и в программировании, только теперь вместо ткани – строки кода, а вместо иглы – строгий линтер, который не прощает ошибок. </p>',
      github: TEAM[1],
    },
    PersonalImageBox: {
      photo: { url: DaniilPhoto, style: ABOUT_STYLE.PHOTO },
      hat: { url: DaniilHat, style: ABOUT_STYLE.DANIIL_HAT },
    },
  },
  OLGA: {
    PersonalText: {
      name: 'Ольга Поклонская',
      role: 'Кондитер-оформитель',
      description:
        '<p class="mb-2">Ольга – кондитер-оформитель, мастер эстетики и здравого смысла. Всю профессиональную жизнь она искала гармонию между точностью кода и живым восприятием веб-страниц. Последние 13 лет преподавала JavaScript для веб-дизайнеров, и теперь её ученики работают в самых разных уголках мира – от Японии до Швеции, от EPAM до Google. Правда, её путь в IT прервался не по её желанию, но закрытая дверь – это просто повод поискать окно.</p><p class="mb-2">Юная минчанка, возраст которой всё ещё уступает сумме лет двух её коллег, с интересом учится у команды и вкладывает свои знания в проект. Путешествия и рисование вдохновляют её на новые идеи, а любовь к программированию помогает упорядочить творческий хаос. И пусть оформленные ею страницы не дарят аромата ванили и шоколада, удовольствие от их посещения не уступает наслаждению идеально украшенным эклером.</p>',
      github: TEAM[2],
    },
    PersonalImageBox: {
      photo: { url: OlgaPhoto, style: ABOUT_STYLE.PHOTO },
      hat: { url: OlgaHat, style: ABOUT_STYLE.OLGA_HAT },
    },
  },
  MARGO: {
    PersonalText: {
      name: 'Маргарита Малец',
      role: 'Генеральный директор по подбору персонала и вдохновению',
      description:
        '<p class="mb-2">Маргарита - наш ментор, она же наша муза, она же наш ангел-хранитель, она же верит в нас даже тогда, когда мы сами не знаем, стоит ли верить... Список эпитетов можно продолжать бесконечно, но суть одна:</p><p class="font-bold text-accent my-10 text-[20px] text-center">«Спасибо, Маргарита!»</p>',
      github: TEAM[3],
    },
    PersonalImageBox: {
      photo: { url: MargoPhoto, style: ABOUT_STYLE.PHOTO },
    },
  },
  title: 'Наша команда',
  text: 'Наш рецепт успеха? Добрая щепотка упорства, сладкий джем творчества, немного бессонницы при завершении очередного спринта и парочка асинхронных функций, чтобы всё работало без сбоев. Так что, если вы ищете идеальное сочетание вкуса, логики и лёгкой иронии, добро пожаловать в нашу кондитерскую (и фронтенд) вселенную!',
  image: cafe,
};
