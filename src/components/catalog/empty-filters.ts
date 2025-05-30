import noFiltersImage from '@/assets/images/no-filters.svg';
import BaseComponent from '@/components/base';
import { FILTERS_STYLES } from '@/styles/catalog/product-filters';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class EmptyFilters extends BaseComponent {
  constructor(message: string) {
    super({
      tag: 'div',
      className: FILTERS_STYLES.EMPTY_FILTERS_CONTAINER,
    });

    this.render(message);
  }

  private render(message: string): void {
    const macaron = new ImageBuilder({
      className: FILTERS_STYLES.EMPTY_FILTERS_IMAGE,
      source: noFiltersImage,
      alt: 'shy macaron',
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: FILTERS_STYLES.EMPTY_FILTERS_TEXT,
      textContent: message,
    }).getElement();

    this.component.append(macaron, text);
  }
}
