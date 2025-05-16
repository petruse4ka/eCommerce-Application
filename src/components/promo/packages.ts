import { BaseComponent } from '@/components/base/component';
import { PACKAGES } from '@/data';
import { PACKAGES_STYLES } from '@/styles/promo/packages';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export default class Packages extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: PACKAGES_STYLES.SECTION,
    });
    this.render();
  }

  protected render(): void {
    for (const item of PACKAGES) {
      const card = new ElementBuilder({
        tag: 'div',
        className: [...PACKAGES_STYLES.CARD, ...item.gradient],
      }).getElement();

      const icon = new ImageBuilder({
        source: item.icon,
        alt: 'Package icon',
        className: PACKAGES_STYLES.ICON,
      }).getElement();

      const title = new ElementBuilder({
        tag: 'h3',
        className: PACKAGES_STYLES.TITLE,
        textContent: item.title,
      }).getElement();

      const description = new ElementBuilder({
        tag: 'p',
        className: PACKAGES_STYLES.DESCRIPTION,
        textContent: item.description,
      }).getElement();

      card.append(icon, title, description);
      this.component.append(card);
    }
  }
}
