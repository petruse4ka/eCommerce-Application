export const STANDARD_ALERT_STYLE = [
  'w-[300px]',
  'md:w-auto',
  'h-auto',
  'fixed',
  'flex',
  'flex-row-reverse',
  'items-center',
  'gap-x-[10px]',
  'z-9999',
  'right-0',
  'top-10',
  'px-5',
  'py-2',
  'text-m',
  'md:text-xl',
  'font-medium',
  'rounded-l-md',
];

export const CUSTOM_ALERT_STYLE = {
  ALERT__SUCCESS: [
    ...STANDARD_ALERT_STYLE,
    'bg-white',
    'text-black',
    'border-l',
    'border-t',
    'border-b',
  ],
  ALERT__ERROR: [...STANDARD_ALERT_STYLE, 'bg-black', 'text-accent'],
};
