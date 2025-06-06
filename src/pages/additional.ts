import '@/styles/main.css';

import BaseComponent from '@/components/base';
import ADDITIONAL from '@/styles/pages/additional';
import type { additionalPagesData } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class AdditionalPage extends BaseComponent {
  constructor(parametres: additionalPagesData) {
    super({
      tag: 'div',
      className: ADDITIONAL.MAIN_CONTAINER,
    });

    this.render(parametres);
  }

  private static getTitle(name: string): HTMLElement {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ADDITIONAL.TITLE,
      textContent: name,
    }).getElement();

    return title;
  }

  private render(parametres: additionalPagesData): void {
    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: ADDITIONAL.IMAGE_CONTAINER,
    }).getElement();

    if (parametres.IMAGE && typeof parametres.IMAGE === 'string') {
      const image = new ImageBuilder({
        className: ADDITIONAL.IMAGE,
        source: parametres.IMAGE,
        alt: '',
      }).getElement();
      imageContainer.append(image);
    }

    const textContainer = new ElementBuilder({
      tag: 'div',
      className: ADDITIONAL.TEXT_CONTAINER,
    }).getElement();
    textContainer.append(AdditionalPage.getTitle(parametres.TITLE));

    for (const paragraph of parametres.CONTENT) {
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
