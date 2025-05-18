import { describe, expect, it } from 'vitest';

import Footer from '@/components/footer';

describe('Snapshot test of footer', () => {
  it('should match the footer snapshot', () => {
    const footer = new Footer();
    const element = footer.getElement();

    expect(element).toMatchSnapshot();
  });
});
