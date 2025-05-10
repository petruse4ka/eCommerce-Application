import { HomePage } from '@/pages/homepage';

import { ElementBuilder } from '../utils/element-builder';

export class App {
  private container: ElementBuilder;
  private currentPage: HomePage;

  constructor() {
    this.container = new ElementBuilder({ tag: 'div', className: '' });
    this.currentPage = new HomePage();
    this.render();
  }

  public getElement(): HTMLElement {
    return this.container.getElement();
  }

  protected render(): void {
    this.container.getElement().append(this.currentPage.getElement());
  }
}
