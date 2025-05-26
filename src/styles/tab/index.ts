const TAB_BUTTON = ['py-3', 'px-3', 'font-bold', 'transition'];

export const TAB = {
  CONTAINER: ['flex', 'flex-col', 'gap-[1px]', 'h-fit', 'bg-dark', 'border'],
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
