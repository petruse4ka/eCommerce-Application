import { LOADER_STYLES } from '@/styles/overlay/loader-overlay';
import ElementBuilder from '@/utils/element-builder';

export default class LoaderOverlay {
  private overlay: ElementBuilder;

  constructor(parameters: { text: string; className: string[] }) {
    this.overlay = new ElementBuilder({
      tag: 'div',
      className: parameters.className,
    });

    const spinnerContainer = new ElementBuilder({
      tag: 'div',
      className: LOADER_STYLES.SPINNER_CONTAINER,
    }).getElement();

    const spinner = new ElementBuilder({
      tag: 'div',
      className: LOADER_STYLES.LOADING_SPINNER,
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: LOADER_STYLES.LOADING_TEXT,
      textContent: parameters.text,
    }).getElement();

    spinnerContainer.append(spinner, text);

    this.overlay.getElement().append(spinnerContainer);
  }

  public getElement(): HTMLElement {
    return this.overlay.getElement();
  }
}
