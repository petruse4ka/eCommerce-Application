export const FORM = ['flex', 'flex-col'];

export const AUTHORIZATION_INPUTS_CONTAINER = [...FORM, 'my-5', 'mt-2'];

export const REGISTRATION_INPUTS_CONTAINER = [
  ...FORM,
  'my-5',
  'py-3',
  'lg:grid',
  'lg:grid-cols-2',
  'lg:gap-7',
  'lg:gap-y-2',
  '[&>fieldset:last-child]:lg:col-span-2',
];

export const REGISTRATION_ADDRESS = {
  CONTAINER: ['border', 'border-red', 'p-3', 'rounded-lg', 'flex', 'flex-col', 'my-5'],
  LEGEND: ['px-2', 'text-accent-hover'],
};

export const REDIRECT_LINK = [
  'mt-5',
  'text-center',
  'text-sm',
  'font-semibold',
  'text-accent',
  'hover:text-accent-hover',
  'cursor-pointer',
  'transition-colors',
  'duration-300',
  'ease-in-out',
];
