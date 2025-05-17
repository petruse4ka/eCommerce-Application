const STANDARD_INPUT_STYLE = [
  'font-montserrat',
  'font-semibold',
  'text-[16px]',
  'bg-white',
  'border',
  'outline-none',
  'py-2',
  'px-2',
  'w-full',
];

export const CUSTOM_INPUT_STYLE = {
  INPUT_DEFAULT: [
    ...STANDARD_INPUT_STYLE,
    'border-gray',
    'focus:border-black',
    'text-black/50',
    'placeholder-black/50',
  ],
  INPUT_ERROR: [...STANDARD_INPUT_STYLE, 'border-accent', 'placeholder-accent', 'text-accent'],
};

export const ICON_IN_INPUT = [
  'h-6',
  'w-6',
  'absolute',
  'top-7',
  'right-2',
  'bg-[url(@/assets/icons/eye-off-outline.svg)]',
  'hover:cursor-pointer',
];

const STANDARD_LABEL_STYLE = [
  'font-montserrat',
  'font-semibold',
  'text-[14px]',
  'hover:cursor-pointer',
];

export const CUSTOM_LABEL_STYLE = {
  LABEL_DEFAULT: [...STANDARD_LABEL_STYLE, 'text-black'],
  LABEL_ERROR: [...STANDARD_LABEL_STYLE, 'text-accent'],
};

export const ERROR_MESSAGE_STYLE = [
  'error-message',
  'h-8',
  'text-xs',
  'text-left',
  'text-(--color-accent)',
];

export const DEFAULT_CHECKBOX_STYLE = [
  'h-5',
  'w-5',
  'accent-accent',
  'hover:accent-accent-hover',
  'border-red-500',
  'cursor-pointer',
];
