import { describe, expect, it } from 'vitest';

import { ErrorPage } from '@/pages/errorpage';

describe('Snapshot test of error page', () => {
  it('should match the page snapshot', () => {
    const errorPage = new ErrorPage();
    const element = errorPage.getElement();

    expect(element).toMatchSnapshot();
  });
});
