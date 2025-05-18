import { beforeEach, describe, expect, test } from 'vitest';

import { Router } from '@/router/router';
import { Route } from '@/types/enums';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    globalThis.location.hash = '';
    router = new Router(Route.HOME);
  });

  test('should have home route at initialization', () => {
    expect(router.getDefaultRoute()).toBe(Route.HOME);
  });

  test('should change hash when following new route', () => {
    Router.followRoute(Route.ABOUT);
    expect(globalThis.location.hash).toBe(Route.ABOUT);
  });

  test('should handle invalid route and show error page', () => {
    globalThis.location.hash =
      '#/deliberately-wrong-route-that-does-not-exist-and-will-never-exist';
    router = new Router(Route.HOME);
    expect(router.getDefaultRoute()).toBe(Route.ERROR);
  });
});
