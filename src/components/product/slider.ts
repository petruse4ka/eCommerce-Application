import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Image } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import ModalSlider from './modal-slider';

export default class ProductSlider extends BaseComponent {
  private currentIndex: number = 0;
  private activePreview: HTMLElement | null = null;
  constructor(images: Image[]) {
    super({ tag: 'section', className: PRODUCT_STYLES.SLIDER });

    this.render(images);
  }

  protected render(images: Image[]): void {
    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.SLIDER_BIG_IMAGE,
      callback: (): void => {
        const modal = new ModalSlider(images, this.currentIndex);
        document.body.append(modal.getElement());
        modal.showModal();
      },
    });

    imageContainer.getElement().style.backgroundImage = `url(${images[0].url})`;
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
            if (this.activePreview instanceof HTMLElement) {
              this.activePreview.classList.remove(...PRODUCT_STYLES.ACTIVE_PREVIEW);
            }
            this.activePreview = preview.getElement();
            this.activePreview.classList.add(...PRODUCT_STYLES.ACTIVE_PREVIEW);
            imageContainer.getElement().style.backgroundImage = `url(${image.url})`;

            this.currentIndex = index;
          },
        });
        preview.getElement().style.backgroundImage = `url(${image.url})`;
        if (index === 0) {
          this.activePreview = preview.getElement();
          this.activePreview.classList.add(...PRODUCT_STYLES.ACTIVE_PREVIEW);
        }
        previewContainer.append(preview.getElement());
      });

      this.component.append(imageContainer.getElement(), previewContainer);
    }
  }
}
