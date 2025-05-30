import notFoundImage from '@/assets/images/not-found.svg';
import BaseComponent from '@/components/base';
import { CATALOG_STYLES } from '@/styles/pages/catalog';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class EmptyCatalog extends BaseComponent {
  constructor(message: string) {
    super({
      tag: 'div',
      className: CATALOG_STYLES.EMPTY_CATALOG_CONTAINER,
    });

    this.render(message);
  }

  private render(message: string): void {
    const macaron = new ImageBuilder({
      className: CATALOG_STYLES.EMPTY_CATALOG_IMAGE,
      source: notFoundImage,
      alt: 'sad macaron',
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: CATALOG_STYLES.EMPTY_CATALOG_TEXT,
      textContent: message,
    }).getElement();

    this.component.append(macaron, text);
  }
}
