import blueCheeseMacaron from '@/assets/images/macarons/blue-cheese.png';
import chocolateMacaron from '@/assets/images/macarons/choko-banan.png';
import parmesanMacaron from '@/assets/images/macarons/parmesan.png';
import pestoMacaron from '@/assets/images/macarons/pesto.png';
import rosmarineMacaron from '@/assets/images/macarons/rosmarine.png';
import truffleMacaron from '@/assets/images/macarons/truffle.png';
import { CATALOG_TEXTS, FILTER_RANGES } from '@/constants';
import { FilterId, FilterType } from '@/types/enums';
import type { FilterConfigs, Macarons, SelectOption } from '@/types/interfaces';

export const MACARONS: Macarons[] = [
  {
    name: 'Шоколад, банан',
    description: 'Сезонный вкус: молочный  шоколад, отборные свежие бананы',
    image: chocolateMacaron,
    price: 10,
    discountedPrice: 8.75,
  },
  {
    name: 'Пармезан',
    description:
      'Пикантный сладко-соленый вкус. Начинка изготавливается с использованием настоящего итальянского сыра Parmigiano Reggiano и Grana Padano категории DOP.',
    image: parmesanMacaron,
    price: 12,
  },
  {
    name: 'Облепиха, розмарин',
    description: 'Сезонный вкус: белый шоколад, свежие ягоды облепихи, немного розмарина',
    image: rosmarineMacaron,
    price: 9,
    discountedPrice: 7.75,
  },
  {
    name: 'Чёрный трюфель',
    description: 'Белый шоколад, сливки и паста из летнего чёрного итальянского трюфеля.',
    image: truffleMacaron,
    price: 13,
    discountedPrice: 11.75,
  },
  {
    name: 'Голубой сыр',
    description: 'Наш самый пикантный и один из самых популярных вкусов. Это нужно попробовать!',
    image: blueCheeseMacaron,
    price: 6,
  },
  {
    name: 'Песто ',
    description:
      'Внутри ингредиетны классического песто - свежий ароматный базилик, итальянский пармезан, кедровые орешки и всё это в виде ганаша на белом шоколаде.',
    image: pestoMacaron,
    price: 7,
    discountedPrice: 6,
  },
  {
    name: 'Пармезан',
    description:
      'Пикантный сладко-соленый вкус. Начинка изготавливается с использованием настоящего итальянского сыра Parmigiano Reggiano и Grana Padano категории DOP.',
    image: parmesanMacaron,
    price: 12,
  },
  {
    name: 'Шоколад, банан',
    description: 'Сезонный вкус: молочный  шоколад, отборные свежие бананы',
    image: chocolateMacaron,
    price: 10,
    discountedPrice: 8.75,
  },
  {
    name: 'Облепиха, розмарин',
    description: 'Сезонный вкус: белый шоколад, свежие ягоды облепихи, немного розмарина',
    image: rosmarineMacaron,
    price: 9,
    discountedPrice: 7.75,
  },
  {
    name: 'Чёрный трюфель',
    description: 'Белый шоколад, сливки и паста из летнего чёрного итальянского трюфеля.',
    image: truffleMacaron,
    price: 13,
    discountedPrice: 11.75,
  },
  {
    name: 'Голубой сыр',
    description: 'Наш самый пикантный и один из самых популярных вкусов. Это нужно попробовать!',
    image: blueCheeseMacaron,
    price: 6,
  },
  {
    name: 'Песто ',
    description:
      'Внутри ингредиетны классического песто - свежий ароматный базилик, итальянский пармезан, кедровые орешки и всё это в виде ганаша на белом шоколаде.',
    image: pestoMacaron,
    price: 7,
    discountedPrice: 6,
  },
];

export const SORTING_OPTIONS: SelectOption[] = [
  { value: 'price-asc', text: 'Цена: по возрастанию' },
  { value: 'price-desc', text: 'Цена: по убыванию' },
  { value: 'name-asc', text: 'Название: от А-Я' },
  { value: 'name-desc', text: 'Название: от Я-А' },
];

export const PRODUCT_TYPE_FILTER: SelectOption[] = [
  { value: 'macaron', text: 'Макарон' },
  { value: 'rolls', text: 'Трубочки' },
  { value: 'eclair', text: 'Эклеры' },
  { value: 'profiterole', text: 'Профитроли' },
];

export const FLAVOUR_FILTER: SelectOption[] = [
  { value: 'vanilla', text: 'Ванильный' },
  { value: 'chocolate', text: 'Шоколадный' },
  { value: 'nutty', text: 'Ореховый' },
  { value: 'fruity', text: 'Фруктовый' },
  { value: 'berry', text: 'Ягодный' },
  { value: 'exotic', text: 'Экзотический' },
  { value: 'milky', text: 'Молочный' },
  { value: 'spicy', text: 'Специи' },
  { value: 'сaramel', text: 'Карамельный' },
  { value: 'coffee', text: 'Кофейный' },
  { value: 'fish', text: 'Рыбный' },
];

