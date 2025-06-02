import APIUpdateData from '@/api/update-data';
import BaseComponent from '@/components/base';
import Button from '@/components/buttons';
import Input from '@/components/inputs';
import { BTN_TEXT } from '@/constants';
import { INPUTS_CHANGE_ADDRESS_DATA } from '@/data';
import { FORM_PASSWORD } from '@/styles/forms/forms';
import { isUserAddress } from '@/types/guards';
import type { Addresses } from '@/types/interfaces';
import { getValidator } from '@/utils/validations';

export default class FormAddNewAddress extends BaseComponent {
  private inputs: Map<string, Input>;
  private callback: () => void;
  private action: string;

  constructor(action: string) {
    super({
      tag: 'form',
      className: FORM_PASSWORD,
    });

    this.action = action;
    this.inputs = new Map();
    this.callback = (): void => {};

    this.render();
  }

  public setCallback(callback: () => void): void {
    this.callback = callback;
  }

  private createInputs(): void {
    for (const input of INPUTS_CHANGE_ADDRESS_DATA) {
      const { labelText, placeholder, type, isRequired, isDisabled } = input;

      const id = input.id.charAt(0).toLocaleLowerCase() + input.id.slice(1);

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        isDisabled,
        eventType: 'input',
        callback: (): void => {
          const value = inputNode.getValue();
          this.inputErrorHandler(value, id);
        },
      });

      this.inputs.set(id, inputNode);
      this.component.append(inputNode.getElement());
    }
  }

  private inputErrorHandler(value: string, type: string): boolean | void {
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

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.ADD_NEW_ADDRESS,
      callback: (): void => {
        this.submitForm();
      },
    }).getElement();

    this.createInputs();
    this.component.append(button);
  }

  private submitForm(): void {
    const body = {
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
      void APIUpdateData.userAddNewAddress(this.action, body);
      this.callback();
    }
  }

  private isDataValidBeforeSending(body: Addresses): boolean {
    let result = true;

    for (const key in body) {
      if (isUserAddress(key, body)) {
        const value = body[key];

        if (this.inputErrorHandler(value, key)) {
          result = false;
        }
      }
    }

    return result;
  }
}
