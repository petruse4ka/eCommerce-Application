import type { SelectOption } from '@/types/interfaces';

export const SORTING_OPTIONS: SelectOption[] = [
  { value: 'price-asc', text: 'Цена: по возрастанию' },
  { value: 'price-desc', text: 'Цена: по убыванию' },
  { value: 'name-asc', text: 'Название: от А-Я' },
  { value: 'name-desc', text: 'Название: от Я-А' },
];
