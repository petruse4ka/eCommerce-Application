import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Image } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import ModalSlider from './modal-slider';

export default class ProductSlider extends BaseComponent {
  private currentIndex: number = 0;
  constructor(images: Image[]) {
    super({ tag: 'section', className: PRODUCT_STYLES.SLIDER });

    this.render(images);
  }

  protected render(images: Image[]): void {
    const mainImageContainer = this.createMainImage(images);
    this.component.append(mainImageContainer);

    if (images.length > 1) {
      const previewContainer = new ElementBuilder({
        tag: 'div',
        className: PRODUCT_STYLES.SLIDER_PREVIEW_CONTAINER,
      }).getElement();

      images.map((image, index) => {
        const preview = new ElementBuilder({
          tag: 'div',
          className: PRODUCT_STYLES.SLIDER_PREVIEW,
          callback: (): void => {
            const mainImage = mainImageContainer.querySelector('img');
            if (mainImage) {
              mainImage.setAttribute('src', image.url);
            }
            this.currentIndex = index;
          },
        });

        const previewImage = new ImageBuilder({
          source: image.url,
          alt: `Product image ${index + 1}`,
          className: PRODUCT_STYLES.SLIDER_IMAGE,
        }).getElement();

        preview.getElement().append(previewImage);
        previewContainer.append(preview.getElement());
      });

      this.component.append(previewContainer);
    }
  }

  private createMainImage(images: Image[]): HTMLElement {
    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.SLIDER_BIG_IMAGE,
      callback: (): void => {
        const modal = new ModalSlider(images, this.currentIndex);
        document.body.append(modal.getElement());
        modal.showModal();
      },
    });

    const mainImage = new ImageBuilder({
      source: images[0].url,
      alt: 'Product image',
      className: PRODUCT_STYLES.SLIDER_IMAGE,
    }).getElement();

    imageContainer.getElement().append(mainImage);
    return imageContainer.getElement();
  }
}
