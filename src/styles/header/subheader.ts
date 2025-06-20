export const SUBHEADER_STYLES = {
  SUBHEADER: ['bg-primary', 'py-2', 'text-[14px]', 'flex', 'justify-center', 'relative'],
  SUBHEADER_CONTAINER: ['max-w-[1440px]', 'flex', 'justify-between', 'w-full', 'px-3', 'md:px-4'],
  SETTINGS_CONTAINER: ['flex', 'gap-4', 'mr-5', 'items-center'],
  PROMO: ['hidden', 'xl:flex', 'flex-row', 'items-center', 'gap-4', 'lg:gap-8', 'xl:gap-10'],
  PROMO_ITEM: ['flex', 'items-center', 'gap-1.5', 'md:gap-2'],
  PROMO_ICON: ['w-4', 'h-4', 'md:w-5', 'md:h-5'],
  PROMO_TEXT: ['text-dark', 'text-sm'],
  AUTHORIZATION_MENU: [
    'flex',
    'flex-row',
    'flex-nowrap',
    'justify-around',
    'lg:justify-end',
    'items-center',
    'lg:ml-5',
    'gap-5',
    'lg:gap-8',
  ],
  AUTHORIZATION_ITEM: [
    'cursor-pointer',
    'font-semibold',
    'text-accent',
    'hover:text-accent-hover',
    'transition-colors',
    'duration-300',
    'text-[14px]',
    'flex',
    'items-center',
    'gap-2',
    'group',
  ],
  AUTHORIZATION_ITEM_ICON: [
    'w-6',
    'h-6',
    'fill-accent',
    'group-hover:fill-accent-hover',
    'transition',
    'duration-300',
  ],
  AUTHORIZATION_ITEM_TEXT: ['hidden', 'md:block'],
  THEME_ICON: [
    'w-6',
    'h-6',
    'fill-accent',
    'hover:fill-accent-hover',
    'transition',
    'duration-300',
  ],
  THEME_TEXT: ['hidden'],
  LANGUAGE_OPTION: ['relative', 'flex', 'items-center', 'cursor-pointer'],
  LANGUAGE_DROPDOWN: [
    'absolute',
    'top-8',
    'left-0',
    'bg-gray-medium',
    'shadow-lg',
    'rounded',
    'flex',
    'flex-col',
    'min-w-[150px]',
    'border',
    'border-accent',
    'z-1',
  ],
  LANGUAGE_DROPDOWN_INACTIVE: ['invisible'],
  LANGUAGE_DROPDOWN_ACTIVE: ['visible'],
  LANGUAGE_ITEM: [
    'flex',
    'items-center',
    'gap-2',
    'px-3',
    'py-2',
    'hover:bg-accent',
    'cursor-pointer',
    'group',
    'text-black',
  ],
  LANGUAGE_ITEM_ACTIVE: ['!text-accent'],
  LANGUAGE_FLAG: ['w-5', 'h-5', 'rounded'],
  LANGUAGE_TEXT: ['text-sm', 'font-medium', 'group-hover:text-white-permanent'],
  TRANSLATE_ICON: [
    'w-6',
    'h-6',
    'fill-accent',
    'hover:fill-accent-hover',
    'transition',
    'duration-300',
  ],
  TRANSLATE_TEXT: ['hidden'],
};
