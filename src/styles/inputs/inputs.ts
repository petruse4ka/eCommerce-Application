const STANDARD_INPUT_STYLE = [
  'font-montserrat',
  'font-semibold',
  'text-[16px]',
  'bg-white',
  'border',
  'outline-none',
  'py-3',
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
