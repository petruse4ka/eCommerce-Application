import '../abstracts/colors.css';

const STANDARD_BUTTON_STYLE = [
  'font-montserrat',
  'font-semibold',
  'text-[14px]',
  'w-[234px]',
  'px-3',
  'py-4',
  'rounded-[3px]',
  'cursor-pointer',
  'disabled:cursor-not-allowed',
];

export const CUSTOM_BUTTON_STYLE = {
  PRIMARY_PINK: [
    ...STANDARD_BUTTON_STYLE,
    'bg-[var(--button-primary-bg)]',
    'text-[var(--button-primary-text)]',
    'hover:bg-[var(--button-primary-bg-hover)]',
    'disabled:bg-[var(--button-disabled-bg)]',
  ],
  SECONDARY_BLUE: [
    ...STANDARD_BUTTON_STYLE,
    'bg-white',
    'text-[var(--button-secondary-bg)]',
    'border',
    'border-[var(--button-secondary-bg)]',
    'hover:bg-[var(--button-secondary-bg)]',
    'hover:text-[var(--button-secondary-text-hover)]',
    'disabled:bg-[var(--button-disabled-bg)]',
    'disabled:border-[var(--button-disabled-bg)]',
    'disabled:text-white',
  ],
};
