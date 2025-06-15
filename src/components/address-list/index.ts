import APIUpdateData from '@/api/update-data';
import { BTN_TEXT } from '@/constants';
import { ADDRESS_TYPE_TEXT, ALERT_TEXT, MODAL_TITLE } from '@/constants';
import { INPUTS_CHANGE_ADDRESS_DATA } from '@/data';
import { SVG_ICONS } from '@/data';
import { ADDRESS } from '@/styles/address';
import { CUSTOM_BUTTON_STYLE } from '@/styles/buttons/buttons';
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
  private addressType: string;

  constructor(titleContent: string, addressesInfo: AddressInfo[]) {
    super({
      tag: 'section',
      className: ADDRESS.CONTAINER,
    });

    this.addressType =
      titleContent === ADDRESS_TYPE_TEXT.SHIPPING
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
        source: SVG_ICONS.DELETE_ICON,
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
        textContent: ADDRESS_TYPE_TEXT.DEFAULT,
      }).getElement();

      cardInfo.append(titleCard);
    }

    for (const [key, value] of Object.entries(addressInfo)) {
      if (typeof value === 'string') {
        currentValue.push(value);
        const line = AddressList.createAddressInfoLine(key, value);
        cardInfo.append(line);
      }
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
        const modal = new Modal({ title: MODAL_TITLE.NEW, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();

    this.component.append(buttonAddNewAddress);
  }

  private createClearAddressInfo(): void {
    const info = new ElementBuilder({
      tag: 'div',
      className: ADDRESS.NONE,
      textContent: ADDRESS_TYPE_TEXT.NONE,
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
        source: SVG_ICONS.EDIT_ICON,
        classNameIcon: ADDRESS.CARD.ICON,
      },
      textClassName: ADDRESS.CARD.TEXT,
      callback: (): void => {
        const form = new FormEditUserInfo({
          data: INPUTS_CHANGE_ADDRESS_DATA,
          currentInputs: currentLine,
          id,
        });
        const modal = new Modal({ title: MODAL_TITLE.CHANGE, content: form });
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
        source: isDefault ? SVG_ICONS.STAR_OFF_ICON : SVG_ICONS.STAR_ICON,
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

          void APIUpdateData.deleteAddress(id, ALERT_TEXT.DELETE_DEFAULT_ADDRESS).then(() => {
            void APIUpdateData.userAddNewAddress(type, body, false);
          });
        } else {
          void APIUpdateData.setAddressDefault(id, this.addressType);
        }
      },
    }).getElement();
  }
}