export const DIET_FILTER: SelectOption[] = [
  { value: 'traditional', text: 'Тридиционная' },
  { value: 'gluten-free', text: 'Без глютена' },
  { value: 'sugar-free', text: 'Без сахара' },
  { value: 'lactose-free', text: 'Без лактозы' },
  { value: 'vegan', text: 'Веганская' },
];

export const FILLING_FILTER: SelectOption[] = [
  { value: 'cottage-cheese', text: 'Творог' },
  { value: 'buttercream', text: 'Сливочный крем' },
  { value: 'custard', text: 'Заварной крем' },
  { value: 'condensed-milk', text: 'Сгущенка' },
  { value: 'herring ', text: 'Сельдь' },
  { value: 'caviar ', text: 'Икра' },
  { value: 'no-filling ', text: 'Без наполнтеля' },
];

export const TOPPING_FILTER: SelectOption[] = [
  { value: 'unglazed', text: 'Без глазури' },
  { value: 'icing', text: 'Сахарная помадка' },
  { value: 'chocolate-top', text: 'Шоколадный топинг' },
  { value: 'caramel', text: 'Карамельная глазурь' },
  { value: 'nut-crumble ', text: 'Ореховая Крошка' },
  { value: 'coconut ', text: 'Кокосовая стружка' },
];

export const PROMO_FILTER: SelectOption[] = [
  { value: '', text: 'Выберите...' },
  { value: 'no-promo', text: 'Без скидки' },
  { value: 'promo', text: 'Со скидкой' },
];

export const FILTER_NAMES: Record<FilterId, string> = {
  [FilterId.TYPE]: CATALOG_TEXTS.PRODUCT_TYPE_FILTER,
  [FilterId.TASTE]: CATALOG_TEXTS.TASTE_FILTER,
  [FilterId.DIET]: CATALOG_TEXTS.DIET_FILTER,
  [FilterId.FILLING]: CATALOG_TEXTS.FILLING_FILTER,
  [FilterId.TOPPING]: CATALOG_TEXTS.TOPPING_FILTER,
  [FilterId.PRICE]: CATALOG_TEXTS.PRICE_FILTER,
  [FilterId.WEIGHT]: CATALOG_TEXTS.WEIGHT_FILTER,
  [FilterId.PROMO]: CATALOG_TEXTS.PROMO_FILTER,
};

export const FILTER_CONFIGS: FilterConfigs = {
  checkbox: [
    { id: FilterId.TYPE, type: FilterType.CHECKBOX, options: PRODUCT_TYPE_FILTER },
    { id: FilterId.TASTE, type: FilterType.CHECKBOX, options: FLAVOUR_FILTER },
    { id: FilterId.DIET, type: FilterType.CHECKBOX, options: DIET_FILTER },
    { id: FilterId.FILLING, type: FilterType.CHECKBOX, options: FILLING_FILTER },
    { id: FilterId.TOPPING, type: FilterType.CHECKBOX, options: TOPPING_FILTER },
  ],
  range: [
    {
      id: FilterId.PRICE,
      type: FilterType.RANGE,
      min: FILTER_RANGES.PRICE.MIN,
      max: FILTER_RANGES.PRICE.MAX,
    },
    {
      id: FilterId.WEIGHT,
      type: FilterType.RANGE,
      min: FILTER_RANGES.WEIGHT.MIN,
      max: FILTER_RANGES.WEIGHT.MAX,
    },
  ],
  dropdown: [{ id: FilterId.PROMO, type: FilterType.DROPDOWN, options: PROMO_FILTER }],
};

export const FILTER_TEXTS: Record<FilterId, Record<string, string>> = {
  [FilterId.TYPE]: Object.fromEntries(PRODUCT_TYPE_FILTER.map((item) => [item.value, item.text])),
  [FilterId.TASTE]: Object.fromEntries(FLAVOUR_FILTER.map((item) => [item.value, item.text])),
  [FilterId.DIET]: Object.fromEntries(DIET_FILTER.map((item) => [item.value, item.text])),
  [FilterId.FILLING]: Object.fromEntries(FILLING_FILTER.map((item) => [item.value, item.text])),
  [FilterId.TOPPING]: Object.fromEntries(TOPPING_FILTER.map((item) => [item.value, item.text])),
  [FilterId.PRICE]: {},
  [FilterId.WEIGHT]: {},
  [FilterId.PROMO]: Object.fromEntries(PROMO_FILTER.map((item) => [item.value, item.text])),
};
