import '@/styles/main.css';

import macaronAstonaut from '@/assets/images/astronaut.png';
import { BaseComponent } from '@/components/base/component';
import { Button } from '@/components/buttons/button';
import { UNDER_CONSTRUCTION_TEXTS } from '@/constants/constants';
import { Router } from '@/router/router';
import {
  ASTRONAUT_STYLE,
  CONTAINER,
  MAIN_CONTAINER,
  TITLE_STYLE,
} from '@/styles/pages/underconstruction';
import { Route } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export default class UnderConstructionPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: CONTAINER,
    });

    this.render();
  }

  public override getElement(): HTMLElement {
    return this.component;
  }

  private render(): void {
    this.getTitle();

    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: MAIN_CONTAINER,
    }).getElement();

    const macaron = new ImageBuilder({
      className: ASTRONAUT_STYLE,
      source: macaronAstonaut,
      alt: 'astronaut macaron',
    }).getElement();

    imageContainer.append(macaron);

    const returnButton = new Button({
      style: 'SECONDARY_BLUE_DARK',
      textContent: UNDER_CONSTRUCTION_TEXTS.HOME,
      callback: (): void => {
        Router.followRoute(Route.HOME);
      },
    }).getElement();

    this.component.append(imageContainer);
    this.component.append(returnButton);
  }

  private getTitle(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: TITLE_STYLE,
      textContent: UNDER_CONSTRUCTION_TEXTS.SORRY,
    }).getElement();

    this.component.append(title);
  }
}
