import { describe, expect, it } from 'vitest';

import UnderConstructionPage from '@/pages/underconstruction';

describe('Snapshot test of under construction page', () => {
  it('should match the page snapshot', () => {
    const underConstructionPage = new UnderConstructionPage();
    const element = underConstructionPage.getElement();

    expect(element).toMatchSnapshot();
  });
});
