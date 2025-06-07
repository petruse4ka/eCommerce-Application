export const CART_ITEM = {
  CONTAINER: [
    'grid',
    'grid-cols-[150px_1fr]',
    'md:grid-cols-[80px_1fr_100px_200px]',
    'items-center',
    'relative',
    'p-3',
    'gap-1',
    'md:gap-3',
  ],
  IMAGE: ['w-[80px]', 'h-[80px]', 'object-contain', 'm-auto', 'm-[0px]'],
  INFO: {
    NAME: ['text-l', 'font-bold', 'md:pl-5'],
  },
  PRICE: {
    DEFAULT: ['font-bold', 'text-left', 'md:text-right', 'md:pr-5'],
    ACCENT: ['text-accent'],
    OLD: ['text-gray', 'line-through', 'block'],
  },
};
