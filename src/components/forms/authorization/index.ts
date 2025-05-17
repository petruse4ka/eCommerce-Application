import API from '@/api/api';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT } from '@/constants/constants';
import { INPUTS_AUTHORIZATION_DATA } from '@/data';
import { AUTHORIZATION_INPUTS_CONTAINER, FORM } from '@/styles/forms/forms';
import type { AuthorizationBody, InputComponent } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { getValidator, validateEMail, validatePassword } from '@/utils/validations';

export default class FormAuthorization {
  private form: HTMLElement;
  private userInfoContainer: HTMLElement;
  private INPUTS_DATA: InputComponent[];
  private formValue: Map<string, string>;
  private inputs: Map<string, Input>;

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
    this.inputs = new Map();

    this.render();
  }

  public inputErrorHandler(event: Event, type: string): void {
    const validateFunction = getValidator(type);
    if (!validateFunction) return;

    const field = event.target;
    if (field instanceof HTMLInputElement) {
      const errorMessage = validateFunction(field.value);
      this.showValidationError(field.id, errorMessage);
    }
  }

  public getElement(): HTMLElement {
    return this.form;
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
    for (const input of this.INPUTS_DATA) {
      const { id, labelText, placeholder, type, isRequired } = input;

      const inputNode = new Input({
        id,
        labelText,
        placeholder,
        type,
        isRequired,
        eventType: 'input',
        callback: (event: Event): void => {
          this.inputErrorHandler(event, id);
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
      this.inputs.set(id, inputNode);
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
    this.showValidationError('email', isNotValidEmail);

    const isNotValidPassword = validatePassword(body.password);
    this.showValidationError('password', isNotValidPassword);

    if (!(Boolean(isNotValidEmail) && Boolean(isNotValidPassword))) {
      void API.userSignInResponse(body);
    }
  }
}
