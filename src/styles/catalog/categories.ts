const BUTTON_STYLE = [
  'cursor-pointer',
  'py-1',
  'px-2',
  'rounded-lg',
  'text-dark',
  'hover:text-accent',
  'active:text-accent',
  'hover:bg-orange-light',
  'transition-all',
  'flex',
];

export const CATEGORY_STYLES = {
  CONTAINER: ['mb-2', 'pb-4', 'px-4'],
  TITLE: ['text-xl', 'font-semibold', 'text-dark'],
  LIST: ['my-2'],
  ITEM: ['text-sm'],
  INTERNAL_LIST: ['ml-3', 'flex', 'flex-row', 'flex-wrap', 'gap-2', 'xl:flex-col', 'xl:gap-0'],
  BUTTON_MAIN: [...BUTTON_STYLE, 'font-semibold'],
  BUTTON: [...BUTTON_STYLE],
};
