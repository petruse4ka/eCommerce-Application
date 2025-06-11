import APIUpdateData from '@/api/update-data';
import { BTN_TEXT } from '@/constants';
import { INPUTS_CHANGE_ADDRESS_DATA } from '@/data';
import { ADDRESS } from '@/styles/address';
import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
import { AddressTypeText, AlertText, ModalTitle } from '@/types/enums';
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
  private static readonly DELETE_ICON =
    'M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z';
  private static readonly EDIT_ICON =
    'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z';
  private static readonly STAR_ICON =
    'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z';
  private static readonly STAR_OFF_ICON =
    'M22.1 21.5L2.4 1.7L1.1 3L6.9 8.8L2 9.2L7.5 14L5.9 21L12.1 17.3L18.3 21L18 19.8L20.9 22.7L22.1 21.5M15.8 17.7L12 15.4L8.2 17.7L9.2 13.4L5.9 10.5L8.4 10.3L15.8 17.7M11.2 8L10 6.8L12 2L14.8 8.6L22 9.2L16.9 13.6L15.8 12.5L18.2 10.5L13.8 10.1L12.1 6.1L11.2 8Z';

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

  private static createDeleteButton(id: string): HTMLElement {
    return new ButtonWithIcon({
      style: 'ADDRESS_PRIMARY',
      textContent: BTN_TEXT.DELETE,
      icon: {
        source: AddressList.DELETE_ICON,
        classNameIcon: ADDRESS.CARD.ICON,
      },
      textClassName: ADDRESS.CARD.TEXT,
      callback: (): void => {
        void APIUpdateData.deleteAddress(id);
      },
    }).getElement();
  }

  private static createAddressInfoLine(key: string, value: string): HTMLElement {
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

    return line;
  }

  public addCardItem(address: AddressInfo): void {
    const currentValue: string[] = [];
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
      currentValue.push(value);
      const line = AddressList.createAddressInfoLine(key, value);
      cardInfo.append(line);
    }

    card.append(cardInfo, this.createButtons(id, isDefault, currentValue));
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

  private createTitle(titleContent: string): void {
    const title = new ElementBuilder({
      tag: 'h3',
      className: ADDRESS.TITLE,
      textContent: titleContent,
    }).getElement();

    this.component.append(title);
  }

  private createButtons(id: string, isDefault: boolean, currentValue: string[]): HTMLElement {
    const container = new ElementBuilder({
      tag: 'div',
      className: ADDRESS.CARD.BTN_CONTAINER,
    }).getElement();

    container.append(
      this.createEditButton(id, currentValue),
      AddressList.createDeleteButton(id),
      this.createDefaultButton(id, isDefault, currentValue)
    );

    return container;
  }

  private createEditButton(id: string, currentLine: string[]): HTMLElement {
    return new ButtonWithIcon({
      style: 'ADDRESS_PRIMARY',
      textContent: BTN_TEXT.EDIT,
      icon: {
        source: AddressList.EDIT_ICON,
        classNameIcon: ADDRESS.CARD.ICON,
      },
      textClassName: ADDRESS.CARD.TEXT,
      callback: (): void => {
        const form = new FormEditUserInfo({
          data: INPUTS_CHANGE_ADDRESS_DATA,
          currentInputs: currentLine,
          id,
        });
        const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();
  }

  private createDefaultButton(id: string, isDefault: boolean, currentLine: string[]): HTMLElement {
    return new ButtonWithIcon({
      style: 'ADDRESS_PRIMARY',
      textContent: isDefault ? BTN_TEXT.DELETE_PRIMARY : BTN_TEXT.SET_PRIMARY,
      icon: {
        source: isDefault ? AddressList.STAR_OFF_ICON : AddressList.STAR_ICON,
        classNameIcon: ADDRESS.CARD.ICON,
      },
      textClassName: ADDRESS.CARD.TEXT,
      callback: (): void => {
        if (isDefault) {
          const type =
            this.addressType === 'setDefaultShippingAddress'
              ? 'addShippingAddressId'
              : 'addBillingAddressId';

          const body = {
            country: currentLine[0],
            city: currentLine[1],
            streetName: currentLine[2],
            postalCode: currentLine[3],
          };

          void APIUpdateData.deleteAddress(id, AlertText.DELETE_DEFAULT_ADDRESS).then(() => {
            void APIUpdateData.userAddNewAddress(type, body, false);
          });
        } else {
          void APIUpdateData.setAddressDefault(id, this.addressType);
        }
      },
    }).getElement();
  }
}
