const BUTTON_STYLE = [
  'cursor-pointer',
  'py-1',
  'px-2',
  'rounded-lg',
  'hover:bg-primary',
  'transition-all',
  'flex',
];

export const CATEGORY_STYLES = {
  CONTAINER: ['flex', 'flex-col', 'gap-2', 'py-4', 'px-2', 'bg-gray-medium', 'rounded', 'mb-5'],
  TITLE: ['text-xl', 'font-semibold', 'text-purple', 'px-2'],
  LIST: ['my-2', 'flex', 'flex-col'],
  ITEM: ['text-sm', 'text-dark', 'w-fit'],
  INTERNAL_LIST: ['flex', 'flex-row', 'flex-wrap', 'gap-2', 'xl:ml-3', 'xl:flex-col', 'xl:gap-0'],
  SELECTOR_MAIN: [...BUTTON_STYLE, 'font-semibold'],
  SELECTOR: [...BUTTON_STYLE],
  ACTIVE: ['text-accent'],
};
