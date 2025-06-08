import { ABOUT_STYLE } from '@/styles/about';
import type { Personal, PersonalText } from '@/types/interfaces';

import BaseComponent from '../base';

export default class PersonalDescription extends BaseComponent {
  private texts: PersonalText;
  constructor(parameters: Personal) {
    super({
      tag: 'div',
      className: ABOUT_STYLE.TEXT_CONTAINER,
    });
    this.texts = parameters.PersonalText;
    this.render();
  }

  protected render(): void {
    const name = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.NAME,
      textContent: this.texts.name,
    }).getElement();

    const role = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.ROLE,
      textContent: this.texts.role,
    }).getElement();

    const description = new BaseComponent({
      tag: 'div',
      className: ABOUT_STYLE.DESCRIPTION,
      textContent: String(this.texts.description),
    }).getElement();

    this.component.append(name, role, description);
  }
}
