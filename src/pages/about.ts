import '@/styles/main.css';

import PersonalCard from '@/components/about/personal';
import PersonalDescription from '@/components/about/text';
import BaseComponent from '@/components/base';
import { ABOUT } from '@/data';
import { ABOUT_STYLE } from '@/styles/about';
import ElementBuilder from '@/utils/element-builder';

export default class AboutPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
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

  private render(): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: ABOUT_STYLE.CONTAINER,
    }).getElement();

    container.append(new PersonalCard(ABOUT.KONSTANTIN).getElement());
    container.append(new PersonalDescription(ABOUT.KONSTANTIN).getElement());
    container.append(new PersonalDescription(ABOUT.DANIIL).getElement());
    container.append(new PersonalCard(ABOUT.DANIIL).getElement());
    container.append(new PersonalCard(ABOUT.OLGA).getElement());
    container.append(new PersonalDescription(ABOUT.OLGA).getElement());

    this.component.append(container);

    const text = new ElementBuilder({
      tag: 'div',
      className: '',
      textContent: ABOUT.text,
    }).getElement();

    this.component.append(text);
  }
}
