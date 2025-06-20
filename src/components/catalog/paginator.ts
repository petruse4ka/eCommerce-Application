import BaseComponent from '@/components/base';
import ButtonWithIcon from '@/components/buttons/button-with-icon';
import { CATALOG_TEXTS } from '@/constants';
import { SVG_ICONS } from '@/data';
import { paginatorState } from '@/store/paginator-state';
import { PAGINATOR_STYLES } from '@/styles/catalog/paginator';
import ElementBuilder from '@/utils/element-builder';

export default class Paginator extends BaseComponent {
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
        source: SVG_ICONS.FIRST_ICON,
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
        source: SVG_ICONS.PREVIOUS_ICON,
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
        source: SVG_ICONS.NEXT_ICON,
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
        source: SVG_ICONS.LAST_ICON,
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
