import { describe, expect, it } from 'vitest';

import Copyright from '@/components/footer/copyright';

describe('Snapshot test of copyright section in footer', () => {
  it('should match the copyright section snapshot', () => {
    const copyright = new Copyright();
    const element = copyright.getElement();

    expect(element).toMatchSnapshot();
  });
});
