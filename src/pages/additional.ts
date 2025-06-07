import '@/styles/main.css';

import BaseComponent from '@/components/base';
import ADDITIONAL from '@/styles/pages/additional';
import type { additionalPagesData } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class AdditionalPage extends BaseComponent {
  constructor(parameteres: additionalPagesData) {
    super({
      tag: 'div',
      className: ADDITIONAL.MAIN_CONTAINER,
    });

    this.render(parameteres);
  }

  private static createTitle(name: string): HTMLElement {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ADDITIONAL.TITLE,
      textContent: name,
    }).getElement();

    return title;
  }

  private render(parameteres: additionalPagesData): void {
    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: ADDITIONAL.IMAGE_CONTAINER,
    }).getElement();

    if (parameteres.IMAGE && typeof parameteres.IMAGE === 'string') {
      const image = new ImageBuilder({
        className: ADDITIONAL.IMAGE,
        source: parameteres.IMAGE,
        alt: parameteres.TITLE,
      }).getElement();
      imageContainer.append(image);
    }

    const textContainer = new ElementBuilder({
      tag: 'div',
      className: ADDITIONAL.TEXT_CONTAINER,
    }).getElement();
    textContainer.append(AdditionalPage.createTitle(parameteres.TITLE));

    for (const paragraph of parameteres.CONTENT) {
      const content = new ElementBuilder({
        tag: paragraph.type === 'text' ? 'p' : 'h3',
        className: paragraph.type === 'text' ? ADDITIONAL.PARAGRAPH : ADDITIONAL.SUBTITLE,
        textContent: paragraph.content,
      }).getElement();

      textContainer.append(content);
    }
    this.component.append(imageContainer, textContainer);
  }
}
