import '../abstracts/colors.css';

const STANDARD_BUTTON_STYLE = [
  'font-montserrat',
  'font-semibold',
  'text-[14px]',
  'border',
  'w-[234px]',
  'px-3',
  'py-4',
  'rounded-[3px]',
  'cursor-pointer',
  'disabled:cursor-not-allowed',
  'transition-all',
  'duration-300',
  'ease-in-out',
  'disabled:bg-[var(--disabled)]',
  'disabled:border-[var(--disabled)]',
];

export const CUSTOM_BUTTON_STYLE = {
  PRIMARY_PINK: [
    ...STANDARD_BUTTON_STYLE,
    'bg-[var(--primary)]',
    'text-[var(--white)]',
    'border-[var(--primary)]',
    'hover:bg-[var(--primary-hover)]',
    'hover:border-[var(--primary-hover)]',
  ],
  SECONDARY_BLUE: [
    ...STANDARD_BUTTON_STYLE,
    'bg-[var(--white)]',
    'text-[var(--secondary)]',
    'border-[var(--secondary)]',
    'hover:bg-[var(--secondary-hover)]',
    'hover:border-[var(--secondary-hover)]',
    'hover:text-[var(--white)]',
    'disabled:border-[var(--disabled)]',
    'disabled:text-[var(disabled)]',
  ],
};
