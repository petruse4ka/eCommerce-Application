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
  'disabled:bg-[var(--color-gray)]',
  'disabled:border-[var(--color-gray)]',
];

export const CUSTOM_BUTTON_STYLE = {
  PRIMARY_PINK: [
    ...STANDARD_BUTTON_STYLE,
    'bg-[var(--color-accent)]',
    'text-[var(--color-white)]',
    'border-[var(--color-accent)]',
    'hover:bg-[var(--color-accent-hover)]',
    'hover:border-[var(--color-accent-hover)]',
  ],
  SECONDARY_BLUE: [
    ...STANDARD_BUTTON_STYLE,
    'bg-[var(--color-white)]',
    'text-[var(--color-secondary)]',
    'border-[var(--color-secondary)]',
    'hover:bg-[var(--color-secondary-hover)]',
    'hover:border-[var(--color-secondary-hover)]',
    'hover:text-[var(--color-white)]',
    'disabled:text-[var(--color-white)]',
  ],
};
