import APIUpdateData from '@/api/update-data';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT } from '@/constants';
import { INPUTS_EDIT_USER_INFO_DATA } from '@/data';
import { FORM } from '@/styles/forms/forms';
import { isAddresses, isUserAddress, isUserInfo } from '@/types/guards';
import type { Addresses, InputComponent, UserInfoBody } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import { getValidator } from '@/utils/validations';

export default class FormEditUserInfo {
  private form: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private inputs: Map<string, Input>;
  private currentInputs: ElementBuilder[];
  private callback: () => void;
  private id: string | undefined;

  constructor(formInfo: { data: InputComponent[]; currentInputs: ElementBuilder[]; id?: string }) {
    this.INPUTS_DATA = formInfo.data;
    this.inputs = new Map();
    this.callback = (): void => {};
    this.currentInputs = formInfo.currentInputs;

    if (formInfo.id) {
      this.id = formInfo.id;
    }

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

  public inputErrorHandler(value: string, type: string): boolean | void {
    const validateFunction = getValidator(type);

    if (!validateFunction) return;
    const errorMessage = validateFunction(value);
    this.showValidationError(type, errorMessage);

    return errorMessage ? true : false;
  }

  private showValidationError(id: string, errorMessage: string | null): void {
    const input = this.inputs.get(id);

    if (!input) return;

    if (errorMessage) {
      input.setError(errorMessage);
    } else {
      input.clearError();
    }
  }

  private createInputs(): void {
    let index = 0;
    for (const input of this.INPUTS_DATA) {
      const { labelText, placeholder, type, isRequired } = input;

      const id = input.id.charAt(0).toLocaleLowerCase() + input.id.slice(1);

      const value = this.currentInputs[index++].getElement().textContent;
      if (typeof value === 'string') {
        const inputNode = new Input({
          id,
          labelText,
          placeholder,
          type,
          isRequired,
          eventType: 'input',
          value,
          callback: (): void => {
            const value = inputNode.getValue();
            this.inputErrorHandler(value, id);
          },
        });

        this.inputs.set(id, inputNode);
        this.form.append(inputNode.getElement());
      }
    }
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.SAVE_CHANGES,
      callback: (): void => {
        if (this.INPUTS_DATA === INPUTS_EDIT_USER_INFO_DATA) {
          this.submitFormForUserInfo();
        } else {
          this.submitFormForUserAddress();
        }
      },
    }).getElement();

    this.createInputs();
    this.form.append(button);
  }

  private submitFormForUserInfo(): void {
    const body = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
    };

    const inputsInfo = this.inputs.entries();
    for (const inputInfo of inputsInfo) {
      const [key, input] = inputInfo;
      const value = input.getValue();

      if (isUserInfo(key, body)) {
        body[key] = value;
      }
    }

    if (this.isDataValidBeforeSending(body)) {
      void APIUpdateData.userUpdateInfo(body);
      this.callback();
    }
  }

  private submitFormForUserAddress(): void {
    const body = {
      id: this.id ?? '',
      country: '',
      city: '',
      streetName: '',
      postalCode: '',
    };

    const inputsInfo = this.inputs.entries();
    for (const inputInfo of inputsInfo) {
      const [key, input] = inputInfo;
      const value = input.getValue();

      if (isUserAddress(key, body)) {
        body[key] = value;
      }
    }

    if (this.isDataValidBeforeSending(body)) {
      void APIUpdateData.userUpdateAddress(body);
      this.callback();
    }
  }

  private isDataValidBeforeSending(body: UserInfoBody | Addresses): boolean {
    let result = true;

    for (const key in body) {
      if (isAddresses(body)) {
        if (isUserAddress(key, body)) {
          const value = body[key];
          if (typeof value === 'string' && this.inputErrorHandler(value, key)) {
            result = false;
          }
        }
      } else {
        if (isUserInfo(key, body)) {
          const value = body[key];

          if (this.inputErrorHandler(value, key)) {
            result = false;
          }
        }
      }
    }

    return result;
  }
}
