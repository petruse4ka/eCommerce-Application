import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Image } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import ModalSlider from './modal-slider';

export default class ProductSlider extends BaseComponent {
  constructor(images: Image[]) {
    super({ tag: 'section', className: PRODUCT_STYLES.SLIDER });

    this.render(images);
  }

  protected render(images: Image[]): void {
    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.SLIDER_BIG_IMAGE,
      callback: (): void => {
        const modal = new ModalSlider(images);
        document.body.append(modal.getElement());
        modal.showModal();
      },
    });

    imageContainer.getElement().style.backgroundImage = `url(${images[0].url})`;
    this.component.append(imageContainer.getElement());
    if (images.length > 1) {
      const previewContainer = new ElementBuilder({
        tag: 'div',
        className: PRODUCT_STYLES.SLIDER_PREVIEW_CONTAINER,
        callback: (): void => {},
      }).getElement();

      for (const image of images) {
        const preview = new ElementBuilder({
          tag: 'div',
          className: PRODUCT_STYLES.SLIDER_PREVIEW,
          callback: (): void => {
            imageContainer.getElement().style.backgroundImage = `url(${image.url})`;
          },
        });
        preview.getElement().style.backgroundImage = `url(${image.url})`;
        previewContainer.append(preview.getElement());
      }
      this.component.append(previewContainer);
    }
  }
}
