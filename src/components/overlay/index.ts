import ElementBuilder from '@/utils/element-builder';

export default class Overlay {
  private overlay: ElementBuilder;

  constructor() {
    this.overlay = new ElementBuilder({
      tag: 'div',
      className: ['absolute', 'inset-0', 'bg-black/50'],
    });
  }

  public getElement(): HTMLElement {
    return this.overlay.getElement();
  }
}
