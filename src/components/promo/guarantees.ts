import { BaseComponent } from '@/components/base/component';
import { GUARANTEES_TEXTS } from '@/constants/constants';
import { GUARANTEES } from '@/data';
import { GUARANTEES_STYLES } from '@/styles/promo/guarantees';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export default class Guarantees extends BaseComponent {
  constructor() {
    super({
      tag: 'section',
      className: GUARANTEES_STYLES.SECTION,
    });
    this.render();
  }

  protected render(): void {
    const title = new ElementBuilder({
      tag: 'h2',
      className: GUARANTEES_STYLES.TITLE,
      textContent: GUARANTEES_TEXTS.TITLE,
    }).getElement();

    const list = new ElementBuilder({
      tag: 'div',
      className: GUARANTEES_STYLES.LIST,
    }).getElement();

    for (const item of GUARANTEES) {
      const card = new ElementBuilder({
        tag: 'div',
        className: GUARANTEES_STYLES.CARD,
      }).getElement();

      const image = new ImageBuilder({
        source: item.image,
        alt: item.title,
        className: GUARANTEES_STYLES.IMAGE,
      }).getElement();

      const cardTitle = new ElementBuilder({
        tag: 'h3',
        className: GUARANTEES_STYLES.CARD_TITLE,
        textContent: item.title,
      }).getElement();

      const description = new ElementBuilder({
        tag: 'p',
        className: GUARANTEES_STYLES.CARD_DESCRIPTION,
        textContent: item.description,
      }).getElement();

      card.append(image, cardTitle, description);
      list.append(card);
    }

    this.component.append(title, list);
  }
}
