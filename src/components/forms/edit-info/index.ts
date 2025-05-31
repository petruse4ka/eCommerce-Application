import APIUpdateData from '@/api/update-data';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT } from '@/constants';
import { FORM } from '@/styles/forms/forms';
import { isUserInfo } from '@/types/guards';
import type { InputComponent, UserInfoBody } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import { getValidator } from '@/utils/validations';

export default class FormEditUserInfo {
  private form: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private inputs: Map<string, Input>;
  private currentInputs: ElementBuilder[];
  private callback: () => void;

  constructor(data: InputComponent[], currentInputs: ElementBuilder[]) {
    this.INPUTS_DATA = data;
    this.inputs = new Map();
    this.callback = (): void => {};
    this.currentInputs = currentInputs;

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
        this.submitForm();
      },
    }).getElement();

    this.createInputs();
    this.form.append(button);
  }

  private submitForm(): void {
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

  private isDataValidBeforeSending(body: UserInfoBody): boolean {
    let result = true;

    for (const key in body) {
      if (isUserInfo(key, body)) {
        const value = body[key];

        if (this.inputErrorHandler(value, key)) {
          result = false;
        }
      }
    }

    return result;
  }
}
