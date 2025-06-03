import APIUpdateData from '@/api/update-data';
import deleteIcon from '@/assets/icons/delete.svg';
import editIcon from '@/assets/icons/edit.svg';
import starIcon from '@/assets/icons/star.svg';
import { BTN_TEXT } from '@/constants';
import { INPUTS_CHANGE_ADDRESS_DATA } from '@/data';
import { ADDRESS } from '@/styles/address';
import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
import { AddressTypeText, ModalTitle } from '@/types/enums';
import { ButtonType } from '@/types/enums';
import type { AddressInfo } from '@/types/interfaces';
import ButtonBuilder from '@/utils/button-builder';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import ButtonWithIcon from '../buttons/button-with-icon';
import FormAddNewAddress from '../forms/add-new-address';
import FormEditUserInfo from '../forms/edit-info';
import Modal from '../modal';

export default class AddressList extends BaseComponent {
  public infoValue: ElementBuilder[];
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
    this.infoValue = [];

    if (addressesInfo.length > 0) {
      for (const address of addressesInfo) {
        this.addCardItem(address);
      }
    } else {
      this.createClearAddressInfo();
    }

    this.createAddNewButton();
  }

  private static createDeleteButton(id: string): HTMLElement {
    return new ButtonWithIcon({
      style: 'ADDRESS_PRIMARY',
      textContent: BTN_TEXT.DELETE,
      icon: {
        source: deleteIcon,
        alt: 'Garbage bin icon',
        className: ADDRESS.CARD.ICON,
      },
      textClassName: ADDRESS.CARD.TEXT,
      callback: (): void => {
        void APIUpdateData.deleteAddress(id);
      },
    }).getElement();
  }

  public addCardItem(address: AddressInfo): void {
    const card = new ElementBuilder({
      tag: 'div',
      className: ADDRESS.CARD.DEFAULT,
    }).getElement();

    const { id, isDefault, ...addressInfo } = address;

    const cardInfo = new ElementBuilder({
      tag: 'div',
      className: ADDRESS.CARD.CARD_INFO,
    }).getElement();

    if (isDefault) {
      card.classList.add(...ADDRESS.CARD.ACTIVE);
      const titleCard = new ElementBuilder({
        tag: 'h3',
        className: ADDRESS.CARD.DEFAULT_TITLE,
        textContent: AddressTypeText.DEFAULT,
      }).getElement();

      cardInfo.append(titleCard);
    }

    for (const [key, value] of Object.entries(addressInfo)) {
      const line = this.createAddressInfoLine(key, value);
      cardInfo.append(line);
    }

    card.append(cardInfo, this.createButtons(id, isDefault));
    this.component.append(card);
  }

  private createAddNewButton(): void {
    const buttonAddNewAddress = new ButtonBuilder({
      type: ButtonType.BUTTON,
      className: CUSTOM_BUTTON_STYLE.PRIMARY_PINK,
      textContent: BTN_TEXT.ADD_NEW_ADDRESS,
      callback: (): void => {
        const type =
          this.addressType === 'setDefaultShippingAddress'
            ? 'addShippingAddressId'
            : 'addBillingAddressId';
        const form = new FormAddNewAddress(type);
        const modal = new Modal({ title: ModalTitle.NEW, content: form });
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

  private createButtons(id: string, isDefault: boolean): HTMLElement {
    const container = new ElementBuilder({
      tag: 'div',
      className: ADDRESS.CARD.BTN_CONTAINER,
    }).getElement();

    container.append(this.createEditButton(id), AddressList.createDeleteButton(id));

    if (!isDefault) {
      container.append(this.createDefaultButton(id));
    }
    return container;
  }

  private createEditButton(id: string): HTMLElement {
    return new ButtonWithIcon({
      style: 'ADDRESS_PRIMARY',
      textContent: BTN_TEXT.EDIT,
      icon: {
        source: editIcon,
        alt: 'Pencil icon',
        className: ADDRESS.CARD.ICON,
      },
      textClassName: ADDRESS.CARD.TEXT,
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
  }

  private createDefaultButton(id: string): HTMLElement {
    return new ButtonWithIcon({
      style: 'ADDRESS_PRIMARY',
      textContent: BTN_TEXT.SET_PRIMARY,
      icon: {
        source: starIcon,
        alt: 'Star icon',
        className: ADDRESS.CARD.ICON,
      },
      textClassName: ADDRESS.CARD.TEXT,
      callback: (): void => {
        void APIUpdateData.setAddressDefault(id, this.addressType);
      },
    }).getElement();
  }
}
