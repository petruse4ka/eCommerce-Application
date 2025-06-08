import '@/styles/main.css';

import PersonalCard from '@/components/about/personal';
import PersonalDescription from '@/components/about/text';
import BaseComponent from '@/components/base';
import { ABOUT } from '@/data';
import { ABOUT_STYLE } from '@/styles/about';

export default class AboutPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: ABOUT_STYLE.CONTAINER,
    });

    this.render();
  }

  private render(): void {
    this.component.append(new PersonalCard(ABOUT.KONSTANTIN).getElement());
    this.component.append(new PersonalDescription(ABOUT.KONSTANTIN).getElement());
    this.component.append(new PersonalDescription(ABOUT.DANIIL).getElement());
    this.component.append(new PersonalCard(ABOUT.DANIIL).getElement());
    this.component.append(new PersonalCard(ABOUT.OLGA).getElement());
    this.component.append(new PersonalDescription(ABOUT.OLGA).getElement());
  }
}
