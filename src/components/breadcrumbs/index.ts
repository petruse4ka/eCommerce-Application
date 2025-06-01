import BaseComponent from '@/components/base';
import { CATALOG_TEXTS } from '@/constants';
import { BREADCRUMB_STYLES } from '@/styles/breadcrumbs';
import { Route } from '@/types/enums';
import ElementBuilder from '@/utils/element-builder';

export default class Breadcrumbs extends BaseComponent {
  constructor() {
    super({
      tag: 'nav',
      className: BREADCRUMB_STYLES.CONTAINER,
    });

    this.render();
  }

  private static createBreadcrumbItem(text: string, route: Route): HTMLElement {
    const item = new ElementBuilder({
      tag: 'li',
      className: BREADCRUMB_STYLES.ITEM,
    }).getElement();

    const link = new ElementBuilder({
      tag: 'span',
      className: BREADCRUMB_STYLES.LINK,
      textContent: text,
      callback: (): void => {
        globalThis.location.href = route;
      },
    }).getElement();

    item.append(link);
    return item;
  }

  private static createSeparator(): HTMLElement {
    return new ElementBuilder({
      tag: 'li',
      className: BREADCRUMB_STYLES.SEPARATOR,
      textContent: '→',
    }).getElement();
  }

  private render(): void {
    const list = new ElementBuilder({
      tag: 'ul',
      className: BREADCRUMB_STYLES.LIST,
    }).getElement();

    const homeItem = Breadcrumbs.createBreadcrumbItem(CATALOG_TEXTS.HOME, Route.HOME);
    const separator = Breadcrumbs.createSeparator();
    const catalogItem = Breadcrumbs.createBreadcrumbItem(CATALOG_TEXTS.CATALOG, Route.CATALOG);

    list.append(homeItem, separator, catalogItem);
    this.component.append(list);
  }
}
