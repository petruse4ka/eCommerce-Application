import { describe, expect, test } from 'vitest';

import { InputType } from '@/types/enums';
import { InputBuilder } from '@/utils/input-builder';

describe('Input builder', () => {
  test('should create element with correct attributes', () => {
    const input = new InputBuilder({
      type: InputType.TEXT,
      id: 'test-input',
      value: '',
      placeholder: 'test placeholder',
      className: '',
    });

    const element = input.getElement();
    expect(element.tagName).toBe('INPUT');
    expect(element.getAttribute('type')).toBe('text');
    expect(element.getAttribute('placeholder')).toBe('test placeholder');
  });
});
