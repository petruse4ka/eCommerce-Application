import APIUpdateData from '@/api/update-data';
import { BTN_TEXT } from '@/constants';
import { INPUTS_CHANGE_ADDRESS_DATA } from '@/data';
import { ADDRESS } from '@/styles/address';
import { AddressTypeText, ModalTitle } from '@/types/enums';
import type { AddressInfo, createButtonFormComponent } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import FormAddNewAddress from '../forms/add-new-address';
import FormEditUserInfo from '../forms/edit-info';
import Modal from '../modal';

export default class AddressList extends BaseComponent {
  private addressType: string;

  constructor(titleContent: string, addressesInfo: AddressInfo[]) {
    super({
      tag: 'section',
      className: ADDRESS.CONTAINER,
    });

    this.addressType =
      titleContent === AddressTypeText.SHIPPING
        ? 'setDefaultShippingAddress'
        : 'setDefaultBillingAddress';

    this.createTitle(titleContent);

    if (addressesInfo.length > 0) {
      for (const address of addressesInfo) {
        this.addCardItem(address);
      }
    } else {
      this.createClearAddressInfo();
    }

    this.createAddNewButton();
  }

  public static createAddressInfoLine(
    key: string,
    value: string,
    currentLine: ElementBuilder[]
  ): HTMLElement {
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
    currentLine.push(valueLine);

    return line;
  }

  public addCardItem(address: AddressInfo): void {
    const currentLine: ElementBuilder[] = [];
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
      const line = AddressList.createAddressInfoLine(key, value, currentLine);
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

    card.append(cardInfo, this.createButtons({ id, isDefault, currentLine }));
    this.component.append(card);
  }

  private createAddNewButton(): void {
    const buttonAddNewAddress = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.ADD_NEW_ADDRESS,
      callback: (): void => {
        const type =
          this.addressType === 'setDefaultShippingAddress'
            ? 'addShippingAddressId'
            : 'addBillingAddressId';
        const form = new FormAddNewAddress(type);
        const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();

    this.component.append(buttonAddNewAddress);
  }

  private createClearAddressInfo(): void {
    const info = new ElementBuilder({
      tag: 'div',
      className: '',
      textContent: AddressTypeText.NONE,
    }).getElement();

    this.component.append(info);
  }

  private createTitle(titleContent: string): void {
    const title = new ElementBuilder({
      tag: 'h3',
      className: ADDRESS.TITLE,
      textContent: titleContent,
    }).getElement();

    this.component.append(title);
  }

  private createButtons(parameters: createButtonFormComponent): HTMLElement {
    const container = new ElementBuilder({
      tag: 'div',
      className: ADDRESS.CARD.BTN_CONTAINER,
    }).getElement();

    const buttonEdit = new Button({
      style: 'ICON_OUTLINE',
      textContent: BTN_TEXT.PEN,
      callback: (): void => {
        const form = new FormEditUserInfo({
          data: INPUTS_CHANGE_ADDRESS_DATA,
          currentInputs: parameters.currentLine,
          id: parameters.id,
        });
        const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();

    const buttonDelete = new Button({
      style: 'ICON_OUTLINE',
      textContent: BTN_TEXT.TRASH,
      callback: (): void => {
        void APIUpdateData.deleteAddress(parameters.id);
      },
    }).getElement();

    container.append(buttonEdit, buttonDelete);

    if (!parameters.isDefault) {
      const buttonDefaultAddress = new Button({
        style: 'ICON_OUTLINE',
        textContent: BTN_TEXT.STAR,
        callback: (): void => {
          void APIUpdateData.setAddressDefault(parameters.id, this.addressType);
        },
      }).getElement();

      container.append(buttonDefaultAddress);
    }
    return container;
  }
}
