import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ElementBuilder from '@/utils/element-builder';

export default class ProductSlider extends BaseComponent {
  constructor() {
    super({ tag: 'section', className: PRODUCT_STYLES.SLIDER });
    this.render();
  }

  protected render(): void {
    const imageContainer = new ElementBuilder({
      tag: 'div',
      className: PRODUCT_STYLES.SLIDER_BIG_IMAGE,
      callback: (): void => {},
    });

    const array = [
      '././assets/images/macarons/blue-cheese.png',
      '././assets/images/dessert3.png',
      '././assets/images/dessert1.png',
      '././assets/images/macarons.jpg',
    ];

    imageContainer.applyCssClasses(`bg-[url('././assets/images/dessert1.png')]`);

    this.component.append(imageContainer.getElement());
    if (array.length > 1) {
      const previewContainer = new ElementBuilder({
        tag: 'div',
        className: PRODUCT_STYLES.SLIDER_PREVIEW_CONTAINER,
        callback: (): void => {},
      }).getElement();
      for (const image of array) {
        const preview = new ElementBuilder({
          tag: 'div',
          className: PRODUCT_STYLES.SLIDER_PREVIEW,
          callback: (): void => {
            imageContainer.getElement().style.backgroundImage = `url('${preview.getElement().dataset['image']}')`;
          },
        });
        preview.getElement().style.backgroundImage = `url('${image}')`;
        preview.getElement().dataset['image'] = image;
        //preview.applyCssClasses(`bg-[url('${image}')]`);
        previewContainer.append(preview.getElement());
      }
      this.component.append(previewContainer);
    }
  }
}
