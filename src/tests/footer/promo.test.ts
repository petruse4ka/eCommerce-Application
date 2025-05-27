import Promo from '@/components/footer/promo';

describe('Footer promo', () => {
  it('should match the snapshot', () => {
    const promo = new Promo();
    const element = promo.getElement();

    expect(element).toMatchSnapshot();
  });
});
