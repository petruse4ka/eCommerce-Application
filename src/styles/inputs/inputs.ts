import '../abstracts/colors.css';

const STANDARD_INPUT_STYLE = [
  'font-montserrat',
  'font-semibold',
  'text-[16px]',
  'bg-[var(--color-white)]',
  'border',
  'outline-none',
  'py-3',
  'px-2',
  'w-full',
];

export const CUSTOM_INPUT_STYLE = {
  INPUT_DEFAULT: [
    ...STANDARD_INPUT_STYLE,
    'border-[var(--color-gray)]',
    'focus:border-[var(--color-black)]',
    'text-[var(--color-black)]',
  ],
  INPUT_ERROR: [
    ...STANDARD_INPUT_STYLE,
    'border-[var(--color-accent)]',
    'placeholder-[var(--color-accent)]',
    'text-[var(--color-accent)]',
  ],
};

const STANDARD_LABEL_STYLE = [
  'font-montserrat',
  'font-semibold',
  'text-[14px]',
  'hover:cursor-pointer',
];

export const CUSTOM_LABEL_STYLE = {
  LABEL_DEFAULT: [...STANDARD_LABEL_STYLE, 'text-[var(--color-black)]'],
  LABEL_ERROR: [...STANDARD_LABEL_STYLE, 'text-[var(--color-accent)]'],
};
