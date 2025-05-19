import { describe, expect, test } from 'vitest';

import LinkBuilder from '@/utils/link-builder';

describe('Link builder', () => {
  test('should create element with correct attributes', () => {
    const link = new LinkBuilder({
      href: 'https://test-url.ru',
      target: '_blank',
      className: '',
    });

    const element = link.getElement();
    expect(element.tagName).toBe('A');
    expect(element.getAttribute('href')).toBe('https://test-url.ru');
    expect(element.getAttribute('target')).toBe('_blank');
  });
});
