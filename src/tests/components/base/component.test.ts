import { describe, expect, test } from 'vitest';

import BaseComponent from '@/components/base';

describe('Base component', () => {
  test('should return HTML element', () => {
    class TestComponent extends BaseComponent {
      constructor() {
        super({ tag: 'div', className: 'random-class' });
      }
    }

    const component = new TestComponent();
    const element = component.getElement();

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName).toBe('DIV');
    expect(element.className).toBe('random-class');
  });
});
