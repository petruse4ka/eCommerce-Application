import '@/styles/main.css';

import RSLogo from '@/assets/images/about/rsschool.png';
import Person from '@/components/about';
import BaseComponent from '@/components/base';
import { ABOUT, SCHOOL_URL } from '@/data';
import { ABOUT_STYLE } from '@/styles/pages/about';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';
import LinkBuilder from '@/utils/link-builder';

export default class AboutPage extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: ABOUT_STYLE.MAIN_CONTAINER,
    });
    const title = new ElementBuilder({
      tag: 'h1',
      className: ABOUT_STYLE.TITLE,
      textContent: ABOUT.title,
    }).getElement();

    this.component.append(title);

    this.render();
  }

  private static createCopyrightLink(): HTMLElement {
    const copyrightLink = new LinkBuilder({
      href: SCHOOL_URL,
      target: '_blank',
      className: ABOUT_STYLE.RSSCHOOL_LINK,
    }).getElement();

    const logo = new ImageBuilder({
      source: RSLogo,
      alt: 'RS School Logo',
      className: ABOUT_STYLE.RSLOGO,
    }).getElement();

    copyrightLink.append(logo);
    return copyrightLink;
  }

  private render(): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.CONTAINER,
    }).getElement();

    container.append(new Person(ABOUT.KONSTANTIN, true).getElement());
    container.append(new Person(ABOUT.DANIIL, true).getElement());
    container.append(new Person(ABOUT.OLGA, true).getElement());
    container.append(new Person(ABOUT.MARGO, true).getElement());

    this.component.append(container);

    const text = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.FINALLY_CONTAINER,
      textContent: ABOUT.text,
    }).getElement();

    this.component.append(text);

    const copyrightLink = AboutPage.createCopyrightLink();
    this.component.append(copyrightLink);

    const cafe = new ImageBuilder({
      source: ABOUT.image,
      alt: ABOUT.title,
      className: ABOUT_STYLE.IMAGE,
    }).getElement();
    this.component.append(cafe);
  }
}
