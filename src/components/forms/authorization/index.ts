import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT } from '@/constants/constants';
import { INPUTS_AUTHORIZATION_DATA } from '@/data';
import { AUTHORIZATION_INPUTS_CONTAINER, FORM } from '@/styles/forms/forms';
import type { InputComponent } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { validateEMail, validatePassword } from '@/utils/validate';

export default class FormAuthorization {
  private form: HTMLElement;
  private userInfoContainer: HTMLElement;
  private INPUTS_DATA: InputComponent[];

  constructor() {
    this.INPUTS_DATA = INPUTS_AUTHORIZATION_DATA;
    this.form = new ElementBuilder({
      tag: 'form',
      className: FORM,
    }).getElement();

    this.userInfoContainer = new ElementBuilder({
      tag: 'div',
      className: AUTHORIZATION_INPUTS_CONTAINER,
    }).getElement();

    this.render();
  }

  public static showValidationError(event: Event, type: string): void {
    let validateFunction;
    switch (type) {
      case 'email': {
        validateFunction = validateEMail;
        break;
      }
      default: {
        validateFunction = validatePassword;
        break;
      }
    }
    const field = event.target;
    if (field instanceof HTMLInputElement) {
      const errorMessage = validateFunction(field.value);
      let errorElement = field.nextElementSibling;
      while (!errorElement?.classList.contains('error-message')) {
        if (errorElement) {
          errorElement = errorElement.nextElementSibling;
        } else {
          break;
        }
      }
      if (errorElement?.classList.contains('error-message')) {
        errorElement.textContent = '';

        if (errorMessage) {
          errorElement.textContent = errorMessage;
          field.after(errorElement);
        }
      }
    } else {
      throw new TypeError('field is not HTMLInputElement');
    }
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  private createInputs(): void {
    for (const input of this.INPUTS_DATA) {
      const { id, labelText, placeholder, type, isRequired, callback } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        callback,
        eventType: 'change',
      }).getElement();

      this.userInfoContainer.append(inputNode);
    }
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.LOGIN_PAGE,
      callback: (): void => {},
    }).getElement();
    this.createInputs();

    this.form.append(this.userInfoContainer, button);
  }
}
