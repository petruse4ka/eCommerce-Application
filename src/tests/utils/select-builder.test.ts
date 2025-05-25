import { describe, expect, test } from 'vitest';

import SelectBuilder from '@/utils/select-builder';

describe('SelectBuilder', () => {
  test('should get and set value', () => {
    const select = new SelectBuilder({
      className: [],
    });
    select.addOption('test', 'Test Option');
    select.addOption('test2', 'Test Option 2');

    expect(select.getValue()).toBe('test');
    select.setValue('test2');
    expect(select.getValue()).toBe('test2');
  });
});
