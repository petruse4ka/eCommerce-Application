import Router from '@/router';
import { Route } from '@/types/enums';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    globalThis.location.hash = '';
    router = new Router(Route.HOME);
  });

  test('should initialize with home route', () => {
    expect(router.getDefaultRoute()).toBe(Route.HOME);
  });

  test('should update hash when navigating to new route', () => {
    Router.followRoute(Route.ABOUT);
    expect(globalThis.location.hash).toBe(Route.ABOUT);
  });

  test('should redirect to error page for invalid routes', () => {
    globalThis.location.hash =
      '#/deliberately-wrong-route-that-does-not-exist-and-will-never-exist';
    router = new Router(Route.HOME);
    expect(router.getDefaultRoute()).toBe(Route.ERROR);
  });
});
