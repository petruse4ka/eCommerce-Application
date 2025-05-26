import { PERSONAL_INFO } from '@/styles/personal';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';

export default class PersonalInfo extends BaseComponent {
  constructor(userInfo: Record<string, string> | void) {
    super({
      tag: 'section',
      className: PERSONAL_INFO.CONTAINER,
    });

    if (userInfo) {
      for (const [key, value] of Object.entries(userInfo)) {
        this.createInfoElement(key, value);
      }
    }
  }

  private createInfoElement(titleText: string, valueText: string): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: PERSONAL_INFO.LINE.CONTAINER,
    }).getElement();

    const title = new ElementBuilder({
      tag: 'p',
      className: PERSONAL_INFO.LINE.TITLE,
      textContent: `${titleText}:`,
    }).getElement();

    const value = new ElementBuilder({
      tag: 'p',
      className: PERSONAL_INFO.CONTAINER,
      textContent: valueText,
    }).getElement();

    container.append(title, value);

    this.component.append(container);
  }
}
