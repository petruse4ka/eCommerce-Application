import '../abstracts/colors.css';

const StandardButtonStyle = [
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
  'disabled:bg-[var(--button-disabled-bg)]',
  'disabled:border-[var(--button-disabled-bg)]',
];

export const CustomButtonStyle = {
  PRIMARY_PINK: [
    ...StandardButtonStyle,
    'bg-[var(--button-primary-bg)]',
    'text-[var(--button-primary-text)]',
    'border-[var(--button-primary-border)]',
    'hover:bg-[var(--button-primary-bg-hover)]',
    'hover:border-[var(--button-primary-border-hover)]',
  ],
  SECONDARY_BLUE: [
    ...StandardButtonStyle,
    'bg-[var(--button-secondary-bg)]',
    'text-[var(--button-secondary-text)]',
    'border-[var(--button-secondary-border)]',
    'hover:bg-[var(--button-secondary-bg-hover)]',
    'hover:text-[var(--button-secondary-text-hover)]',
    'disabled:border-[var(--button-disabled-bg)]',
    'disabled:text-[var(button-disabled-text)]',
  ],
};
