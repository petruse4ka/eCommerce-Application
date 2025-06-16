import { OVERLAY_STYLES } from '@/styles/overlay';
import ElementBuilder from '@/utils/element-builder';

export default class Overlay {
  private overlay: ElementBuilder;

  constructor() {
    this.overlay = new ElementBuilder({
      tag: 'div',
      className: OVERLAY_STYLES,
    });
  }

  public getElement(): HTMLElement {
    return this.overlay.getElement();
  }
}
