import '@/styles/main.css';

import { BaseComponent } from '@/components/base/component';
import { Intro } from '@/components/promo/intro';
import { CONTAINER, MAIN_CONTAINER } from '@/styles/pages/homepage';
import { ElementBuilder } from '@/utils/element-builder';

export default class HomePage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: CONTAINER,
    });
    this.render();
  }

  private render(): void {
    const mainContainer = new ElementBuilder({
      tag: 'div',
      className: MAIN_CONTAINER,
    }).getElement();

    const intro = new Intro();
    mainContainer.append(intro.getElement());
    this.component.append(mainContainer);
  }
}
