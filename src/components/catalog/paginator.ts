import BaseComponent from '@/components/base';
import ButtonWithIcon from '@/components/buttons/button-with-icon';
import { CATALOG_TEXTS } from '@/constants';
import { paginatorState } from '@/store/paginator-state';
import { PAGINATOR_STYLES } from '@/styles/catalog/paginator';
import ElementBuilder from '@/utils/element-builder';

export default class Paginator extends BaseComponent {
  private static readonly FIRST_ICON =
    'M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z';
  private static readonly LAST_ICON =
    'M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z';
  private static readonly NEXT_ICON = 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z';
  private static readonly PREVIOUS_ICON =
    'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z';

  private currentPage: HTMLElement;
  private firstButton: ButtonWithIcon;
  private prevButton: ButtonWithIcon;
  private nextButton: ButtonWithIcon;
  private lastButton: ButtonWithIcon;

  constructor() {
    super({ tag: 'div', className: PAGINATOR_STYLES.PAGINATOR });

    this.currentPage = new ElementBuilder({
      tag: 'span',
      className: PAGINATOR_STYLES.PAGINATOR_INFO,
      textContent: `${CATALOG_TEXTS.PAGE} ${String(paginatorState.getCurrentPage())} ${CATALOG_TEXTS.OUT} ${String(paginatorState.getTotalPages())}`,
    }).getElement();

    this.firstButton = Paginator.createFirstButton();
    this.prevButton = Paginator.createPrevButton();
    this.nextButton = Paginator.createNextButton();
    this.lastButton = Paginator.createLastButton();

    this.firstButton.disableButton();
    this.prevButton.disableButton();
    this.nextButton.disableButton();
    this.lastButton.disableButton();

    paginatorState.subscribe(this.updatePaginator.bind(this));
    paginatorState.subscribeToTotalPages(this.updatePaginator.bind(this));
    this.render();
  }

  private static createFirstButton(): ButtonWithIcon {
    return new ButtonWithIcon({
      style: 'PAGINATOR_PINK',
      textContent: '',
      textClassName: PAGINATOR_STYLES.TEXT,
      icon: {
        source: Paginator.FIRST_ICON,
        classNameIcon: PAGINATOR_STYLES.ICON,
      },
      callback: (): void => paginatorState.setCurrentPage(1),
    });
  }

  private static createPrevButton(): ButtonWithIcon {
    return new ButtonWithIcon({
      style: 'PAGINATOR_PINK',
      textContent: '',
      textClassName: PAGINATOR_STYLES.TEXT,
      icon: {
        source: Paginator.PREVIOUS_ICON,
        classNameIcon: PAGINATOR_STYLES.ICON,
      },
      callback: (): void => paginatorState.setCurrentPage(paginatorState.getCurrentPage() - 1),
    });
  }

  private static createNextButton(): ButtonWithIcon {
    return new ButtonWithIcon({
      style: 'PAGINATOR_PINK',
      textContent: '',
      textClassName: PAGINATOR_STYLES.TEXT,
      icon: {
        source: Paginator.NEXT_ICON,
        classNameIcon: PAGINATOR_STYLES.ICON,
      },
      callback: (): void => paginatorState.setCurrentPage(paginatorState.getCurrentPage() + 1),
    });
  }

  private static createLastButton(): ButtonWithIcon {
    return new ButtonWithIcon({
      style: 'PAGINATOR_PINK',
      textContent: '',
      textClassName: PAGINATOR_STYLES.TEXT,
      icon: {
        source: Paginator.LAST_ICON,
        classNameIcon: PAGINATOR_STYLES.ICON,
      },
      callback: (): void => paginatorState.setCurrentPage(paginatorState.getTotalPages()),
    });
  }

  public override remove(): void {
    paginatorState.unsubscribe(this.updatePaginator.bind(this));
    paginatorState.unsubscribeFromTotalPages(this.updatePaginator.bind(this));
    super.remove();
  }

  protected render(): void {
    this.component.append(
      this.firstButton.getElement(),
      this.prevButton.getElement(),
      this.currentPage,
      this.nextButton.getElement(),
      this.lastButton.getElement()
    );
  }

  private updatePaginator(): void {
    const currentPage = paginatorState.getCurrentPage();
    const totalPages = paginatorState.getTotalPages();

    this.currentPage.textContent = `${CATALOG_TEXTS.PAGE} ${String(currentPage)} ${CATALOG_TEXTS.OUT} ${String(totalPages)}`;

    if (currentPage === 1) {
      this.firstButton.disableButton();
      this.prevButton.disableButton();
    } else {
      this.firstButton.enableButton();
      this.prevButton.enableButton();
    }

    if (currentPage === totalPages) {
      this.nextButton.disableButton();
      this.lastButton.disableButton();
    } else {
      this.nextButton.enableButton();
      this.lastButton.enableButton();
    }
  }
}
