import { describe, expect, test } from 'vitest';

import Button from '@/components/buttons';

describe('Button', () => {
  test('should be enabled', () => {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: 'Test Button',
      callback: (): void => {},
    });

    button.disableButton();
    button.enableButton();

    const element = button.getElement();
    expect(element.hasAttribute('disabled')).toBe(false);
  });
});
