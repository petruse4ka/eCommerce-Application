import '@/styles/main.css';

import PersonalCard from '@/components/about/personal';
import BaseComponent from '@/components/base';
import { ABOUT } from '@/data';

export default class AboutPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: '',
    });

    this.render();
  }

  private render(): void {
    this.component.append(new PersonalCard(ABOUT.OLGA).getElement());
  }
}
