import { describe, expect, it } from 'vitest';

import Menu from '@/components/footer/menu';

describe('Footer menu', () => {
  it('should match the snapshot', () => {
    const menu = new Menu();
    const element = menu.getElement();

    expect(element).toMatchSnapshot();
  });
});
