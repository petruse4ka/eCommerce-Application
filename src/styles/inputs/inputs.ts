const STANDARD_INPUT_STYLE = [
  'h-13',
  'text-[16px]',
  'bg-white',
  'border',
  'hover:border-red',
  'focus:border-red',
  'disabled:hover:border-gray',
  'disabled:bg-gray',
  'disabled:cursor-not-allowed',
  'focus:placeholder-transparent',
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
    'text-black/70',
    'placeholder-black/70',
  ],
  INPUT_ERROR: [...STANDARD_INPUT_STYLE, 'border-accent', 'placeholder-accent', 'text-accent'],
};

export const CHECKBOX_CONTAINER_STYLE = ['flex', 'justify-start', 'gap-2'];

export const CHECKBOX_STYLE = [
  'h-5',
  'w-5',
  'accent-accent',
  'hover:accent-accent-hover',
  'border-red-500',
  'cursor-pointer',
];

export const ICON_IN_INPUT = [
  'h-6',
  'w-6',
  'absolute',
  'top-1/2',
  '-translate-y-2/3',
  'right-2',
  'bg-[url(@/assets/icons/eye-off-outline.svg)]',
  'hover:cursor-pointer',
];

const STANDARD_LABEL_STYLE = ['text-[16px]', 'hover:cursor-pointer'];

export const CUSTOM_LABEL_STYLE = {
  LABEL_DEFAULT: [...STANDARD_LABEL_STYLE, 'text-black'],
  LABEL_ERROR: [...STANDARD_LABEL_STYLE, 'text-accent'],
};

export const ERROR_MESSAGE_STYLE = [
  'error-message',
  'h-8',
  'text-[11px]',
  'sm:text-xs',
  'text-left',
  'text-(--color-accent)',
];
