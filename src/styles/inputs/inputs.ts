const STANDARD_INPUT_STYLE = [
  'h-13',
  'text-[16px]',
  'text-black/70',
  'placeholder-black/70',
  'bg-white',
  'border',
  'border-gray',
  'rounded-md',
  'hover:border-red',
  'focus:border-red',
  'disabled:hover:border-gray',
  'disabled:bg-gray',
  'disabled:cursor-not-allowed',
  'focus:placeholder-transparent',
  'outline-none',
  'py-2',
  'pl-2',
  'pr-2',
  'w-full',
  '[&::-webkit-calendar-picker-indicator]:[filter:invert(0.4)_sepia(1)_saturate(20)_hue-rotate(320deg)_brightness(0.9)_contrast(0.9)]',
  'cursor-text',
];

export const CUSTOM_INPUT_STYLE = {
  INPUT_DEFAULT: [...STANDARD_INPUT_STYLE],
  INPUT_PASSWORD: [...STANDARD_INPUT_STYLE, 'pr-10'],
  INPUT_ERROR: [...STANDARD_INPUT_STYLE, '!border-accent', '!placeholder-accent', 'text-accent'],
};

export const CHECKBOX_CONTAINER_STYLE = ['flex', 'gap-2', 'justify-start'];

export const CHECKBOX_STYLE = [
  'h-5',
  'w-5',
  'accent-accent',
  'hover:accent-accent-hover',
  'border-accent',
  'cursor-pointer',
];

export const ICON_IN_INPUT = [
  'h-5',
  'w-5',
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
  'text-accent',
];

export const HIDDEN = 'hidden';
