import { describe, expect, it } from 'vitest';

import UnderConstructionPage from '@/pages/underconstruction';

describe('Under construction', () => {
  it('should match the snapshot', () => {
    const underConstructionPage = new UnderConstructionPage();
    const element = underConstructionPage.getElement();

    expect(element).toMatchSnapshot();
  });
});
