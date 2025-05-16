import API from '@/api/api';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT } from '@/constants/constants';
import { INPUTS_AUTHORIZATION_DATA } from '@/data';
import { AUTHORIZATION_INPUTS_CONTAINER, FORM } from '@/styles/forms/forms';
import type { AuthorizationBody, InputComponent } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { validateEMail, validatePassword } from '@/utils/validate';

export default class FormAuthorization {
  private form: HTMLElement;
  private userInfoContainer: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private formValue: Map<string, string>;

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

    this.formValue = new Map();

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
      const { id, labelText, placeholder, type, isRequired } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        eventType: 'input',
        callback: (): void => {
          const key = id
            .split('-')
            .map((part, index) =>
              index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join('');
          this.formValue.set(key, inputNode.getValue());
        },
      });
      const inputBlock = inputNode.getElement();
      if (inputBlock.querySelector('input')) {
        inputBlock.querySelector('input')?.addEventListener('input', (event: Event): void => {
          FormAuthorization.showValidationError(event, type);
        });
      }

      this.userInfoContainer.append(inputBlock);
    }
  }

  private render(): void {
    const button = new Button({
      style: 'PRIMARY_PINK',
      textContent: BTN_TEXT.LOGIN_PAGE,
      callback: (): void => {
        this.submitForm();
      },
    }).getElement();

    this.createInputs();

    this.form.append(this.userInfoContainer, button);
  }

  private submitForm(): void {
    const body: AuthorizationBody = {
      email: this.formValue.get('email') ?? '',
      password: this.formValue.get('password') ?? '',
    };

    void API.userSignInResponse(body);
  }
}
