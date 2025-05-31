import { BTN_TEXT } from '@/constants';
import { INPUTS_ADDRESS_DATA } from '@/data';
import { ADDRESS } from '@/styles/address';
import { AddressTypeText, ModalTitle } from '@/types/enums';
import type { AddressInfo } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import FormEditUserInfo from '../forms/edit-info';
import Modal from '../modal';

export default class AddressList extends BaseComponent {
  public infoValue: ElementBuilder[];

  constructor(titleContent: string, addressesInfo: AddressInfo[]) {
    super({
      tag: 'section',
      className: ADDRESS.CONTAINER,
    });

    this.createTitle(titleContent);
    this.infoValue = [];

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
      });

      line.append(titleLine, valueLine.getElement());
      card.append(line);

      this.infoValue.push(valueLine);
    }

    if (isDefault) {
      card.classList.add(...ADDRESS.CARD.ACTIVE);
      const titleCard = new ElementBuilder({
        tag: 'h3',
        className: ADDRESS.CARD.DEFAULT_TITLE,
        textContent: AddressTypeText.DEFAULT,
      }).getElement();

      card.append(titleCard);
    }

    card.append(this.createEditButton());
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

  private createEditButton(): HTMLElement {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.EDIT,
      callback: (): void => {
        const form = new FormEditUserInfo(INPUTS_ADDRESS_DATA, this.infoValue);
        const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();

    return button;
  }
}
