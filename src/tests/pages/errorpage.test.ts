import { describe, expect, it } from 'vitest';

import { ErrorPage } from '@/pages/errorpage';

describe('ErrorPage', () => {
  it('should match snapshot', () => {
    const errorPage = new ErrorPage();
    const element = errorPage.getElement();

    expect(element).toMatchSnapshot();
  });
});
