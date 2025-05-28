import { ADDRESS } from '@/styles/address';
import type { AddressInfo } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';

export default class AddressList extends BaseComponent {
  constructor(titleContent: string, addressesInfo: AddressInfo[]) {
    super({
      tag: 'section',
      className: ADDRESS.CONTAINER,
    });

    this.createTitle(titleContent);

    for (const address of addressesInfo) {
      this.addCardItem(address);
    }
  }

  public addCardItem(address: AddressInfo): void {
    const card = new ElementBuilder({
      tag: 'div',
      className: ADDRESS.CARD.DEFAULT,
    }).getElement();

    const { isDefault, ...addressInfo } = address;

    for (const [key, value] of Object.entries(addressInfo)) {
      const line = new ElementBuilder({
        tag: 'div',
        className: ADDRESS.LINE.CONTAINER,
      }).getElement();

      const titleLine = new ElementBuilder({
        tag: 'p',
        className: ADDRESS.LINE.TITLE,
        textContent: `${key}:`,
      }).getElement();

      const valueLine = new ElementBuilder({
        tag: 'p',
        className: ADDRESS.LINE.VALUE,
        textContent: value,
      }).getElement();

      line.append(titleLine, valueLine);
      card.append(line);
    }

    if (isDefault) {
      card.classList.add(...ADDRESS.CARD.ACTIVE);
      const titleCard = new ElementBuilder({
        tag: 'h3',
        className: ADDRESS.CARD.DEFAULT_TITLE,
        textContent: 'По умолчанию',
      }).getElement();

      card.append(titleCard);
    }

    this.component.append(card);
  }

  private createTitle(titleContent: string): void {
    const title = new ElementBuilder({
      tag: 'h3',
      className: ADDRESS.TITLE,
      textContent: titleContent,
    }).getElement();

    this.component.append(title);
  }
}
