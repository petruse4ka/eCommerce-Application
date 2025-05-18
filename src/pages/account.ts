import '@/styles/main.css';

import { BaseComponent } from '@/components/base/component';

import UnderConstructionPage from './underconstruction';

export default class AccountPage extends BaseComponent {
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
