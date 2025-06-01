import { INPUTS_CHANGE_ADDRESS_DATA } from '@/data';
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
    console.log(addressesInfo);
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

    const { id, isDefault, ...addressInfo } = address;

    const cardInfo = new ElementBuilder({
      tag: 'div',
      className: '',
    }).getElement();

    for (const [key, value] of Object.entries(addressInfo)) {
      const line = this.createAddressInfoLine(key, value);
      cardInfo.append(line);
    }

    if (isDefault) {
      card.classList.add(...ADDRESS.CARD.ACTIVE);
      const titleCard = new ElementBuilder({
        tag: 'h3',
        className: ADDRESS.CARD.DEFAULT_TITLE,
        textContent: AddressTypeText.DEFAULT,
      }).getElement();

      cardInfo.append(titleCard);
    }

    card.append(cardInfo, this.createButtons(id));
    this.component.append(card);
  }

  private createAddressInfoLine(key: string, value: string): HTMLElement {
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
    this.infoValue.push(valueLine);

    return line;
  }

  private createTitle(titleContent: string): void {
    const title = new ElementBuilder({
      tag: 'h3',
      className: ADDRESS.TITLE,
      textContent: titleContent,
    }).getElement();

    this.component.append(title);
  }

  private createButtons(id: string): HTMLElement {
    const container = new ElementBuilder({
      tag: 'div',
      className: ['flex', 'flex-col', 'gap-2'],
    }).getElement();

    const buttonEdit = new Button({
      style: 'ICON_OUTLINE',
      textContent: '\uD83D\uDD8A',
      callback: (): void => {
        const form = new FormEditUserInfo({
          data: INPUTS_CHANGE_ADDRESS_DATA,
          currentInputs: this.infoValue,
          id,
        });
        const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();

    const buttonDelete = new Button({
      style: 'ICON_OUTLINE',
      textContent: '\uD83D\uDDD1',
      callback: (): void => {
        const form = new FormEditUserInfo({
          data: INPUTS_CHANGE_ADDRESS_DATA,
          currentInputs: this.infoValue,
        });
        const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();

    // const buttonDefaultAddress = new Button({
    //   style: 'ICON_OUTLINE',
    //   textContent: String.fromCodePoint(0x2B50),
    //   callback: (): void => {
    //     const form = new FormEditUserInfo(INPUTS_ADDRESS_DATA, this.infoValue);
    //     const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
    //     this.component.append(modal.getElement());

    //     modal.showModal();
    //   },
    // }).getElement();

    container.append(buttonEdit, buttonDelete);
    return container;
  }
}
