import { CHECKBOX_STYLE } from '@/styles/inputs/inputs';

export const FILTERS_STYLES = {
  CONTAINER: ['flex', 'flex-col', 'gap-6', 'w-[280px]'],
  FILTER_CONTAINER: ['flex', 'flex-col', 'gap-2'],
  FILTER_TITLE: ['text-lg', 'font-semibold'],
  OPTIONS_CONTAINER: ['flex', 'flex-col', 'gap-2'],
  OPTION_CONTAINER: ['flex', 'items-center', 'gap-2'],
  CHECKBOX: CHECKBOX_STYLE,
  LABEL: ['text-sm'],
  HIDDEN: ['hidden'],
  DROPDOWN: [
    'bg-white',
    'border',
    'border-black/55',
    'rounded-lg',
    'px-4',
    'py-2',
    'text-dark',
    'text-sm',
    'cursor-pointer',
    'hover:border-black',
    'focus:outline-none',
    'focus:border-black',
    'w-full',
    'sm:w-auto',
  ],
};
