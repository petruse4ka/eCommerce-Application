import BaseComponent from '@/components/base';
import { MENU_ITEMS } from '@/constants';
import Router from '@/router';
import { NOSCROLL } from '@/styles/app/app';
import { HEADER_STYLES } from '@/styles/header/header';
import ElementBuilder from '@/utils/element-builder';

export default class MainMenu extends BaseComponent {
  private isOpen: boolean;
  private nav: ElementBuilder;
  private burgerIconTop: ElementBuilder;
  private burgerIconBottom: ElementBuilder;

  constructor() {
    super({ tag: 'div', className: HEADER_STYLES.MAIN_MENU });
    this.isOpen = false;

    this.nav = new ElementBuilder({
      tag: 'nav',
      className: HEADER_STYLES.MENU_NAV_CLOSED,
    });

    this.burgerIconTop = new ElementBuilder({
      tag: 'span',
      className: HEADER_STYLES.BURGER_ICON_TOP_CLOSED,
    });

    this.burgerIconBottom = new ElementBuilder({
      tag: 'span',
      className: HEADER_STYLES.BURGER_ICON_BOTTOM_CLOSED,
    });

    window.addEventListener('resize', this.handleWindowResize.bind(this));
    this.render();
  }

  public closeBurgerMenu(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.closeMenu();
    }
  }

  protected render(): void {
    for (const item of MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'span',
        className: HEADER_STYLES.MENU_ITEM,
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        this.isOpen = false;
        this.closeMenu();
        Router.followRoute(item.route);
      });

      this.nav.getElement().append(menuItem);
    }

    const burgerButton = new ElementBuilder({
      tag: 'button',
      className: HEADER_STYLES.BURGER_BUTTON,
      callback: (): void => {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.openMenu();
        } else {
          this.closeMenu();
        }
      },
    }).getElement();

    burgerButton.append(this.burgerIconTop.getElement(), this.burgerIconBottom.getElement());

    this.component.append(this.nav.getElement(), burgerButton);
  }

  private openMenu(): void {
    this.nav.replaceCssClasses(HEADER_STYLES.MENU_NAV_CLOSED, HEADER_STYLES.MENU_NAV_OPEN);
    this.burgerIconTop.replaceCssClasses(
      HEADER_STYLES.BURGER_ICON_TOP_CLOSED,
      HEADER_STYLES.BURGER_ICON_TOP_OPEN
    );
    this.burgerIconBottom.replaceCssClasses(
      HEADER_STYLES.BURGER_ICON_BOTTOM_CLOSED,
      HEADER_STYLES.BURGER_ICON_BOTTOM_OPEN
    );
    document.body.classList.add(NOSCROLL.join(' '));
  }

  private closeMenu(): void {
    this.nav.replaceCssClasses(HEADER_STYLES.MENU_NAV_OPEN, HEADER_STYLES.MENU_NAV_CLOSED);
    this.burgerIconTop.replaceCssClasses(
      HEADER_STYLES.BURGER_ICON_TOP_OPEN,
      HEADER_STYLES.BURGER_ICON_TOP_CLOSED
    );
    this.burgerIconBottom.replaceCssClasses(
      HEADER_STYLES.BURGER_ICON_BOTTOM_OPEN,
      HEADER_STYLES.BURGER_ICON_BOTTOM_CLOSED
    );
    document.body.classList.remove(NOSCROLL.join(' '));
  }

  private handleWindowResize(): void {
    if (window.innerWidth >= 768 && this.isOpen) {
      this.isOpen = false;
      this.closeMenu();
    }
  }
}
