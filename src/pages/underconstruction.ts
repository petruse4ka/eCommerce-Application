import '@/styles/main.css';

import macaronAstonaut from '@/assets/images/astronaut.png';
import { BaseComponent } from '@/components/base/component';
import { Button } from '@/components/buttons/button';
import { UNDER_CONSTRACTION_TEXTS } from '@/constants/constants';
import { CONTAINER, MAIN_CONTAINER, TITLE_STYLE } from '@/styles/pages/underconstruction';
import { Route } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class UnderConstaructionPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: CONTAINER,
    });

    this.render();
  }

  private render(): void {
    this.getTitle();

    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: MAIN_CONTAINER,
    }).getElement();

    const macaron = new ImageBuilder({
      className: 'shaking-img',
      source: macaronAstonaut,
      alt: 'astronaut macaron',
    }).getElement();

    imageContainer.append(macaron);

    const returnButton = new Button({
      style: 'SECONDARY_BLUE',
      textContent: UNDER_CONSTRACTION_TEXTS.HOME,
      callback: (): void => {
        globalThis.location.hash = Route.HOME;
      },
    }).getElement();

    this.component.append(imageContainer);
    this.component.append(returnButton);
  }

  private getTitle(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: TITLE_STYLE,
      textContent: UNDER_CONSTRACTION_TEXTS.SORRY,
    }).getElement();
    if (!(title instanceof HTMLHeadingElement)) {
      throw new TypeError('The element is not HTMLHeadingElement');
    }
    this.component.append(title);
  }
}
