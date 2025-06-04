import '@/styles/main.css';

import BaseComponent from '@/components/base';

import UnderConstructionPage from './underconstruction';

export default class CartPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: '',
    });
    this.render();
  }

  private render(): void {
    const underConstruction = new UnderConstructionPage();
    this.component = underConstruction.getElement();
  }
}
