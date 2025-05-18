import { describe, expect, it } from 'vitest';

import UnderConstructionPage from '@/pages/underconstruction';

describe('UnderConstructionPage', () => {
  it('should match snapshot', () => {
    const underConstructionPage = new UnderConstructionPage();
    const element = underConstructionPage.getElement();

    expect(element).toMatchSnapshot();
  });
});
