import { Route } from '@/types/enums';
import type { ActionHandler } from '@/types/types';

export default class Router {
  private routes: Map<Route, ActionHandler>;
  private homeRoute: Route;
  private defaultRoute: Route;

  constructor(HomeRoute: Route) {
    this.routes = new Map();
    this.homeRoute = HomeRoute;
    this.defaultRoute = this.setDefaultRoute();
    this.setEventListeners();
  }

  public static followRoute(route: Route): void {
    globalThis.location.hash = route;
  }

  private static checkRouteValidity(hash: string): hash is Route {
    const validRoutes = new Set<string>(Object.values(Route));
    return validRoutes.has(hash);
  }

  public getDefaultRoute(): Route {
    return this.defaultRoute;
  }

  public addRoute(route: Route, handler: ActionHandler): void {
    this.routes.set(route, handler);
  }

  private setDefaultRoute(): Route {
    let currentHash = globalThis.location.hash;

    if (currentHash.includes(`${Route.PRODUCT}/`)) {
      currentHash = Route.PRODUCT;
    }

    if (!currentHash) {
      globalThis.location.hash = this.homeRoute;
      return this.homeRoute;
    }

    return Router.checkRouteValidity(currentHash) ? currentHash : Route.ERROR;
  }

  private setEventListeners(): void {
    globalThis.addEventListener('hashchange', () => this.handleRoute());
  }

  private handleRoute(): void {
    let currentHash = globalThis.location.hash || this.homeRoute;
    if (currentHash.includes(`${Route.PRODUCT}/`)) {
      currentHash = Route.PRODUCT;
    }
    const route = Router.checkRouteValidity(currentHash) ? currentHash : Route.ERROR;
    const handler = this.routes.get(route);

    if (handler) {
      handler();
    } else {
      globalThis.location.hash = this.homeRoute;
    }
  }
}
