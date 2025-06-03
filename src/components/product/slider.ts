import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import type { Image } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

import ModalSlider from './modal-slider';

export default class ProductSlider extends BaseComponent {
  private currentIndex: number = 0;
  private activePreview: HTMLElement | null = null;
  private mainImage: HTMLImageElement | undefined;
  private imageContainer: HTMLElement;

  constructor(images: Image[]) {
    super({ tag: 'section', className: PRODUCT_STYLES.SLIDER });
    const imageElement = new ImageBuilder({
      source: images[0].url,
      alt: 'Product image',
      className: PRODUCT_STYLES.SLIDER_IMAGE,
    }).getElement();
    if (imageElement instanceof HTMLImageElement) {
      this.mainImage = imageElement;
    }

    this.imageContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.SLIDER_BIG_IMAGE,
      callback: (): void => {
        const modal = new ModalSlider(images, this.currentIndex);
        document.body.append(modal.getElement());
        modal.showModal();
      },
    }).getElement();

    if (this.mainImage) {
      this.imageContainer.append(this.mainImage);
    }
    this.component.append(this.imageContainer);
    this.render(images);
  }

  protected render(images: Image[]): void {
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
            if (this.activePreview) {
              this.activePreview.classList.remove(...PRODUCT_STYLES.ACTIVE_PREVIEW);
            }
            preview.getElement().classList.add(...PRODUCT_STYLES.ACTIVE_PREVIEW);
            this.activePreview = preview.getElement();
            if (this.mainImage) {
              this.mainImage.src = image.url;
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
        if (index === 0) {
          preview.getElement().classList.add(...PRODUCT_STYLES.ACTIVE_PREVIEW);
          this.activePreview = preview.getElement();
        }
        previewContainer.append(preview.getElement());
      });

      this.component.append(previewContainer);
    }
  }
}
