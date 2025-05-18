import { describe, expect, it } from 'vitest';

import Promo from '@/components/footer/promo';

describe('Snapshot test of promo section in footer', () => {
  it('should match the promo section snapshot', () => {
    const promo = new Promo();
    const element = promo.getElement();

    expect(element).toMatchSnapshot();
  });
});
