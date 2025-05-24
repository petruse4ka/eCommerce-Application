import blueCheeseMacaron from '@/assets/images/macarons/blue-cheese.png';
import chocolateMacaron from '@/assets/images/macarons/choko-banan.png';
import parmesanMacaron from '@/assets/images/macarons/parmesan.png';
import pestoMacaron from '@/assets/images/macarons/pesto.png';
import rosmarineMacaron from '@/assets/images/macarons/rosmarine.png';
import truffleMacaron from '@/assets/images/macarons/truffle.png';
import type { Macarons } from '@/types/interfaces';

export const MACARONS: Macarons[] = [
  {
    name: 'Шоколад, банан',
    description: 'Сезонный вкус: молочный  шоколад, отборные свежие бананы',
    image: chocolateMacaron,
  },
  {
    name: 'Облепиха, розмарин',
    description: 'Сезонный вкус: белый шоколад, свежие ягоды облепихи, немного розмарина',
    image: rosmarineMacaron,
  },
  {
    name: 'Чёрный трюфель',
    description: 'Белый шоколад, сливки и паста из летнего чёрного итальянского трюфеля.',
    image: truffleMacaron,
  },
  {
    name: 'Голубой сыр',
    description: 'Наш самы пикантный и один из самых популярных вкусов. Это нужно попробовать!',
    image: blueCheeseMacaron,
  },
  {
    name: 'Пармезан',
    description:
      'Пикантный сладко-соленый вкус. Начинка изготавливается с использованием настоящего итальянского сыра Parmigiano Reggiano и Grana Padano категории DOP.',
    image: parmesanMacaron,
  },
  {
    name: 'Песто ',
    description:
      'Внутри ингредиетны классического песто - свежий ароматный базилик, итальянский пармезан, кедровые орешки и всё это в виде ганаша на белом шоколаде.',
    image: pestoMacaron,
  },
];
