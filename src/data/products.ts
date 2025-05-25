import blueCheeseMacaron from '@/assets/images/macarons/blue-cheese.png';
import chocolateMacaron from '@/assets/images/macarons/choko-banan.png';
import parmesanMacaron from '@/assets/images/macarons/parmesan.png';
import pestoMacaron from '@/assets/images/macarons/pesto.png';
import rosmarineMacaron from '@/assets/images/macarons/rosmarine.png';
import truffleMacaron from '@/assets/images/macarons/truffle.png';
import type { Macarons, SelectOption } from '@/types/interfaces';

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
];
