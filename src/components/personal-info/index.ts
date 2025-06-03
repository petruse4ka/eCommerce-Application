import { BTN_TEXT } from '@/constants';
import { INPUTS_EDIT_USER_INFO_DATA } from '@/data';
import { PERSONAL_INFO } from '@/styles/personal';
import { ModalTitle, TabAccount } from '@/types/enums';
import type { UserInfo } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

import BaseComponent from '../base';
import Button from '../buttons';
import FormEditUserInfo from '../forms/edit-info';
import Modal from '../modal';

export default class PersonalInfo extends BaseComponent {
  public infoValue: ElementBuilder[];
  private userInfo: UserInfo | void;

  constructor(userInfo: UserInfo | void) {
    super({
      tag: 'section',
      className: PERSONAL_INFO.CONTAINER,
    });

    this.userInfo = userInfo;
    this.infoValue = [];

    this.createTitle();
    if (this.userInfo) {
      for (const [key, value] of Object.entries(this.userInfo)) {
        this.createInfoElement(key, String(value));
      }
    }

    this.createEditButton();
  }

  private createTitle(): void {
    const title = new ElementBuilder({
      tag: 'h3',
      className: PERSONAL_INFO.TITLE,
      textContent: TabAccount.INFO,
    }).getElement();

    this.component.append(title);
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
      className: PERSONAL_INFO.LINE.VALUE,
      textContent: valueText,
    });

    this.infoValue.push(value);

    container.append(title, value.getElement());

    this.component.append(container);
  }

  private createEditButton(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.EDIT,
      callback: (): void => {
        const form = new FormEditUserInfo({
          data: INPUTS_EDIT_USER_INFO_DATA,
          currentInputs: this.infoValue,
        });
        const modal = new Modal({ title: ModalTitle.CHANGE, content: form });
        this.component.append(modal.getElement());

        modal.showModal();
      },
    }).getElement();

    this.component.append(button);
  }
}
