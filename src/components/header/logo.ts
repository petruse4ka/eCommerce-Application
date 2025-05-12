import logo from '@/assets/logo/logo-main.svg';
import { BaseComponent } from '@/components/base/component';
import { HEADER_STYLES } from '@/styles/header/header';
import { ImageBuilder } from '@/utils/image-builder';

export default class Logo extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: '' });
    this.render();
  }

  protected render(): void {
    const logoElement = new ImageBuilder({
      className: HEADER_STYLES.LOGO,
      source: logo,
      alt: 'Logo of the Macaron Shop',
    }).getElement();

    this.component.append(logoElement);
  }
}
