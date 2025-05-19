import { describe, expect, it } from 'vitest';

import Copyright from '@/components/footer/copyright';

describe('Copyright', () => {
  it('should match the snapshot', () => {
    const copyright = new Copyright();
    const element = copyright.getElement();

    expect(element).toMatchSnapshot();
  });
});
