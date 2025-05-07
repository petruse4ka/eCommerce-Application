import '@/../styles.css';

import { ElementBuilder } from '../utils/element-builder';

export class HomePage {
  private container: ElementBuilder;

  constructor() {
    this.container = new ElementBuilder({
      tag: 'div',
      className: [
        'min-h-screen',
        'bg-[#1a1a2e]',
        'text-[#e6e6e6]',
        'font-roboto',
        'text-base',
        'leading-normal',
      ],
    });
    this.render();
  }

  public getElement(): HTMLElement {
    return this.container.getElement();
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['text-3xl', 'font-bold', 'p-4'],
      textContent: '404 - Error Page',
    }).getElement();

    this.container.getElement().append(title);
  }
}
