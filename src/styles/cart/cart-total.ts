export const CART_TOTAL = {
  CONTAINER: [
    'bg-white',
    'rounded-md',
    'border',
    'border-primary',
    'p-3',
    'flex',
    'flex-col',
    'gap-5',
    'relative',
  ],
  TITLE: ['font-bold', 'text-xl', 'text-black'],
  ITEM: {
    CONTAINER: {
      DEFAULT: ['flex', 'justify-between', 'py-1'],
      ACCENT: ['flex', 'justify-between', 'border-y-1', 'border-primary', 'py-3'],
    },
    TEXT: {
      DEFAULT: ['text-l', 'text-black'],
      ACCENT: ['text-xl', 'font-bold', 'text-black'],
    },
    DOTTED: ['flex-grow', 'border-b', 'border-dotted', 'border-gray', 'mx-2'],
  },
  LOADER: ['absolute', 'p-3', 'w-full', 'h-full', 'bg-gray/80', 'top-0', 'left-0', 'z-999'],
};
