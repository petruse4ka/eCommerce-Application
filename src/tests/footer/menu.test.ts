import { describe, expect, it } from 'vitest';

import Menu from '@/components/footer/menu';

describe('Snapshot test of menu section in footer', () => {
  it('should match the menu section snapshot', () => {
    const menu = new Menu();
    const element = menu.getElement();

    expect(element).toMatchSnapshot();
  });
});
