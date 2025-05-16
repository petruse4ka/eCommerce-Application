import introImg from '@/assets/images/promo/main-heart.png';
import { BaseComponent } from '@/components/base/component';
import { INTRO_TEXTS } from '@/constants/constants';
import { INTRO_STYLES } from '@/styles/promo';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class Intro extends BaseComponent {
  constructor() {
    super({ tag: 'section', className: INTRO_STYLES.INTRO });
    this.render();
  }

  protected render(): void {
    const image = new ImageBuilder({
      source: introImg,
      alt: 'Macaron kit',
      className: INTRO_STYLES.IMAGE,
    }).getElement();

    const content = new ElementBuilder({
      tag: 'div',
      className: INTRO_STYLES.CONTENT,
    }).getElement();

    const titleBlock = new ElementBuilder({
      tag: 'div',
      className: INTRO_STYLES.TITLEBLOCK,
    }).getElement();

    const shopName = new ElementBuilder({
      tag: 'div',
      className: INTRO_STYLES.TITLE,
      textContent: INTRO_TEXTS.TITLE,
    }).getElement();

    const since = new ElementBuilder({
      tag: 'div',
      className: INTRO_STYLES.SINCE,
      textContent: INTRO_TEXTS.SINCE,
    }).getElement();

    titleBlock.append(shopName, since);

    const title = new ElementBuilder({
      tag: 'h1',
      className: INTRO_STYLES.SUBTITLE,
      textContent: INTRO_TEXTS.SUBTITLE,
    }).getElement();

    const description = new ElementBuilder({
      tag: 'p',
      className: INTRO_STYLES.CATCH_PHRASE,
      textContent: INTRO_TEXTS.CATCH_PHRASE,
    }).getElement();

    content.append(titleBlock, title, description);
    this.component.append(image, content);
  }
}
