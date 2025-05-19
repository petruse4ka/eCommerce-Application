import { describe, expect, it } from 'vitest';

import { ErrorPage } from '@/pages/errorpage';

describe('Error page', () => {
  it('should match the snapshot', () => {
    const errorPage = new ErrorPage();
    const element = errorPage.getElement();

    expect(element).toMatchSnapshot();
  });
});
