import introImg from '@/assets/images/promo/main-heart.png';
import BaseComponent from '@/components/base';
import { INTRO_TEXTS } from '@/constants';
import { INTRO_STYLES } from '@/styles/promo/intro';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class Intro extends BaseComponent {
  constructor() {
    super({ tag: 'section', className: INTRO_STYLES.SECTION });
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

    const nameContainer = new ElementBuilder({
      tag: 'div',
      className: INTRO_STYLES.NAMECONTAINER,
    }).getElement();

    const name = new ElementBuilder({
      tag: 'div',
      className: INTRO_STYLES.NAME,
      textContent: INTRO_TEXTS.NAME,
    }).getElement();

    const since = new ElementBuilder({
      tag: 'div',
      className: INTRO_STYLES.SINCE,
      textContent: INTRO_TEXTS.SINCE,
    }).getElement();

    nameContainer.append(name, since);

    const title = new ElementBuilder({
      tag: 'h1',
      className: INTRO_STYLES.TITLE,
      textContent: INTRO_TEXTS.TITLE,
    }).getElement();

    const description = new ElementBuilder({
      tag: 'p',
      className: INTRO_STYLES.CATCH_PHRASE,
      textContent: INTRO_TEXTS.CATCH_PHRASE,
    }).getElement();

    content.append(nameContainer, title, description);
    this.component.append(image, content);
  }
}
