import API from '@/api/api';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT, VALIDATION_FUNCTIONS } from '@/constants/constants';
import { INPUTS_AUTHORIZATION_DATA } from '@/data';
import { AUTHORIZATION_INPUTS_CONTAINER, FORM } from '@/styles/forms/forms';
import { CUSTOM_INPUT_STYLE } from '@/styles/inputs/inputs';
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

  public static inputErrorHandler(event: Event, type: string): void {
    const validateFunction = VALIDATION_FUNCTIONS[type];

    const field = event.target;
    if (field instanceof HTMLInputElement) {
      const errorMessage = validateFunction(field.value);
      FormAuthorization.showValidationError(field.id, errorMessage);
    }
  }

  private static showValidationError(id: string, errorMessage: string | null): void {
    const field = document.querySelector(`#${id}`);

    if (field instanceof HTMLInputElement) {
      const errorElement = field.parentNode?.querySelector('.error-message');
      if (errorElement instanceof HTMLDivElement) {
        errorElement.textContent = '';
        if (errorMessage) {
          field.classList.remove(...CUSTOM_INPUT_STYLE.INPUT_DEFAULT);
          field.classList.add(...CUSTOM_INPUT_STYLE.INPUT_ERROR);
          errorElement.textContent = errorMessage;
        } else {
          field.classList.remove(...CUSTOM_INPUT_STYLE.INPUT_ERROR);
          field.classList.add(...CUSTOM_INPUT_STYLE.INPUT_DEFAULT);
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
        eventType: 'input',
        callback: (event: Event): void => {
          callback(event);
          const key = id
            .split('-')
            .map((part, index) =>
              index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
            )
            .join('');
          this.formValue.set(key, inputNode.getValue());
        },
      });
      this.userInfoContainer.append(inputNode.getElement());
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

    const isNotValidEmail = validateEMail(body.email);
    FormAuthorization.showValidationError('email', isNotValidEmail);
    const isNotValidPassword = validatePassword(body.password);
    FormAuthorization.showValidationError('password', isNotValidPassword);

    if (!(Boolean(isNotValidEmail) && Boolean(isNotValidPassword))) {
      void API.userSignInResponse(body);
    }
  }
}
