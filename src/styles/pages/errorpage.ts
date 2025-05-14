export const STANDART_CONTAINER = [
  'flex',
  'flex-col',
  'items-center',
  'min-h-[550px]',
  'text-black',
  'text-base',
  'leading-normal',
];

export const CONTAINER = [...STANDART_CONTAINER, 'bg-[var(--color-gray)]'];

export const STANDART_MAIN_CONTAINER = [
  'w-full',
  'md:min-h-[400px]',
  'relative',
  'p-4',
  'flex',
  'justify-center',
  'items-end',
  'bg-center',
  'bg-no-repeat',
  'bg-contain',
  'md:bg-auto',
];

export const MAIN_CONTAINER = [
  ...STANDART_MAIN_CONTAINER,
  'bg-[url("./../assets/images/error-404.png")]',
];

export const CRUMB_STYLE = [
  'translate-x-full',
  '-translate-y-1/2',
  'transform',
  'origin-center',
  'absolute',
  'md:animate-spin',
];

export const TITLE_STYLE = ['text-2xl', 'md:text-3xl', 'font-bold', 'text-center', 'p-4'];
