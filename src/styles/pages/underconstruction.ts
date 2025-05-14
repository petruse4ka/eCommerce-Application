import { STANDART_CONTAINER, STANDART_MAIN_CONTAINER } from './errorpage';

export const CONTAINER = [...STANDART_CONTAINER, 'bg-[var(--color-purple)]'];

export const MAIN_CONTAINER = [
  ...STANDART_MAIN_CONTAINER,
  'bg-[url("./../assets/images/bg-space.png")]',
];

export const TITLE_STYLE = [
  'text-2xl',
  'md:text-3xl',
  'font-bold',
  'text-center',
  'p-4',
  'text-white',
];

export const ASTRONAUT_STYLE = ['animate-shaking-img', 'origin-bottom', 'inline-block'];
