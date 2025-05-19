import { describe, expect, it } from 'vitest';

import Footer from '@/components/footer';

describe('Footer', () => {
  it('should match the snapshot', () => {
    const footer = new Footer();
    const element = footer.getElement();

    expect(element).toMatchSnapshot();
  });
});
