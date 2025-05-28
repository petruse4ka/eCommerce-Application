const TAB_BUTTON = [
  'flex',
  'justify-items-center',
  'items-center',
  'p-2',
  'sm:py-3.5',
  'sm:px-3',
  'font-bold',
  'transition',
  'text-center',
  'text-sm/4',
  'md:text-base',
  'xl:text-xl',
];

export const TAB = {
  CONTAINER: [
    'flex',
    'sm:flex-col',
    'gap-[1px]',
    'h-fit',
    'bg-dark',
    'border',
    'rounded-xl',
    'overflow-hidden',
  ],
  BUTTON_STYLE: {
    DEFAULT: [
      ...TAB_BUTTON,
      'bg-primary',
      'text-dark',
      'hover:bg-accent-hover',
      'hover:text-primary',
      'cursor-pointer',
    ],
    ACTIVE: [...TAB_BUTTON, 'bg-accent', 'text-primary'],
  },
};
