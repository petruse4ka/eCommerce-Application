import { describe, expect, test } from 'vitest';

import Input from '@/components/inputs/input';
import { InputType } from '@/types/enums';

describe('Test base input class', () => {
  test('should return input value', () => {
    const input = new Input({
      type: InputType.TEXT,
      id: 'test-input',
      value: 'test value',
      placeholder: '',
      labelText: '',
      className: '',
    });

    expect(input.getValue()).toBe('test value');
  });
});
