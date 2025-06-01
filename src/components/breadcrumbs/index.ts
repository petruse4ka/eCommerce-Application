import BaseComponent from '@/components/base';
import { CATALOG_TEXTS } from '@/constants';
import { BREADCRUMB_STYLES } from '@/styles/breadcrumbs';
import ElementBuilder from '@/utils/element-builder';
import LinkBuilder from '@/utils/link-builder';

export default class Breadcrumbs extends BaseComponent {
  constructor() {
    super({
      tag: 'nav',
      className: BREADCRUMB_STYLES.CONTAINER,
    });

    this.render();
  }

  private static createBreadcrumbItem(text: string, href: string): HTMLElement {
    const item = new ElementBuilder({
      tag: 'li',
      className: BREADCRUMB_STYLES.ITEM,
    }).getElement();

    const link = new LinkBuilder({
      className: BREADCRUMB_STYLES.LINK,
      textContent: text,
      href: href,
      target: '_self',
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

    const homeItem = Breadcrumbs.createBreadcrumbItem(CATALOG_TEXTS.HOME, '/');
    list.append(homeItem);

    const separator = Breadcrumbs.createSeparator();
    list.append(separator);

    const catalogItem = Breadcrumbs.createBreadcrumbItem(CATALOG_TEXTS.CATALOG, '/catalog');
    list.append(catalogItem);

    this.component.append(list);
  }
}
