export const MODAL = {
  COMPONENT: [
    'm-auto',
    'rounded-md',
    'bg-gray-light',
    'border',
    'border-accent',
    'shadow-lg',
    'w-[95%]',
    'max-w-[600px]',
    'm-4',
  ],
  HEADER: {
    CONTAINER: [
      'flex',
      'justify-between',
      'items-center',
      'p-4',
      'gap-4',
      'border-b',
      'border-primary',
    ],
    TITLE: ['text-xl', 'font-semibold', 'text-dark'],
  },
  CONTENT: {
    CONTAINER: ['p-4'],
    CHECKOUT_PAGE: {
      CONTAINER: ['flex', 'flex-col', 'items-center', 'gap-5'],
      TITLE: ['text-center', 'text-xl', 'font-bold'],
    },
    ABOUT: {
      CONTAINER: ['flex', 'flex-col', 'gap-6', 'p-4'],
      IMAGE: ['w-full', 'h-[400px]', 'object-cover', 'rounded-lg'],
      ROLE: ['text-sm', 'font-medium', 'text-accent', 'uppercase'],
      GITHUB: [
        'text-accent',
        'text-sm',
        'font-medium',
        'hover:text-accent-hover',
        'transition-colors',
        'duration-300',
      ],
      DESCRIPTION: ['flex', 'flex-col', 'gap-4'],
    },
  },
};
