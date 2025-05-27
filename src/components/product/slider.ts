import setHeart from '@/assets/images/set-heart.png';
import BaseComponent from '@/components/base';
import { PRODUCT_STYLES } from '@/styles/pages/product';
import ImageBuilder from '@/utils/image-builder';

export default class ProductSlider extends BaseComponent {
  constructor() {
    super({ tag: 'section', className: PRODUCT_STYLES.SLIDER });
    this.render();
  }

  protected render(): void {
    const image = new ImageBuilder({
      source: setHeart,
      alt: 'Macaron set Heart',
      className: PRODUCT_STYLES.IMAGE,
    }).getElement();

    this.component.append(image);
  }
}
