import API from '@/api/api';
import { Button } from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import { BTN_TEXT } from '@/constants/constants';
import { INPUTS_AUTHORIZATION_DATA } from '@/data';
import { AUTHORIZATION_INPUTS_CONTAINER, FORM } from '@/styles/forms/forms';
import type { AuthorizationBody, InputComponent } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';

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

    void API.userSignInResponse(body);
  }
}
