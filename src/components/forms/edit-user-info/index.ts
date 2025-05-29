import Button from '@/components/buttons';
import Input from '@/components/inputs';
import PersonalInfo from '@/components/personal-info';
import { BTN_TEXT } from '@/constants';
import { INPUTS_EDIT_USER_INFO_DATA } from '@/data';
import { userState } from '@/store/user-state';
import { FORM } from '@/styles/forms/forms';
import { isCustomerKey } from '@/types/guards';
import type { InputComponent } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

export default class FormEditUserInfo {
  private form: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private inputs: Map<string, Input>;
  private callback: () => void;

  constructor() {
    this.INPUTS_DATA = INPUTS_EDIT_USER_INFO_DATA;
    this.inputs = new Map();
    this.callback = (): void => {};

    this.form = new ElementBuilder({
      tag: 'form',
      className: FORM,
    }).getElement();

    this.render();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  public setCallback(callback: () => void): void {
    this.callback = callback;
  }

  private createInputs(): void {
    const userInfo = userState.getUserInfoState();

    if (userInfo) {
      for (const input of this.INPUTS_DATA) {
        const { id, labelText, placeholder, type, isRequired } = input;

        if (isCustomerKey(id, userInfo)) {
          const value = isCustomerKey(id, userInfo) ? userInfo[id] : '';
          if (typeof value === 'string') {
            const inputNode = new Input({
              id,
              labelText,
              placeholder,
              type,
              isRequired,
              eventType: 'input',
              value,
              callback: (): void => {},
            });

            this.inputs.set(id, inputNode);
            this.form.append(inputNode.getElement());
          }
        }
      }
    }
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.SAVE_CHANGES,
      callback: (): void => {
        this.callback();
        this.submitForm();
      },
    }).getElement();

    this.createInputs();
    this.form.append(button);
  }

  private submitForm(): void {
    const inputKeys = [...this.inputs.keys()];
    for (const [index, value] of PersonalInfo.infoValue.entries()) {
      const key = inputKeys[index];

      const valueInput = this.inputs.get(key);
      if (valueInput) {
        value.applyTextContent(valueInput.getValue());
      }
    }
  }
}
